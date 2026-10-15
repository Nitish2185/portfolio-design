import { useEffect, useState } from 'react'
import { profile } from '../data'
import Icon from './Icons'
import '../styles/footer.css'

// Floating glass pill (reference: sticky "Try Now"), shown once the hero is passed
export default function StickyCta() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const f = () => {
      const contact = document.getElementById('contact')
      const nearContact = contact && contact.getBoundingClientRect().top < innerHeight * 0.8
      // wait until the pinned hero (and its stage tabs) has scrolled away
      const pin = document.querySelector('.hero-pin')
      const pastHero = pin ? pin.getBoundingClientRect().bottom < innerHeight * 0.5 : scrollY > innerHeight * 0.9
      setShow(pastHero && !nearContact)
    }
    f()
    addEventListener('scroll', f, { passive: true })
    return () => removeEventListener('scroll', f)
  }, [])
  return (
    <div className={`sticky-cta ${show ? 'is-in' : ''}`} aria-hidden={!show}>
      <div className="sticky-cta__glass">
        <span className="sticky-cta__txt">
          <span className="dot-live" /> {profile.name} is open to work
        </span>
        <a href={profile.resume} download className="btn btn--blue btn--sm" tabIndex={show ? 0 : -1}>
          Resume <Icon name="download" size={16} />
        </a>
      </div>
    </div>
  )
}
