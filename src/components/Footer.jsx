import { nav, profile } from '../data'
import Icon from './Icons'
import '../styles/footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <a href="#top" className="nav__logo">
            <span className="nav__logo-mark">/</span>
            {profile.handle}
            <span className="nav__logo-dot">.dev</span>
          </a>
          <nav className="footer__links">
            {nav.map((n) => (
              <a key={n.id} href={`#${n.id}`}>{n.label}</a>
            ))}
            <a href="#contact">Connect</a>
          </nav>
          <div className="footer__socials">
            {profile.socials.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label}>
                <Icon name={s.icon} size={18} />
              </a>
            ))}
          </div>
        </div>
        <p className="footer__word" aria-hidden="true">
          {profile.name.toLowerCase()}
          <span>/</span>
        </p>
        <div className="footer__bottom">
          <span>© {new Date().getFullYear()} {profile.fullName}. All rights reserved.</span>
          <a href={profile.resume} download>
            Resume <Icon name="download" size={14} />
          </a>
        </div>
      </div>
    </footer>
  )
}
