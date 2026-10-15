import { useRef, useState } from 'react'
import { projects, profile } from '../data'
import Reveal from '../lib/Reveal'
import { flip } from '../lib/motion'
import Icon from './Icons'
import Bot from './Bot'
import '../styles/projects.css'

function Art({ type }) {
  if (type === 'terminal')
    return (
      <div className="art art--term">
        <p><span className="g">➜</span> POST /hooks/:token</p>
        <p className="d1"><span className="g">[202]</span> payload stored</p>
        <p className="d2"><span className="g">[ok]</span> replay delivered ✓</p>
        <span className="caret" />
      </div>
    )
  if (type === 'share')
    return (
      <div className="art art--share">
        <div className="art__field"><span>Manali · 2 travellers</span><b>Book</b></div>
        <div className="art__people">
          {['#0039ff', '#5A7FFF', '#8a8a90', '#101013'].map((c, i) => (
            <span key={c} style={{ background: c, '--i': i }} />
          ))}
        </div>
      </div>
    )
  if (type === 'comment')
    return (
      <div className="art art--comment">
        <p className="art__hl">Which AWS service <mark>stores objects?</mark></p>
        <div className="art__bubble"><Icon name="check" size={12} /> Correct — Amazon S3</div>
      </div>
    )
  if (type === 'chart')
    return (
      <div className="art art--chart">
        <div className="art__bars">
          {[46, 72, 58, 88, 64, 80, 52].map((h, i) => (
            <i key={i} style={{ '--h': `${h}%`, '--i': i }} />
          ))}
        </div>
        <div className="art__ring">
          <svg viewBox="0 0 44 44"><circle cx="22" cy="22" r="18" pathLength="1" /></svg>
          <b>75%</b>
        </div>
      </div>
    )
  return (
    <div className="art art--review">
      <Bot size={42} />
      <div className="art__checks">
        {['Savings', 'Market', 'Investment'].map((c, i) => (
          <p key={c} style={{ '--i': i }}><Icon name="check" size={12} /> {c}</p>
        ))}
      </div>
    </div>
  )
}

function ProjectCard({ p, i }) {
  const face = useRef(null)
  const [back, setBack] = useState(false)
  const busy = useRef(false)
  const toggle = () => {
    if (busy.current) return
    busy.current = true
    flip(face.current, () => setBack((b) => !b), back ? -1 : 1).then(() => (busy.current = false))
  }
  const tilt = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width - 0.5
    const y = (e.clientY - r.top) / r.height - 0.5
    e.currentTarget.style.setProperty('--rx', `${(-y * 6).toFixed(2)}deg`)
    e.currentTarget.style.setProperty('--ry', `${(x * 8).toFixed(2)}deg`)
  }
  const untilt = (e) => {
    e.currentTarget.style.setProperty('--rx', '0deg')
    e.currentTarget.style.setProperty('--ry', '0deg')
  }
  return (
    <Reveal className="pcard-wrap" delay={0.15 + i * 0.12} variant="clip">
      <div className="pcard-tilt" onPointerMove={tilt} onPointerLeave={untilt}>
        <article className={`pcard ${back ? 'is-back' : ''}`} ref={face}>
          {!back ? (
            <>
              <Art type={p.art} />
              <div className="pcard__body">
                <span className="pcard__no">0{i + 1}</span>
                <h3>{p.title}</h3>
                <p>{p.blurb}</p>
                <button className="pcard__flip" onClick={toggle}>
                  Details <Icon name="arrow" size={16} />
                </button>
              </div>
            </>
          ) : (
            <div className="pcard__back">
              <span className="pcard__no">0{i + 1}</span>
              <h3>{p.title}</h3>
              {p.highlights && (
                <ul className="pcard__points">
                  {p.highlights.map((h) => <li key={h}>{h}</li>)}
                </ul>
              )}
              <div className="pcard__tech">{p.tech.map((t) => <span key={t}>{t}</span>)}</div>
              {(p.github || p.live) && (
                <div className="pcard__links">
                  {p.github && (
                    <a href={p.github} target="_blank" rel="noreferrer" className="btn btn--blue btn--sm">
                      <Icon name="github" size={16} /> Code
                    </a>
                  )}
                  {p.live && (
                    <a href={p.live} target="_blank" rel="noreferrer" className="btn btn--ghost btn--sm">
                      Live <Icon name="arrowUpRight" size={16} />
                    </a>
                  )}
                </div>
              )}
              <button className="pcard__flip" onClick={toggle}>
                <Icon name="arrow" size={16} style={{ transform: 'scaleX(-1)' }} /> Back
              </button>
            </div>
          )}
        </article>
      </div>
    </Reveal>
  )
}

export default function Projects() {
  const gh = profile.socials.find((s) => s.icon === 'github')
  return (
    <section className="projects section" id="projects">
      <div className="container">
        <div className="projects__head">
          <div>
            <Reveal as="p" className="eyebrow">Projects</Reveal>
            <Reveal as="h2" className="h2" delay={0.08}>
              Things I’ve built <em>for the real world.</em>
            </Reveal>
          </div>
          <Reveal delay={0.16}>
            <a className="btn btn--blue" href={gh?.href} target="_blank" rel="noreferrer">
              <Icon name="github" size={18} /> More on GitHub
            </a>
          </Reveal>
        </div>
        <div className="projects__panel">
          <div className="projects__bg" aria-hidden="true">
            <i className="orb o1" /><i className="orb o2" /><i className="orb o3" />
          </div>
          <div className="projects__grid">
            {projects.map((p, i) => <ProjectCard p={p} i={i} key={p.title} />)}
          </div>
        </div>
      </div>
    </section>
  )
}
