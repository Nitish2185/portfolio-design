import { useEffect, useState } from 'react'

// Easing curves lifted from the reference stylesheet
export const EASE_OUT = 'cubic-bezier(0.16,0.84,0.3,1)'
export const EASE_SOFT = 'cubic-bezier(0.22,1,0.36,1)'
export const EASE_IN_FLIP = 'cubic-bezier(.55,0,1,.45)'
export const EASE_OUT_FLIP = 'cubic-bezier(0,.55,.45,1)'

export const prefersReduced = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

export function useReducedMotion() {
  const [r, setR] = useState(prefersReduced)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const f = () => setR(mq.matches)
    mq.addEventListener('change', f)
    return () => mq.removeEventListener('change', f)
  }, [])
  return r
}

export function useInView(ref, { threshold = 0.05, rootMargin = '0px', once = false } = {}) {
  const [v, setV] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => {
        setV(e.isIntersecting)
        if (e.isIntersecting && once) io.disconnect()
      },
      { threshold, rootMargin },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [ref, threshold, rootMargin, once])
  return v
}

export function usePageVisible() {
  const [v, setV] = useState(() => typeof document === 'undefined' || !document.hidden)
  useEffect(() => {
    const f = () => setV(!document.hidden)
    document.addEventListener('visibilitychange', f)
    return () => document.removeEventListener('visibilitychange', f)
  }, [])
  return v
}

/**
 * 3D card flip identical to the reference: rotate the face away to -90°
 * (ease-in, 420ms), swap content, then bring it back from +90° (ease-out, 520ms).
 */
export function flip(el, swap, dir = 1, speed = 1, tl) {
  if (!el || prefersReduced() || typeof el.animate !== 'function') {
    swap()
    return Promise.resolve()
  }
  const animate = (kf, opts) => (tl ? tl.animate(el, kf, opts) : el.animate(kf, opts))
  return new Promise((resolve) => {
    const a = animate([{ transform: 'rotateY(0deg)' }, { transform: `rotateY(${-90 * dir}deg)` }], {
      duration: 420 / speed,
      easing: EASE_IN_FLIP,
      fill: 'forwards',
    })
    if (!a) return swap(), resolve()
    a.onfinish = () => {
      swap()
      const b = animate([{ transform: `rotateY(${90 * dir}deg)` }, { transform: 'rotateY(0deg)' }], {
        duration: 520 / speed,
        easing: EASE_OUT_FLIP,
        fill: 'forwards',
      })
      if (!b) return a.cancel(), resolve()
      b.onfinish = () => {
        a.cancel()
        b.cancel()
        resolve()
      }
    }
  })
}

/** "Dust" swap — a ghost copy blurs away with a blue glow while the real element updates. */
export function dust(el, swap, duration = 720) {
  if (!el || prefersReduced()) {
    swap()
    return Promise.resolve()
  }
  const parent = el.offsetParent || el.parentElement
  const ghost = el.cloneNode(true)
  Object.assign(ghost.style, {
    position: 'absolute',
    left: el.offsetLeft + 'px',
    top: el.offsetTop + 'px',
    width: el.offsetWidth + 'px',
    height: el.offsetHeight + 'px',
    margin: 0,
    pointerEvents: 'none',
  })
  ghost.classList.add('dust-ghost')
  parent?.appendChild(ghost)
  el.classList.remove('px-in')
  void el.offsetWidth
  el.classList.add('px-in')
  setTimeout(swap, duration * 0.4)
  return new Promise((r) =>
    setTimeout(() => {
      ghost.remove()
      el.classList.remove('px-in')
      r()
    }, duration + 40),
  )
}

/** Low-powered device or no WebGL → serve the simplified animation path. */
export function isLowPower() {
  if (typeof window === 'undefined') return true
  const nav = navigator
  if (nav.connection?.saveData) return true
  if ((nav.hardwareConcurrency || 8) <= 2 || (nav.deviceMemory || 8) <= 2) return true
  try {
    const c = document.createElement('canvas')
    return !(c.getContext('webgl2') || c.getContext('webgl'))
  } catch {
    return true
  }
}
