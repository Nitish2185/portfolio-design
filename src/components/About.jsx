import { Component, lazy, Suspense, useEffect, useRef, useState } from 'react'
import { profile, skillGroups, projects, certifications, education } from '../data'
import Reveal from '../lib/Reveal'
import { useInView, prefersReduced, isLowPower } from '../lib/motion'
import Icon from './Icons'
import Bot from './Bot'

const TwistedRing = lazy(() => import('./three/TwistedRing'))

// if the 3D chunk fails to load (offline, stale deploy), show the fallback instead of breaking the page
class RingBoundary extends Component {
  state = { failed: false }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children
  }
}

// lightweight stand-in for low-powered devices / reduced motion: CSS-rotated wireframe ellipses
function RingFallback() {
  return (
    <svg className="ring-fallback" viewBox="-100 -100 200 200" aria-hidden="true">
      {Array.from({ length: 9 }, (_, i) => (
        <ellipse key={i} rx="78" ry={22 + i * 2} transform={`rotate(${i * 20})`} className={i % 3 === 0 ? 'hl' : ''} />
      ))}
    </svg>
  )
}
import '../styles/about.css'

/* Statement paragraph — each word brightens as it scrolls through the viewport */
export function Statement() {
  const ref = useRef(null)
  const section = useRef(null)
  const onScreen = useInView(section, { threshold: 0 })
  const [simple] = useState(() => prefersReduced() || isLowPower())
  const words = profile.statement.split(' ')
  useEffect(() => {
    const el = ref.current
    const spans = [...el.querySelectorAll('span')]
    if (prefersReduced()) return spans.forEach((s) => (s.style.opacity = 1))
    let raf = 0
    const update = () => {
      raf = 0
      const r = el.getBoundingClientRect()
      const p = Math.min(1, Math.max(0, (innerHeight * 0.85 - r.top) / (r.height + innerHeight * 0.35)))
      const lit = p * spans.length
      spans.forEach((s, i) => (s.style.opacity = (0.16 + 0.84 * Math.min(1, Math.max(0, lit - i))).toFixed(3)))
    }
    const f = () => raf || (raf = requestAnimationFrame(update))
    update()
    addEventListener('scroll', f, { passive: true })
    addEventListener('resize', f)
    return () => {
      removeEventListener('scroll', f)
      removeEventListener('resize', f)
      cancelAnimationFrame(raf)
    }
  }, [])
  return (
    <section className="statement" ref={section}>
      <div className="statement__grid">
        {/* first half: the floating 3D twisted ring */}
        <div className="statement__ring" aria-hidden="true">
          <div className="statement__glow"><i /><i /></div>
          <div className="statement__canvas">
            {simple ? (
              <RingFallback />
            ) : (
              <RingBoundary fallback={<RingFallback />}>
                <Suspense fallback={<RingFallback />}>
                  <TwistedRing running={onScreen} animate />
                </Suspense>
              </RingBoundary>
            )}
          </div>
        </div>
        {/* second half: the statement, lit word by word as you scroll */}
        <p ref={ref}>
          {words.map((w, i) => (
            <span key={i}>{w} </span>
          ))}
        </p>
      </div>
    </section>
  )
}

function PointIcon({ type, live }) {
  if (type === 'bot') return <Bot size={44} />
  if (type === 'seal')
    return (
      <svg className={`seal ${live ? 'is-live' : ''}`} viewBox="0 0 48 48" width="44" height="44" aria-hidden="true">
        <path className="seal__shape" d="M24 3l5 4.2 6.4-.9 2.4 6 6 2.4-.9 6.4L47 26l-4.2 5 .9 6.4-6 2.4-2.4 6-6.4-.9L24 49l-5-4.2-6.4.9-2.4-6-6-2.4.9-6.4L1 26l4.2-5-.9-6.4 6-2.4 2.4-6 6.4.9z" transform="scale(.92) translate(2 -1)" />
        <path className="seal__line" pathLength="1" d="M15 24.5l6 6 12-12.5" />
      </svg>
    )
  return (
    <span className="globe-ic">
      <Icon name="globe" size={40} />
    </span>
  )
}

export function About() {
  const ref = useRef(null)
  const live = useInView(ref, { threshold: 0.3, once: true })
  return (
    <section className="about section" id="about" ref={ref}>
      <div className="container about__grid">
        <div>
          <Reveal as="p" className="eyebrow">About me</Reveal>
          <Reveal as="h2" className="h2" delay={0.08}>{profile.about.title}</Reveal>
          <Reveal as="p" className="lead" delay={0.16}>{profile.about.body}</Reveal>
          <div className="about__skills">
            {skillGroups.map((g, i) => (
              <Reveal className="about__group" key={g.name} delay={0.2 + i * 0.06}>
                <span className="about__group-name">{g.name}</span>
                <div className="about__chips">
                  {g.items.map((t) => (
                    <span className="chip" key={t}>{t}</span>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
        <ul className="about__points">
          {profile.about.points.map((p, i) => (
            <Reveal as="li" key={p.title} delay={0.1 + i * 0.12} className="point">
              <PointIcon type={p.icon} live={live} />
              <div>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}

/* Impact stats with count-up */
function Count({ to, suffix = '', dec = 0 }) {
  const ref = useRef(null)
  const seen = useInView(ref, { threshold: 0.6, once: true })
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!seen) return
    if (prefersReduced()) return setN(to)
    let raf
    const t0 = performance.now()
    const tick = (now) => {
      const t = Math.min(1, (now - t0) / 1400)
      setN(to * (1 - Math.pow(1 - t, 4)))
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [seen, to])
  return (
    <span ref={ref}>
      {n.toLocaleString(undefined, { minimumFractionDigits: dec, maximumFractionDigits: dec })}
      {suffix}
    </span>
  )
}

export function Stats() {
  const stats = [
    { n: projects.length, s: '', label: 'featured projects' },
    { n: certifications.length, s: '', label: 'certifications earned' },
    { n: parseFloat(education[0].score), s: '%', dec: 2, label: 'MCA aggregate at ABES' },
  ]
  return (
    <section className="stats section">
      <div className="container">
        <Reveal as="p" className="eyebrow center">Impact</Reveal>
        <Reveal as="h2" className="h2 center" delay={0.08}>
          A quick look, <em>by the numbers.</em>
        </Reveal>
        <div className="stats__row">
          {stats.map((s, i) => (
            <Reveal className="stat" key={s.label} delay={0.12 + i * 0.12}>
              <b><Count to={s.n} suffix={s.s} dec={s.dec} /></b>
              <span>{s.label}</span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
