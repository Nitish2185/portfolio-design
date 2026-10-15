import { profile } from '../data'
import Reveal from '../lib/Reveal'
import Icon from './Icons'
import '../styles/connect.css'

// Closing CTA over morphing blobs (the reference "deep / light" blob banner)
export default function Connect() {
  return (
    <section className="connect">
      <div className="blobs" aria-hidden="true">
        <i className="blob b1" />
        <i className="blob b2" />
        <i className="blob b3" />
        <i className="blob b4" />
        <i className="blob b5" />
      </div>
      <div className="container connect__inner">
        <Reveal as="h2" className="connect__title">
          Ready to build something <em>together?</em>
        </Reveal>
        <Reveal className="connect__ctas" delay={0.15}>
          <a className="btn btn--white" href="#contact">
            <Icon name="mail" size={18} /> Get in touch
          </a>
          <a className="btn btn--outline-white" href={profile.resume} download>
            Download Resume <Icon name="download" size={18} />
          </a>
        </Reveal>
      </div>
    </section>
  )
}
