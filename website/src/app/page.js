'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import { LanguageProvider } from '../context/LanguageContext';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Stats from '../components/Stats';
import About from '../components/About';
import Services from '../components/Services';
import WhyUs from '../components/WhyUs';
import Gallery from '../components/Gallery';
import ResultsSlider from '../components/ResultsSlider';
import Testimonials from '../components/Testimonials';
import FAQ from '../components/FAQ';
import AppointmentForm from '../components/AppointmentForm';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import WhatsAppFloat from '../components/WhatsAppFloat';
import BackToTop from '../components/BackToTop';

export default function Home() {
  useEffect(() => {
    // Initialize Lenis Smooth Scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Scroll reveal observer
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.15
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); // Reveal only once
        }
      });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach((el) => observer.observe(el));

    // Connect Lenis to Next.js routing / hash scroll clicks
    const handleAnchorClick = (e) => {
      const target = e.target.closest('a[href^="#"]');
      if (target) {
        e.preventDefault();
        const hash = target.getAttribute('href');
        const element = document.querySelector(hash);
        if (element) {
          lenis.scrollTo(element, { offset: -80 });
        }
      }
    };
    document.addEventListener('click', handleAnchorClick);

    return () => {
      lenis.destroy();
      document.removeEventListener('click', handleAnchorClick);
      revealElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <LanguageProvider>
      <Navbar />
      <main id="content">
        <Hero />
        <Stats />
        <About />
        <Services />
        <WhyUs />
        <Gallery />
        <ResultsSlider />
        <Testimonials />
        <FAQ />
        <AppointmentForm />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFloat />
      <BackToTop />
    </LanguageProvider>
  );
}
