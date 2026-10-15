import { useEffect, useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/**
 * Wireframe "twisted ring": a torus whose elliptical cross-section rotates 1.5 turns
 * around the loop, drawn as line segments. A shader sweeps an electric-blue highlight
 * around the ring and lights up the ribbon edges.
 */
const R = 1.55 // ring radius
const A = 0.62 // cross-section half-width
const B = 0.2 // cross-section half-thickness
const TWIST = 1.5 // turns of the cross-section per loop (must be a multiple of 0.5)
const NU = 220 // samples around the ring
const NV = 28 // samples around the cross-section (even, so the seam lines up)
const RING_EVERY = 5

function buildGeometry() {
  const pt = (i, j) => {
    const th = (i / NU) * Math.PI * 2
    const ph = (j / NV) * Math.PI * 2
    const tw = TWIST * th
    const x0 = A * Math.cos(ph), y0 = B * Math.sin(ph)
    const x1 = x0 * Math.cos(tw) - y0 * Math.sin(tw)
    const y1 = x0 * Math.sin(tw) + y0 * Math.cos(tw)
    return [(R + x1) * Math.cos(th), (R + x1) * Math.sin(th), y1]
  }
  const pos = [], aT = [], aP = []
  const push = (i, j) => {
    pos.push(...pt(i, j))
    aT.push(i / NU)
    aP.push((j % NV) / NV)
  }
  // longitudinal (helical) lines; pt() is continuous in θ, so the last segment simply
  // runs to θ = 2π (where the twisted section lands on another line's start)
  for (let j = 0; j < NV; j++) {
    for (let i = 0; i < NU; i++) {
      push(i, j)
      push(i + 1, j)
    }
  }
  // cross-section rings
  for (let i = 0; i < NU; i += RING_EVERY) {
    for (let j = 0; j < NV; j++) {
      push(i, j)
      push(i, j + 1)
    }
  }
  const g = new THREE.BufferGeometry()
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3))
  g.setAttribute('aT', new THREE.Float32BufferAttribute(aT, 1))
  g.setAttribute('aP', new THREE.Float32BufferAttribute(aP, 1))
  return g
}

const vertexShader = /* glsl */ `
  attribute float aT;
  attribute float aP;
  varying float vT;
  varying float vP;
  varying float vDepth;
  void main() {
    vT = aT;
    vP = aP;
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vDepth = -mv.z;
    gl_Position = projectionMatrix * mv;
  }
`
const fragmentShader = /* glsl */ `
  uniform float uTime;
  uniform float uOpacity;
  varying float vT;
  varying float vP;
  varying float vDepth;
  void main() {
    // highlight band travelling around the ring, plus a softer one opposite
    float d1 = abs(fract(vT - uTime * 0.045 + 0.5) - 0.5);
    float d2 = abs(fract(vT - uTime * 0.045) - 0.5);
    float band = max(1.0 - smoothstep(0.0, 0.13, d1), 0.55 * (1.0 - smoothstep(0.0, 0.08, d2)));
    // the two outer edges of the ribbon glow electric blue
    float e = min(abs(fract(vP + 0.5) - 0.5), abs(fract(vP) - 0.5));
    float edge = 1.0 - smoothstep(0.0, 0.05, e);
    float k = clamp(max(band, edge * 0.75), 0.0, 1.0);
    vec3 base = vec3(0.42, 0.47, 0.66);
    vec3 electric = vec3(0.0, 0.32, 1.0);
    float front = mix(0.4, 1.0, smoothstep(7.4, 4.6, vDepth)); // far side recedes
    float alpha = mix(0.22, 0.95, k) * front * uOpacity;
    gl_FragColor = vec4(mix(base, electric, k), alpha);
  }
`

function Ring({ animate }) {
  const outer = useRef()
  const inner = useRef()
  const geometry = useMemo(buildGeometry, [])
  const uniforms = useMemo(() => ({ uTime: { value: 0 }, uOpacity: { value: 1 } }), [])
  useEffect(() => () => geometry.dispose(), [geometry])

  useFrame((state, dt) => {
    const t = state.clock.elapsedTime
    if (!animate) return
    const s = Math.min(dt, 0.05)
    uniforms.uTime.value = t
    // slow continuous rotation on two axes
    inner.current.rotation.x += s * 0.16
    inner.current.rotation.y += s * 0.24
    // gentle float + tilt, easing toward the pointer
    const o = outer.current
    o.position.y = Math.sin(t * 0.7) * 0.12
    o.rotation.z = THREE.MathUtils.lerp(o.rotation.z, Math.sin(t * 0.33) * 0.12 - state.pointer.x * 0.12, 0.05)
    o.rotation.x = THREE.MathUtils.lerp(o.rotation.x, state.pointer.y * 0.15, 0.05)
  })

  return (
    <group ref={outer}>
      <group ref={inner} rotation={[0.9, 0.3, 0]}>
        <lineSegments geometry={geometry}>
          <shaderMaterial
            vertexShader={vertexShader}
            fragmentShader={fragmentShader}
            uniforms={uniforms}
            transparent
            depthWrite={false}
          />
        </lineSegments>
      </group>
    </group>
  )
}

/** `running` pauses the render loop when the hero is off screen; `animate` false = still frame. */
export default function TwistedRing({ running = true, animate = true }) {
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 0, 6], fov: 38 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      frameloop={running && animate ? 'always' : 'demand'}
      style={{ background: 'transparent' }}
    >
      <Ring animate={animate} />
    </Canvas>
  )
}
