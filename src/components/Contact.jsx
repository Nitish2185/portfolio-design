import { useRef, useState } from 'react'
import { profile } from '../data'
import Reveal from '../lib/Reveal'
import { dust } from '../lib/motion'
import Icon from './Icons'
import '../styles/contact.css'

const API = import.meta.env.VITE_API_URL || ''
const EMPTY = { name: '', email: '', subject: '', message: '', company: '' }

export default function Contact() {
  const [form, setForm] = useState(EMPTY)
  const [status, setStatus] = useState({ state: 'idle', msg: '' }) // idle | sending | sent | error
  const [copied, setCopied] = useState(false)
  const btn = useRef(null)
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const submit = async (e) => {
    e.preventDefault()
    if (status.state === 'sending') return
    setStatus({ state: 'sending', msg: '' })
    try {
      const res = await fetch(`${API}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok || !data.ok) throw new Error(data.error || 'Something went wrong.')
      await dust(btn.current, () => setStatus({ state: 'sent', msg: 'Message sent — I’ll get back to you soon!' }))
      setForm(EMPTY)
    } catch (err) {
      setStatus({ state: 'error', msg: err.message === 'Failed to fetch' ? 'Could not reach the server.' : err.message })
    }
  }

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch {
      /* clipboard blocked — ignore */
    }
  }

  return (
    <section className="contact section" id="contact">
      <div className="container contact__grid">
        <div className="contact__info">
          <Reveal as="p" className="eyebrow">Connect</Reveal>
          <Reveal as="h2" className="h2" delay={0.08}>Let’s talk.</Reveal>
          <Reveal as="p" className="lead" delay={0.16}>
            Have a role, a project, or just want to say hi? Lorem ipsum dolor sit amet — my inbox is always open.
          </Reveal>
          <Reveal className="contact__mail" delay={0.24}>
            <a href={`mailto:${profile.email}`}><Icon name="mail" size={18} /> {profile.email}</a>
            <button type="button" onClick={copy} className="contact__copy" aria-label="Copy email">
              <Icon name={copied ? 'check' : 'copy'} size={16} /> {copied ? 'Copied' : 'Copy'}
            </button>
          </Reveal>
          <Reveal className="contact__socials" delay={0.32}>
            {profile.socials.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label}>
                <Icon name={s.icon} size={20} />
              </a>
            ))}
          </Reveal>
        </div>

        <Reveal as="form" className="contact__form" delay={0.15} onSubmit={submit}>
          <div className="field-row">
            <label className="field">
              <span>Name</span>
              <input required minLength={2} maxLength={100} value={form.name} onChange={set('name')} placeholder="Lorem Ipsum" />
            </label>
            <label className="field">
              <span>Email</span>
              <input required type="email" value={form.email} onChange={set('email')} placeholder="you@lorem.com" />
            </label>
          </div>
          <label className="field">
            <span>Subject</span>
            <input maxLength={150} value={form.subject} onChange={set('subject')} placeholder="Let’s work together" />
          </label>
          <label className="field">
            <span>Message</span>
            <textarea required minLength={10} maxLength={5000} rows={5} value={form.message} onChange={set('message')} placeholder="Tell me a little about it…" />
          </label>
          {/* honeypot — hidden from humans, bots fill it */}
          <input className="hp" tabIndex={-1} autoComplete="off" value={form.company} onChange={set('company')} aria-hidden="true" />
          <div className="contact__foot">
            <button ref={btn} className="btn btn--blue" disabled={status.state === 'sending'}>
              {status.state === 'sending' ? 'Sending…' : status.state === 'sent' ? <>Sent <Icon name="check" size={18} /></> : <>Send message <Icon name="send" size={18} /></>}
            </button>
            <p className={`contact__status is-${status.state}`} role="status">{status.msg}</p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
