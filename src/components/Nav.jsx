import { useEffect, useState } from 'react'
import { nav, profile } from '../data'
import Icon from './Icons'

export default function Nav() {
  const [ready, setReady] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')

  useEffect(() => {
    const id = requestAnimationFrame(() => setReady(true))
    return () => cancelAnimationFrame(id)
  }, [])

  useEffect(() => {
    const f = () => setScrolled(scrollY > 24)
    f()
    addEventListener('scroll', f, { passive: true })
    return () => removeEventListener('scroll', f)
  }, [])

  // highlight the section currently in view
  useEffect(() => {
    const els = nav.map((n) => document.getElementById(n.id)).filter(Boolean)
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('menu-open', open)
  }, [open])

  return (
    <header className={`nav ${ready ? 'is-in' : ''} ${scrolled ? 'is-scrolled' : ''} ${open ? 'is-open' : ''}`}>
      <div className="nav__bar">
        <a href="#top" className="nav__logo" onClick={() => setOpen(false)}>
          <span className="nav__logo-mark">/</span>
          {profile.handle}
          <span className="nav__logo-dot">.dev</span>
        </a>
        <nav className="nav__links" aria-label="Primary">
          {nav.map((n) => (
            <a key={n.id} href={`#${n.id}`} className={active === n.id ? 'is-active' : ''}>
              {n.label}
            </a>
          ))}
        </nav>
        <div className="nav__cta">
          <a href="#contact" className="btn btn--ghost btn--sm nav__connect">Connect</a>
          <a href={profile.resume} download className="btn btn--blue btn--sm">
            Resume <Icon name="download" size={16} />
          </a>
          <button className="nav__burger" aria-label="Menu" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
            <Icon name={open ? 'close' : 'menu'} size={22} />
          </button>
        </div>
      </div>
      <div className="nav__sheet" onClick={() => setOpen(false)}>
        {nav.map((n, i) => (
          <a key={n.id} href={`#${n.id}`} style={{ '--i': i }}>
            {n.label}
          </a>
        ))}
        <a href="#contact" style={{ '--i': nav.length }}>Connect</a>
      </div>
    </header>
  )
}
