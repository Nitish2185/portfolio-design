import { useEffect, useRef, useState } from 'react'
import { emitOnce, onceFired } from '../lib/bus'
import { prefersReduced } from '../lib/motion'
import { profile } from '../data'

const DURATION = 3400

// corridor (world units) and how far it stretches
const HW = 1.7 // half width
const HH = 1.05 // half height
const Z_NEAR = 0.35
const Z_FAR = 46
const RING_GAP = 1.1

const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v))
const smooth = (t) => t * t * (3 - 2 * t)

export default function Loader() {
  const canvas = useRef(null)
  const [pct, setPct] = useState(0)
  const [state, setState] = useState(() => (prefersReduced() ? 'gone' : 'run')) // run → exit → gone

  useEffect(() => {
    if (state === 'gone') {
      if (!onceFired('loader:done')) emitOnce('loader:done')
      return
    }
    if (state !== 'run') return
    document.documentElement.classList.add('is-loading')
    const c = canvas.current
    const ctx = c.getContext('2d')
    let w = 0, h = 0, dpr = 1, raf = 0
    const resize = () => {
      dpr = Math.min(2, window.devicePixelRatio || 1)
      w = c.width = innerWidth * dpr
      h = c.height = innerHeight * dpr
    }
    resize()
    addEventListener('resize', resize)

    // floating dust inside the corridor
    const dust = Array.from({ length: 110 }, () => ({
      x: (Math.random() * 2 - 1) * HW * 0.9,
      y: (Math.random() * 2 - 1) * HH * 0.9,
      z: Z_NEAR + Math.random() * 24,
      r: 0.6 + Math.random() * 1.4,
    }))
    // soft bokeh blobs
    const blobs = Array.from({ length: 7 }, (_, i) => ({
      x: Math.random(), y: Math.random(), r: 0.18 + Math.random() * 0.22, s: 0.4 + Math.random() * 0.6, p: i * 1.7,
    }))

    const start = performance.now()
    let camZ = 0, last = start

    const frame = (now) => {
      const t = clamp((now - start) / DURATION)
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now
      const speed = 0.9 + 2.4 * t * t // ease into a faster glide
      camZ += dt * speed

      const f = h * 0.62 // focal length
      const cx = w * 0.5, cy = h * 0.5
      const bendX = (w * 0.2) / (Z_FAR * f) // corridor curves right…
      const bendY = (h * 0.05) / (Z_FAR * f) // …and slightly up
      const P = (x, y, z) => [cx + (x + bendX * z * z) * (f / z), cy + (y - bendY * z * z) * (f / z)]
      const depthAlpha = (z) => Math.pow(1 - clamp(z / Z_FAR), 0.7)

      // base blue
      const bg = ctx.createLinearGradient(0, 0, w, h)
      bg.addColorStop(0, '#6a8cff')
      bg.addColorStop(0.55, '#4a6ff0')
      bg.addColorStop(1, '#3456d6')
      ctx.fillStyle = bg
      ctx.fillRect(0, 0, w, h)

      // drifting bokeh
      const ts = (now - start) / 1000
      for (const b of blobs) {
        const bx = (b.x + 0.06 * Math.sin(ts * 0.3 * b.s + b.p)) * w
        const by = (b.y + 0.05 * Math.cos(ts * 0.25 * b.s + b.p)) * h
        const g = ctx.createRadialGradient(bx, by, 0, bx, by, b.r * Math.max(w, h))
        g.addColorStop(0, 'rgba(160,185,255,0.35)')
        g.addColorStop(1, 'rgba(160,185,255,0)')
        ctx.fillStyle = g
        ctx.fillRect(0, 0, w, h)
      }

      // light at the end of the tunnel — blooms as loading completes
      const [vx, vy] = P(0, 0, Z_FAR * 0.5)
      const bloom = 0.22 + 0.5 * Math.pow(t, 3)
      const glow = ctx.createRadialGradient(vx, vy, 0, vx, vy, Math.max(w, h) * bloom)
      glow.addColorStop(0, 'rgba(235,242,255,0.95)')
      glow.addColorStop(0.25, 'rgba(190,210,255,0.55)')
      glow.addColorStop(1, 'rgba(120,150,255,0)')
      ctx.fillStyle = glow
      ctx.fillRect(0, 0, w, h)

      ctx.lineCap = 'round'

      // longitudinal grid lines along walls, floor and ceiling (they curve with the bend)
      const rails = []
      const NX = 12, NY = 8
      for (let i = 0; i <= NX; i++) {
        const x = -HW + (2 * HW * i) / NX
        rails.push([x, HH], [x, -HH])
      }
      for (let j = 1; j < NY; j++) {
        const y = -HH + (2 * HH * j) / NY
        rails.push([HW, y], [-HW, y])
      }
      for (const [x, y] of rails) {
        let prev = null
        for (let z = Z_NEAR; z <= Z_FAR; z *= 1.12) {
          const p = P(x, y, z)
          if (prev) {
            const a = depthAlpha(z)
            ctx.strokeStyle = `rgba(235,240,255,${(0.42 * a).toFixed(3)})`
            ctx.lineWidth = Math.max(0.6, 1.1 * dpr * a)
            ctx.beginPath()
            ctx.moveTo(prev[0], prev[1])
            ctx.lineTo(p[0], p[1])
            ctx.stroke()
          }
          prev = p
        }
      }

      // cross-section rings rushing toward the camera
      const off = camZ % RING_GAP
      for (let z = RING_GAP - off; z < Z_FAR; z += RING_GAP) {
        if (z < Z_NEAR) continue
        const a = depthAlpha(z) * clamp((z - Z_NEAR) / 0.8) // fade in as it reaches the lens
        const tl = P(-HW, -HH, z), tr = P(HW, -HH, z), br = P(HW, HH, z), bl = P(-HW, HH, z)
        ctx.strokeStyle = `rgba(235,240,255,${(0.45 * a).toFixed(3)})`
        ctx.lineWidth = Math.max(0.6, 1.2 * dpr * a)
        ctx.beginPath()
        ctx.moveTo(tl[0], tl[1])
        ctx.lineTo(tr[0], tr[1])
        ctx.lineTo(br[0], br[1])
        ctx.lineTo(bl[0], bl[1])
        ctx.closePath()
        ctx.stroke()
      }

      // dust motes
      for (const d of dust) {
        d.z -= dt * speed
        if (d.z < Z_NEAR) d.z += 24
        const [px, py] = P(d.x, d.y, d.z)
        ctx.fillStyle = `rgba(240,245,255,${(depthAlpha(d.z) * 0.8).toFixed(3)})`
        ctx.beginPath()
        ctx.arc(px, py, d.r * dpr * Math.min(2.5, 2 / d.z + 0.3), 0, Math.PI * 2)
        ctx.fill()
      }

      // soft vignette
      const vg = ctx.createRadialGradient(cx, cy, Math.min(w, h) * 0.3, cx, cy, Math.max(w, h) * 0.75)
      vg.addColorStop(0, 'rgba(20,40,150,0)')
      vg.addColorStop(1, 'rgba(20,40,150,0.35)')
      ctx.fillStyle = vg
      ctx.fillRect(0, 0, w, h)

      setPct(Math.round(smooth(t) * 100))
      if (t < 1) raf = requestAnimationFrame(frame)
      else {
        setState('exit')
        emitOnce('loader:done')
      }
    }
    raf = requestAnimationFrame(frame)
    return () => {
      cancelAnimationFrame(raf)
      removeEventListener('resize', resize)
    }
  }, [state])

  useEffect(() => {
    if (state !== 'exit') return
    document.documentElement.classList.remove('is-loading')
    const id = setTimeout(() => setState('gone'), 1000)
    return () => clearTimeout(id)
  }, [state])

  if (state === 'gone') return null
  return (
    <div className={`loader ${state === 'exit' ? 'is-exit' : ''}`} aria-hidden="true">
      <canvas ref={canvas} />
      <p className="loader__label">
        Loading <span className="loader__pct">{String(pct).padStart(2, '0')}%</span>
      </p>
      <h2 className="loader__name">{profile.fullName}.</h2>
    </div>
  )
}
