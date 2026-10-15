import Loader from './components/Loader'
import Sky from './components/Sky'
import Nav from './components/Nav'
import Hero from './components/Hero'
import { Statement, About, Stats } from './components/About'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Certifications from './components/Certifications'
import Connect from './components/Connect'
import Contact from './components/Contact'

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
        <Certifications />
        <Connect />
        <Contact />
      </main>
    </>
  )
}
