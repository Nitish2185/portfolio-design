import Nav from './components/Nav'
import Hero from './components/Hero'
import Showcase from './components/Showcase'
import { Statement, About, Stats } from './components/About'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Certifications from './components/Certifications'
import Connect from './components/Connect'
import Contact from './components/Contact'
import Faq from './components/Faq'
import Footer from './components/Footer'
import StickyCta from './components/StickyCta'

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Showcase />
        <Statement />
        <About />
        <Stats />
        <Experience />
        <Projects />
        <Certifications />
        <Connect />
        <Contact />
        <Faq />
      </main>
      <Footer />
      <StickyCta />
    </>
  )
}
