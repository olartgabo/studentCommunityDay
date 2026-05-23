import { Nav } from './components/Nav';
import { Hero } from './components/Hero';
import { Marquee } from './components/Marquee';
import { Manifesto } from './components/Manifesto';
import { Tracks } from './components/Tracks';
import { Schedule } from './components/Schedule';
import { Speakers } from './components/Speakers';
import { Sponsors } from './components/Sponsors';
import { Venue } from './components/Venue';
import { FAQ } from './components/FAQ';
import { Register } from './components/Register';
import { Footer } from './components/Footer';
import { ScrollProgress, CursorGlow } from './components/ScrollProgress';
import { useSmoothScroll, useScrollSkew } from './lib/smoothScroll';

export default function App() {
  useSmoothScroll();
  useScrollSkew();

  return (
    <>
      <ScrollProgress />
      <CursorGlow />
      <Nav />
      <main className="relative">
        <Hero />
        <Marquee />
        <Manifesto />
        <Tracks />
        <Schedule />
        <Speakers />
        <Sponsors />
        <Venue />
        <FAQ />
        <Register />
      </main>
      <Footer />
    </>
  );
}
