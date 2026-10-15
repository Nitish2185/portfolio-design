import { useState } from 'react'
import { certifications } from '../data'
import Reveal from '../lib/Reveal'
import Icon from './Icons'
import '../styles/certifications.css'

function Cert({ c, i }) {
  const [flipped, setFlipped] = useState(false)
  return (
    <Reveal className="cert-wrap" delay={0.08 + (i % 3) * 0.12} variant="flip">
      <div
        className={`cert ${flipped ? 'is-flipped' : ''}`}
        role="button"
        tabIndex={0}
        aria-pressed={flipped}
        aria-label={`${c.title} — show details`}
        onClick={() => setFlipped((f) => !f)}
        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), setFlipped((f) => !f))}
      >
        <div className="cert__face cert__front">
          <span className="cert__medal">
            <svg viewBox="0 0 80 80" aria-hidden="true">
              <circle cx="40" cy="40" r="30" className="cert__ring" pathLength="1" />
              <circle cx="40" cy="40" r="22" className="cert__core" />
            </svg>
            <Icon name="badge" size={26} />
          </span>
          <span className="cert__issuer">{c.issuer}</span>
          <span className="cert__title">{c.title}</span>
          <span className="cert__date">{c.date}</span>
          <span className="cert__hint">
            Flip for details <Icon name="arrow" size={14} />
          </span>
        </div>
        <div className="cert__face cert__back">
          <span className="cert__issuer">Credential</span>
          <span className="cert__title">{c.title}</span>
          <span className="cert__meta"><b>Issuer</b>{c.issuer}</span>
          <span className="cert__meta"><b>Issued</b>{c.date}</span>
          <span className="cert__meta"><b>ID</b><code>{c.id}</code></span>
          <a className="btn btn--white btn--sm" href={c.url} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()}>
            Verify <Icon name="external" size={14} />
          </a>
        </div>
      </div>
    </Reveal>
  )
}

export default function Certifications() {
  return (
    <section className="certs section" id="certifications">
      <div className="container">
        <Reveal as="p" className="eyebrow center">Certifications</Reveal>
        <Reveal as="h2" className="h2 center" delay={0.08}>
          Always learning, <em>always shipping.</em>
        </Reveal>
        <Reveal as="p" className="lead center" delay={0.16}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Hover or tap a card to flip it.
        </Reveal>
        <div className="certs__grid">
          {certifications.map((c, i) => (
            <Cert c={c} i={i} key={c.id} />
          ))}
        </div>
      </div>
    </section>
  )
}
