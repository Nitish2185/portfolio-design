// Tiny event bus — the hero, tunnel transition and showcase talk through it
// (hero cue → tunnel transition → showcase).
const map = new Map()
export function on(name, fn) {
  if (!map.has(name)) map.set(name, new Set())
  map.get(name).add(fn)
  return () => map.get(name)?.delete(fn)
}
/** Returns how many listeners handled the event. */
export function emit(name, payload) {
  const set = map.get(name)
  set?.forEach((fn) => fn(payload))
  return set ? set.size : 0
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
