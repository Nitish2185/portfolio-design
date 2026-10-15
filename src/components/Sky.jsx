import { useEffect, useRef } from 'react'
import { on } from '../lib/bus'
import { prefersReduced } from '../lib/motion'

const TRAIL = 16

const VERT = `
attribute vec2 a; varying vec2 vUv;
void main(){ vUv = a * .5 + .5; gl_Position = vec4(a, 0., 1.); }`

const FRAG = `
precision highp float;
varying vec2 vUv;
uniform vec2 uRes;
uniform float uTime, uLift, uForm;
uniform vec4 uTrail[${TRAIL}];
uniform float uLife[${TRAIL}];

float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p){
  vec2 i = floor(p), f = fract(p), u = f * f * (3. - 2. * f);
  return mix(mix(hash(i), hash(i + vec2(1, 0)), u.x), mix(hash(i + vec2(0, 1)), hash(i + vec2(1, 1)), u.x), u.y);
}
float fbm(vec2 p){
  float v = 0., a = .5; mat2 m = mat2(1.6, 1.2, -1.2, 1.6);
  for (int i = 0; i < 6; i++) { v += a * noise(p); p = m * p; a *= .5; }
  return v;
}

void main(){
  float asp = uRes.x / uRes.y;
  vec2 p = vec2(vUv.x * asp, vUv.y);

  // The cursor trail: each live sample pushes the cloud along its velocity and swirls it round.
  vec2 D = vec2(0.); float dens = 0.;
  for (int i = 0; i < ${TRAIL}; i++) {
    float life = uLife[i];
    if (life <= 0.) continue;
    vec4 t = uTrail[i];
    vec2 d = p - vec2(t.x * asp, t.y);
    float g = exp(-dot(d, d) / .014) * life;
    D += (t.zw * 1.4 + vec2(-d.y, d.x) * 2.2 * length(t.zw)) * g;
    dens += g;
  }

  // While forming, the cloud settles from a slight zoom about the centre.
  vec2 fc = vec2(.5 * asp, .6);
  vec2 q = fc + (p - fc) * (1. + .07 * (1. - uForm));
  q = q * 1.55 + vec2(uTime * .012, uTime * .003 - uLift) - D * .55;
  float n = fbm(q + .6 * fbm(q * .8 + uTime * .018));
  float cloud = smoothstep(.44, .86, n) * uForm;

  vec3 deep  = vec3(40., 86., 255.) / 255.;
  vec3 mid   = vec3(90., 127., 255.) / 255.;
  vec3 light = vec3(204., 218., 255.) / 255.;
  vec3 pale  = vec3(242., 245., 255.) / 255.;
  vec3 ground = vec3(239.) / 255.;
  float y = vUv.y;
  vec3 sky = mix(deep, mid, smoothstep(.28, .52, y));
  sky = mix(sky, light, smoothstep(.52, .74, y));
  sky = mix(sky, pale, smoothstep(.74, .92, y));

  // SKY_TONE: lift the cloud toward white, then fade it toward the ground.
  vec3 col = mix(sky, vec3(1.), cloud * .86 * (.35 + .65 * (1. - smoothstep(.7, 1., y))));
  col = mix(col, vec3(1.), clamp(dens, 0., 1.) * .14);
  col = mix(ground, col, smoothstep(.03, .26, y));
  gl_FragColor = vec4(col, 1.);
}`

function compile(gl, type, src) {
  const s = gl.createShader(type)
  gl.shaderSource(s, src)
  gl.compileShader(s)
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s))
  return s
}

export default function Sky() {
  const wrap = useRef(null)
  const canvas = useRef(null)

  useEffect(() => {
    const el = wrap.current
    const c = canvas.current
    const gl = c.getContext('webgl', { antialias: false, premultipliedAlpha: false })
    if (!gl) {
      el.classList.add('sky--fallback')
      return
    }
    let prog
    try {
      prog = gl.createProgram()
      gl.attachShader(prog, compile(gl, gl.VERTEX_SHADER, VERT))
      gl.attachShader(prog, compile(gl, gl.FRAGMENT_SHADER, FRAG))
      gl.linkProgram(prog)
      gl.useProgram(prog)
    } catch (e) {
      console.warn(e)
      el.classList.add('sky--fallback')
      return
    }
    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW)
    const loc = gl.getAttribLocation(prog, 'a')
    gl.enableVertexAttribArray(loc)
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)
    const U = (n) => gl.getUniformLocation(prog, n)
    const u = { res: U('uRes'), time: U('uTime'), lift: U('uLift'), form: U('uForm'), trail: U('uTrail'), life: U('uLife') }

    const reduced = prefersReduced()
    const SCALE = 0.5 // render at half resolution — clouds are soft anyway
    const resize = () => {
      const r = el.getBoundingClientRect()
      c.width = Math.max(1, Math.round(r.width * SCALE))
      c.height = Math.max(1, Math.round(r.height * SCALE))
      gl.viewport(0, 0, c.width, c.height)
      gl.uniform2f(u.res, c.width, c.height)
    }
    resize()

    const trail = new Float32Array(TRAIL * 4)
    const life = new Float32Array(TRAIL)
    let head = 0
    let last = null
    const onMove = (e) => {
      const r = el.getBoundingClientRect()
      const x = (e.clientX - r.left) / r.width
      const y = 1 - (e.clientY - r.top) / r.height
      if (y < -0.1 || y > 1.1) return
      if (last) {
        const vx = Math.max(-0.08, Math.min(0.08, x - last.x))
        const vy = Math.max(-0.08, Math.min(0.08, y - last.y))
        if (Math.abs(vx) + Math.abs(vy) > 0.001) {
          trail.set([x, y, vx, vy], head * 4)
          life[head] = 1
          head = (head + 1) % TRAIL
        }
      }
      last = { x, y }
    }

    let lift = 0, liftTarget = 0
    const offLift = on('sky:lift', ({ n, jump }) => {
      liftTarget = n * 0.16
      if (jump) lift = liftTarget
    })

    let form = reduced ? 1 : 0
    let formStart = null
    const offBoot = on('loader:done', () => (formStart = performance.now()))
    if (document.documentElement.classList.contains('is-loading') === false) formStart = performance.now()

    let far = false
    const onScroll = () => {
      far = scrollY > 2.5 * innerHeight
      el.style.transform = `translate3d(0, ${(-0.18 * scrollY).toFixed(1)}px, 0)`
    }
    onScroll()

    const t0 = performance.now()
    let raf = 0
    const frame = (now) => {
      raf = requestAnimationFrame(frame)
      if (far || document.hidden) return
      if (formStart !== null && form < 1) form = Math.min(1, (now - formStart) / 1600)
      lift += (liftTarget - lift) * 0.04
      for (let i = 0; i < TRAIL; i++) life[i] = Math.max(0, life[i] * 0.965 - 0.002)
      gl.uniform1f(u.time, reduced ? 0 : (now - t0) / 1000)
      gl.uniform1f(u.lift, lift)
      gl.uniform1f(u.form, 1 - Math.pow(1 - form, 3))
      gl.uniform4fv(u.trail, trail)
      gl.uniform1fv(u.life, life)
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
    }
    raf = requestAnimationFrame(frame)

    addEventListener('resize', resize)
    addEventListener('scroll', onScroll, { passive: true })
    if (!reduced) addEventListener('pointermove', onMove, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      offLift()
      offBoot()
      removeEventListener('resize', resize)
      removeEventListener('scroll', onScroll)
      removeEventListener('pointermove', onMove)
    }
  }, [])

  return (
    <div className="sky" ref={wrap} aria-hidden="true">
      <canvas ref={canvas} />
    </div>
  )
}
