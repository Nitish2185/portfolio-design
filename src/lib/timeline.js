// Pausable timeline (timers + WAAPI animations) — the storyboard pauses
// itself when the hero scrolls out of view or the tab is hidden.
export class Timeline {
  constructor() {
    this.paused = true
    this.dead = false
    this.timers = new Set()
    this.anims = new Set()
    this.listeners = new Set()
  }
  after(ms, fn) {
    if (this.dead) return null
    const t = { fn, remaining: Math.max(0, ms), start: 0, id: null }
    this.timers.add(t)
    if (!this.paused) this.arm(t)
    return t
  }
  clear(t) {
    if (!t) return
    if (t.id !== null) clearTimeout(t.id)
    this.timers.delete(t)
  }
  sleep(ms) {
    return new Promise((r) => this.after(ms, r))
  }
  animate(el, kf, opts) {
    if (this.dead || typeof el.animate !== 'function') return null
    const a = el.animate(kf, opts)
    this.anims.add(a)
    if (this.paused) a.pause?.()
    const done = () => this.anims.delete(a)
    a.addEventListener?.('finish', done)
    a.addEventListener?.('cancel', done)
    return a
  }
  onChange(fn) {
    this.listeners.add(fn)
  }
  pause() {
    if (this.paused || this.dead) return
    this.paused = true
    const now = performance.now()
    this.timers.forEach((t) => {
      if (t.id !== null) clearTimeout(t.id)
      t.id = null
      t.remaining = Math.max(0, t.remaining - (now - t.start))
    })
    this.anims.forEach((a) => a.pause?.())
    this.listeners.forEach((f) => f(true))
  }
  resume() {
    if (!this.paused || this.dead) return
    this.paused = false
    this.timers.forEach((t) => this.arm(t))
    this.anims.forEach((a) => a.play?.())
    this.listeners.forEach((f) => f(false))
  }
  destroy() {
    this.dead = true
    this.timers.forEach((t) => t.id !== null && clearTimeout(t.id))
    this.timers.clear()
    this.anims.forEach((a) => a.cancel?.())
    this.anims.clear()
    this.listeners.clear()
  }
  arm(t) {
    t.start = performance.now()
    t.id = setTimeout(() => {
      this.timers.delete(t)
      t.fn()
    }, t.remaining)
  }
}
