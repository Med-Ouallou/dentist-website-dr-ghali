'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useLanguage } from '../context/LanguageContext';

export default function Navbar() {
  const { lang, setLang, t } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('#home');
  const [scrolled, setScrolled] = useState(false);

  const navLinks = t.navbar.links;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`topnav ${scrolled ? 'scrolled' : ''}`}
      data-od-id="topnav"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        background: scrolled ? 'rgba(255, 255, 255, 0.85)' : 'rgba(255, 255, 255, 0)',
        backdropFilter: scrolled ? 'blur(20px)' : 'blur(0px)',
        WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'blur(0px)',
        borderBottom: scrolled ? '1px solid rgba(0, 0, 0, 0.06)' : '1px solid rgba(0, 0, 0, 0)',
        boxShadow: scrolled ? '0 10px 30px rgba(0,0,0,0.05)' : '0 10px 30px rgba(0,0,0,0)',
        transition: 'background 0.5s cubic-bezier(0.16, 1, 0.3, 1), backdrop-filter 0.5s cubic-bezier(0.16, 1, 0.3, 1), Webkit-backdrop-filter 0.5s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
      }}
    >
      <div 
        className="topnav-inner" 
        style={{ 
          paddingInline: 'clamp(16px, 4vw, 48px)', 
          width: '100%', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          paddingBlock: '16px' 
        }}
      >
        {/* Left Side: Logo */}
        <a 
          href="#home" 
          className="logo" 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '12px',
            color: scrolled ? '#101717' : '#FFFFFF',
            transition: 'color 0.3s ease, opacity 0.2s ease'
          }}
        >
          <div 
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              overflow: 'hidden',
              position: 'relative',
              background: 'transparent'
            }}
          >
            <Image
              src="/dr.ghali-logo.png"
              alt="Logo Dr. Ghali"
              fill
              sizes="48px"
              style={{ objectFit: 'cover' }}
            />
          </div>
          <span style={{ fontWeight: 700, fontSize: '18px', letterSpacing: '-0.01em' }}>{t.meta.logoName}</span>
        </a>

        {/* Center: Glassmorphic Nav Pill (Desktop only) */}
        <nav 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            background: scrolled ? 'rgba(0, 0, 0, 0.05)' : 'rgba(255, 255, 255, 0.08)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: scrolled ? '1px solid rgba(0, 0, 0, 0.08)' : '1px solid rgba(255, 255, 255, 0.15)',
            borderRadius: '50px',
            padding: '4px',
            gap: '2px',
            boxShadow: scrolled ? 'none' : '0 4px 30px rgba(0, 0, 0, 0.05)',
            transition: 'all 0.3s ease'
          }}
          className="desktop-nav-pill"
        >
          {navLinks.map((link) => {
            const isActive = activeSection === link.href;
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setActiveSection(link.href)}
                className={`nav-item-link ${isActive ? 'active' : ''}`}
                style={{
                  position: 'relative',
                  padding: '8px 20px',
                  borderRadius: '50px',
                  fontSize: '14px',
                  fontWeight: 600,
                  color: isActive 
                    ? '#FFFFFF' 
                    : (scrolled ? '#4A5555' : 'rgba(255, 255, 255, 0.85)'),
                  zIndex: 2,
                  transition: 'color 0.25s ease',
                  display: 'inline-block'
                }}
              >
                {isActive && (
                  <motion.div
                    layoutId="activePill"
                    style={{
                      position: 'absolute',
                      inset: 0,
                      backgroundColor: 'var(--accent)',
                      borderRadius: '50px',
                      zIndex: -1
                    }}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Right Side: Lang Toggle & Call / Appointment CTA */}
        <div className="row" style={{ gap: '16px' }}>
          <div 
            className="lang-toggle desktop-lang-toggle" 
            onClick={() => setLang(lang === 'fr' ? 'ar' : 'fr')} 
            style={{ 
              position: 'relative',
              background: scrolled ? 'rgba(0, 0, 0, 0.05)' : 'rgba(255, 255, 255, 0.08)',
              border: scrolled ? '1px solid rgba(0, 0, 0, 0.08)' : '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '50px',
              height: '42px',
              width: '90px',
              display: 'flex',
              padding: '2px',
              cursor: 'pointer',
              userSelect: 'none',
              transition: 'all 0.3s ease',
              direction: 'ltr'
            }}
          >
            <motion.div
              animate={{
                x: lang === 'fr' ? 0 : 42
              }}
              transition={{ type: 'spring', stiffness: 200, damping: 24 }}
              style={{
                position: 'absolute',
                top: '2px',
                left: '2px',
                width: '42px',
                height: '36px',
                background: scrolled ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.2)',
                border: scrolled ? '1px solid rgba(0, 0, 0, 0.08)' : '1px solid rgba(255, 255, 255, 0.3)',
                borderRadius: '50px',
                zIndex: 0
              }}
            />
            <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', height: '100%', width: '100%', zIndex: 1 }}>
              <img src="https://flagcdn.com/w40/fr.png" alt="French Flag" style={{ width: '20px', borderRadius: '2px', height: 'auto' }} />
            </span>
            <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', height: '100%', width: '100%', zIndex: 1 }}>
              <img src="https://flagcdn.com/w40/ma.png" alt="Moroccan Flag" style={{ width: '20px', borderRadius: '2px', height: 'auto' }} />
            </span>
          </div>
          
          <a 
            href="#appointment" 
            className="btn btn-primary appointment-desktop-btn"
            style={{
              background: 'var(--accent)',
              color: '#FFFFFF',
              borderRadius: '50px',
              boxShadow: '0 4px 14px rgba(0, 181, 176, 0.25)',
              padding: '10px 24px',
              display: 'inline-flex',
              alignItems: 'center',
              fontWeight: 600,
              gap: '8px',
              transition: 'all 0.3s ease'
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ display: 'inline' }}>
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l2.19-2.19a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
            </svg>
            {t.navbar.ctaText}
          </a>
          
          <button 
            className="mobile-nav-toggle" 
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle Menu"
            style={{ 
              color: scrolled ? '#101717' : '#FFFFFF',
              transition: 'color 0.3s ease'
            }}
          >
            {mobileOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      <div 
        className={`mobile-menu ${mobileOpen ? 'open' : ''}`}
        style={{
          background: scrolled ? 'rgba(255, 255, 255, 0.98)' : 'rgba(15, 23, 23, 0.98)',
          backdropFilter: 'blur(20px)',
          borderBottom: scrolled ? '1px solid rgba(0, 0, 0, 0.06)' : '1px solid rgba(255, 255, 255, 0.08)',
          transition: 'all 0.3s ease',
          padding: '28px 24px',
          display: mobileOpen ? 'flex' : 'none',
          flexDirection: 'column',
          gap: '24px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={activeSection === link.href ? 'active' : ''}
              onClick={() => {
                setActiveSection(link.href);
                setMobileOpen(false);
              }}
              style={{
                color: activeSection === link.href 
                  ? 'var(--accent)' 
                  : (scrolled ? '#101717' : 'rgba(255, 255, 255, 0.85)'),
                fontWeight: 600,
                fontSize: '16px',
                transition: 'color 0.3s ease',
                paddingBlock: '4px'
              }}
            >
              {link.label}
            </a>
          ))}
        </div>

        <hr style={{ border: 0, borderTop: scrolled ? '1px solid rgba(0, 0, 0, 0.08)' : '1px solid rgba(255, 255, 255, 0.1)', margin: 0 }} />

        {/* Language Switcher inside Mobile Menu */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '14px', fontWeight: 600, color: scrolled ? 'var(--muted)' : 'rgba(255, 255, 255, 0.6)' }}>
            {lang === 'fr' ? 'Langue' : 'اللغة'}
          </span>
          <div 
            className="lang-toggle" 
            onClick={() => setLang(lang === 'fr' ? 'ar' : 'fr')} 
            style={{ 
              position: 'relative',
              background: scrolled ? 'rgba(0, 0, 0, 0.05)' : 'rgba(255, 255, 255, 0.08)',
              border: scrolled ? '1px solid rgba(0, 0, 0, 0.08)' : '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '50px',
              height: '38px',
              width: '80px',
              display: 'flex',
              padding: '2px',
              cursor: 'pointer',
              userSelect: 'none',
              transition: 'all 0.3s ease',
              direction: 'ltr'
            }}
          >
            <motion.div
              animate={{
                x: lang === 'fr' ? 0 : 38
              }}
              transition={{ type: 'spring', stiffness: 200, damping: 24 }}
              style={{
                position: 'absolute',
                top: '2px',
                left: '2px',
                width: '38px',
                height: '32px',
                background: scrolled ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.2)',
                border: scrolled ? '1px solid rgba(0, 0, 0, 0.08)' : '1px solid rgba(255, 255, 255, 0.3)',
                borderRadius: '50px',
                zIndex: 0
              }}
            />
            <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', height: '100%', width: '100%', zIndex: 1 }}>
              <img src="https://flagcdn.com/w40/fr.png" alt="French Flag" style={{ width: '18px', borderRadius: '2px', height: 'auto' }} />
            </span>
            <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', height: '100%', width: '100%', zIndex: 1 }}>
              <img src="https://flagcdn.com/w40/ma.png" alt="Moroccan Flag" style={{ width: '18px', borderRadius: '2px', height: 'auto' }} />
            </span>
          </div>
        </div>

        <a 
          href="#appointment" 
          className="btn btn-primary" 
          style={{ 
            justifyContent: 'center',
            background: 'var(--accent)',
            color: '#FFFFFF',
            borderRadius: '50px',
            boxShadow: '0 4px 14px rgba(0, 181, 176, 0.25)',
            transition: 'all 0.3s ease',
            paddingBlock: '12px'
          }} 
          onClick={() => setMobileOpen(false)}
        >
          {t.navbar.ctaText}
        </a>
      </div>
    </header>
  );
}
