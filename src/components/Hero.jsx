import { lazy, Suspense, useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { profile } from '../data'
import { emit } from '../lib/bus'
import { isLowPower, useInView, useReducedMotion } from '../lib/motion'
import Icon from './Icons'
import '../styles/hero.css'

const TwistedRing = lazy(() => import('./three/TwistedRing'))

// "I *build* for the *web*." → highlighted words in electric blue
const highlight = (line) => line.split(/(\*[^*]+\*)/).map((part, i) => (part.startsWith('*') ? <em key={i}>{part.slice(1, -1)}</em> : part))

function RingFallback() {
  // lightweight stand-in for low-powered devices: CSS-rotated wireframe ellipses
  return (
    <svg className="hero__ring-fallback" viewBox="-100 -100 200 200" aria-hidden="true">
      {Array.from({ length: 9 }, (_, i) => (
        <ellipse key={i} rx="78" ry={22 + i * 2} transform={`rotate(${i * 20})`} className={i % 3 === 0 ? 'hl' : ''} />
      ))}
    </svg>
  )
}

export default function Hero() {
  const root = useRef(null)
  const reduced = useReducedMotion()
  const [lowPower] = useState(isLowPower)
  const visible = useInView(root, { threshold: 0 })

  // entrance: ~1.1s — object fades/scales in while the copy rises line by line
  useLayoutEffect(() => {
    if (reduced) return
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.from('.hero__object', { opacity: 0, scale: 0.9, duration: 1.2 }, 0)
        .from('.hero__glow i', { opacity: 0, duration: 1.4, stagger: 0.15 }, 0)
        .from(
          '.hero__kicker, .hero__title .line, .hero__intro, .hero__ctas, .hero__cue',
          { opacity: 0, y: 26, duration: 0.85, stagger: 0.08 },
          0.15,
        )
    }, root)
    return () => ctx.revert()
  }, [reduced])

  return (
    <section className={`hero ${reduced ? '' : 'is-animated'}`} id="top" ref={root}>
      <div className="hero__glow" aria-hidden="true">
        <i /><i /><i />
      </div>

      {/* thin technical lines that draw themselves in */}
      <div className="hero__lines" aria-hidden="true">
        <i className="tl tl--h" style={{ '--y': '22%', '--d': '0.2s' }} />
        <i className="tl tl--h" style={{ '--y': '78%', '--d': '0.45s' }} />
        <i className="tl tl--v" style={{ '--x': '50%', '--d': '0.35s' }} />
      </div>

      <div className="hero__inner">
        <div className="hero__object">
          <svg className="hero__guides" viewBox="0 0 100 100" aria-hidden="true">
            <circle cx="50" cy="50" r="46" pathLength="1" className="g g--dash" style={{ '--d': '0.5s' }} />
            <path d="M50 0 V12 M50 88 V100 M0 50 H12 M88 50 H100" pathLength="1" className="g" style={{ '--d': '0.7s' }} />
            <path d="M4 14 V4 H14 M86 4 H96 V14 M96 86 V96 H86 M14 96 H4 V86" pathLength="1" className="g g--blue" style={{ '--d': '0.9s' }} />
          </svg>
          <div className="hero__canvas">
            {lowPower || reduced ? (
              <RingFallback />
            ) : (
              <Suspense fallback={<RingFallback />}>
                <TwistedRing running={visible} animate />
              </Suspense>
            )}
          </div>
          <p className="hero__fig">
            <span>FIG.01</span> TWISTED RING <span>· RX 0.16 · RY 0.24 rad/s</span>
          </p>
        </div>

        <div className="hero__copy">
          <p className="hero__kicker">
            <span className="hero__kicker-dot" /> {profile.role} · {profile.location}
          </p>
          <h1 className="hero__title">
            {profile.headline.map((l, i) => (
              <span className="line" key={i}>
                {highlight(l)}
              </span>
            ))}
          </h1>
          <p className="hero__intro">{profile.intro}</p>
          <div className="hero__ctas">
            <a className="btn btn--blue" href={profile.resume} download>
              Download Resume <Icon name="download" size={18} />
            </a>
            <a className="btn btn--ghost" href="#contact">
              Let’s connect <Icon name="arrow" size={18} />
            </a>
          </div>
        </div>
      </div>

      <button
        className="hero__cue"
        onClick={() => emit('tunnel:play') || document.getElementById('showcase')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <span className="hero__mouse"><i /></span>
        Scroll to enter
      </button>
    </section>
  )
}
