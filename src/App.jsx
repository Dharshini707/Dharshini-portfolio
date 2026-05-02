import { lazy, Suspense } from 'react';
import ParticleBackground from './components/ParticleBackground';
import AnimatedCursor from './components/AnimatedCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Footer from './components/Footer';

const About = lazy(() => import('./components/About'));
const Skills = lazy(() => import('./components/Skills'));
const Projects = lazy(() => import('./components/Projects'));
const Timeline = lazy(() => import('./components/Timeline'));
const Contact = lazy(() => import('./components/Contact'));

const Loader = () => (
  <div className="flex justify-center py-24">
    <div className="w-8 h-8 border-2 border-[#00D4FF] border-t-transparent rounded-full animate-spin" aria-label="Loading section" />
  </div>
);

export default function App() {
  return (
    <>
      <AnimatedCursor />
      <ParticleBackground />
      <Navbar />
      <main role="main">
        <Hero />
        <Suspense fallback={<Loader />}><About /></Suspense>
        <Suspense fallback={<Loader />}><Skills /></Suspense>
        <Suspense fallback={<Loader />}><Projects /></Suspense>
        <Suspense fallback={<Loader />}><Timeline /></Suspense>
        <Suspense fallback={<Loader />}><Contact /></Suspense>
      </main>
      <Footer />
    </>
  );
}
