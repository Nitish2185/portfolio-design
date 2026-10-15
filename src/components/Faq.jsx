import { useState } from 'react'
import { faqs } from '../data'
import Reveal from '../lib/Reveal'
import Icon from './Icons'
import '../styles/faq.css'

function Item({ f, i, open, onToggle }) {
  return (
    <Reveal as="li" className={`faq__item ${open ? 'is-open' : ''}`} delay={0.05 * i}>
      <button className="faq__q" aria-expanded={open} onClick={onToggle}>
        <span>{f.q}</span>
        <Icon name="chevron" size={20} />
      </button>
      <div className="faq__a" aria-hidden={!open}>
        <div>
          <p>{f.a}</p>
        </div>
      </div>
    </Reveal>
  )
}

export default function Faq() {
  const [open, setOpen] = useState(0)
  return (
    <section className="faq section" id="faq">
      <div className="container faq__grid">
        <div>
          <Reveal as="p" className="eyebrow">FAQs</Reveal>
          <Reveal as="h2" className="h2" delay={0.08}>Frequently asked questions</Reveal>
        </div>
        <ul className="faq__list">
          {faqs.map((f, i) => (
            <Item key={f.q} f={f} i={i} open={open === i} onToggle={() => setOpen(open === i ? -1 : i)} />
          ))}
        </ul>
      </div>
    </section>
  )
}
