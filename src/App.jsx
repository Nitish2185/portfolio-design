import Loader from './components/Loader'
import Sky from './components/Sky'
import Nav from './components/Nav'
import Hero from './components/Hero'
import { Statement, About, Stats } from './components/About'
import Experience from './components/Experience'
import Projects from './components/Projects'
import LeetCode from './components/LeetCode'
import Certifications from './components/Certifications'
import Connect from './components/Connect'
import Contact from './components/Contact'
import Faq from './components/Faq'
import Footer from './components/Footer'
import StickyCta from './components/StickyCta'

export default function App() {
  return (
    <>
      <Loader />
      <Sky />
      <Nav />
      <main>
        <Hero />
        <Statement />
        <About />
        <Stats />
        <Experience />
        <Projects />
        <LeetCode />
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
