import Loader from './components/Loader'
import Sky from './components/Sky'
import Nav from './components/Nav'
import Hero from './components/Hero'
import { Statement, About, Stats } from './components/About'

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
      </main>
    </>
  )
}
