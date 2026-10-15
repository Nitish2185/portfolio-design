import { useEffect, useRef } from 'react'
import { education } from '../data'
import Reveal from '../lib/Reveal'
import { prefersReduced } from '../lib/motion'
import '../styles/experience.css'

/**
 * Pinned "fold": as you scroll through the tall section, entries enter one at a time
 * (and leave again in reverse when scrolling back) — stepping one item per frame
 * toward the scroll target, as the reference fold2 does.
 */
export default function Experience() {
  const sec = useRef(null)
  const list = useRef(null)
  const rail = useRef(null)

  useEffect(() => {
    const items = [...list.current.querySelectorAll('.xp')]
    if (prefersReduced()) return items.forEach((i) => i.classList.add('en'))
    let shown = 0, target = 0, raf = 0
    const step = () => {
      raf = 0
      if (shown === target) return
      if (shown < target) items[shown++].classList.add('en')
      else items[--shown].classList.remove('en')
      raf = requestAnimationFrame(() => setTimeout(step, 90))
    }
    const measure = () => {
      const r = sec.current.getBoundingClientRect()
      const total = r.height - innerHeight
      const p = Math.min(1, Math.max(0, -r.top / Math.max(1, total)))
      rail.current.style.transform = `scaleY(${p})`
      const t = Math.min(items.length, Math.floor(p * (items.length + 0.6) + (r.top < innerHeight * 0.3 ? 1 : 0)))
      if (t !== target) {
        target = t
        if (!raf) step()
      }
    }
    let ticking = 0
    const f = () => ticking || (ticking = requestAnimationFrame(() => ((ticking = 0), measure())))
    measure()
    addEventListener('scroll', f, { passive: true })
    addEventListener('resize', f)
    return () => {
      removeEventListener('scroll', f)
      removeEventListener('resize', f)
      cancelAnimationFrame(ticking)
    }
  }, [])

  return (
    <section className="xp-sec" id="education" ref={sec} style={{ '--n': education.length }}>
      <div className="xp-sticky">
        <div className="container xp-grid">
          <div className="xp-head">
            <Reveal as="p" className="eyebrow">Education</Reveal>
            <Reveal as="h2" className="h2" delay={0.08}>
              The road <em>so far.</em>
            </Reveal>
            <Reveal as="p" className="lead" delay={0.16}>
              From high school to a Master’s in Computer Applications — keep scrolling to walk the timeline.
            </Reveal>
          </div>
          <div className="xp-frame">
            <div className="xp-rail"><i ref={rail} /></div>
            <ol className="xp-list" ref={list}>
              {education.map((e, i) => (
                <li className="xp" key={i} style={{ '--i': i }}>
                  <span className="xp__dot" />
                  <div className="xp__top">
                    <h3>{e.title}</h3>
                    <span className="xp__period">{e.period}</span>
                  </div>
                  <p className="xp__co">{e.school} · <b className="xp__score">{e.score}</b></p>
                  {e.points.length > 0 && (
                    <ul>
                      {e.points.map((p, j) => <li key={j}>{p}</li>)}
                    </ul>
                  )}
                  {e.tags.length > 0 && <div className="xp__tags">{e.tags.map((t) => <span key={t}>{t}</span>)}</div>}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  )
}
