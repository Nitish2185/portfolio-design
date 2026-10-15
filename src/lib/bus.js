// Tiny event bus — the loader, hero storyboard and sky talk through it
// (mirrors the reference site's "loader:done" / "sky:lift" events).
const map = new Map()
export function on(name, fn) {
  if (!map.has(name)) map.set(name, new Set())
  map.get(name).add(fn)
  return () => map.get(name)?.delete(fn)
}
export function emit(name, payload) {
  map.get(name)?.forEach((fn) => fn(payload))
}
// remember one-shot events so late subscribers still fire
const fired = new Set()
export function emitOnce(name, payload) {
  fired.add(name)
  emit(name, payload)
}
export function onceFired(name) {
  return fired.has(name)
}
