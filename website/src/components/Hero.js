import { motion } from 'framer-motion';
import Image from 'next/image';
import { useLanguage } from '../context/LanguageContext';

export default function Hero() {
  const { t: content, lang } = useLanguage();
  
  // Animation variants for staggered load
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section 
      id="home" 
      style={{ 
        position: 'relative', 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        overflow: 'hidden', 
        background: '#0F1717', 
        paddingTop: '120px',
        paddingBottom: '60px'
      }}
    >
      {/* Full-width Background dentist image */}
      <motion.div 
        className="hero-image-wrapper" 
        initial={{ opacity: 0, scale: 1.15 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        style={{ 
          position: 'absolute', 
          inset: 0,
          width: '100%', 
          height: '100%', 
          zIndex: 1 
        }}
      >
        <div 
          style={{
            width: '100%',
            height: '100%',
            position: 'relative'
          }}
        >
          <Image 
            src={content.hero.image} 
            alt={content.meta.logoName} 
            fill
            priority
            style={{ 
              objectFit: 'cover', 
              objectPosition: 'center' 
            }} 
          />
          {/* Subtle gradient overlay to darken image and ensure high readability of white text */}
          <div 
            className="hero-image-overlay"
            style={{
              position: 'absolute',
              inset: 0,
              background: `linear-gradient(${lang === 'ar' ? 'to left' : 'to right'}, rgba(15, 23, 23, 0.85) 0%, rgba(15, 23, 23, 0.45) 50%, rgba(15, 23, 23, 0.3) 100%), linear-gradient(to top, rgba(15, 23, 23, 0.8) 0%, transparent 4%)`,
              pointerEvents: 'none'
            }}
          />
        </div>
      </motion.div>

      <div className="container hero-container" style={{ position: 'relative', zIndex: 2 }}>
        <motion.div 
          className="hero-content hero-stagger"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ maxWidth: '600px', display: 'flex', flexDirection: 'column', gap: '32px' }}
        >
          <div>
            <motion.span 
              className="eyebrow" 
              variants={itemVariants}
              style={{ 
                fontFamily: 'var(--font-body)', 
                fontSize: '13px', 
                fontWeight: 600, 
                color: 'rgba(255, 255, 255, 0.6)', 
                letterSpacing: '0.08em', 
                display: 'block', 
                marginBottom: '16px' 
              }}
            >
              {content.hero.eyebrow}
            </motion.span>
            <motion.h1 
              className="h1" 
              variants={itemVariants}
              style={{ 
                fontSize: 'clamp(36px, 5vw, 64px)', 
                fontWeight: '800', 
                lineHeight: '1.1', 
                color: '#FFFFFF',
                letterSpacing: '-0.02em'
              }}
            >
              {content.hero.title1}<span style={{ color: 'var(--accent)' }}>{content.hero.titleAccent}</span>{content.hero.title2}
            </motion.h1>
            <motion.p 
              className="lead" 
              variants={itemVariants}
              style={{ 
                marginTop: '24px', 
                fontSize: '18px', 
                color: 'rgba(255, 255, 255, 0.8)', 
                lineHeight: '1.65',
                fontFamily: 'var(--font-body)'
              }}
            >
              {content.hero.subtitle}
            </motion.p>
          </div>
          
          <motion.div 
            className="row" 
            variants={itemVariants}
            style={{ gap: '16px', flexWrap: 'wrap' }}
          >
            <a 
              href="#services" 
              className="btn btn-primary"
              style={{
                background: 'var(--accent)',
                color: '#FFFFFF',
                borderRadius: '50px',
                padding: '12px 28px',
                fontWeight: 600,
                boxShadow: '0 8px 24px rgba(0, 181, 176, 0.25)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              {content.hero.ctaText}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </a>
            
            <a 
              href={`tel:${content.meta.phone.replace(/\s+/g, '')}`} 
              className="btn-hero-phone"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ display: 'inline' }}>
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l2.19-2.19a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              <span className="force-ltr">{content.hero.phone}</span>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
