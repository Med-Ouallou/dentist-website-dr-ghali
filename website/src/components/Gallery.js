import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

export default function Gallery() {
  const { t: content } = useLanguage();
  const { eyebrow, title, items } = content.gallery;
  const [selectedImage, setSelectedImage] = useState(null);

  // Close lightbox on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setSelectedImage(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section id="gallery" className="section" data-od-id="gallery" style={{ background: 'white' }}>
      <div className="container">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ textAlign: 'center', marginBottom: '48px' }}
        >
          <span className="eyebrow">{eyebrow}</span>
          <h2 className="h2">{title}</h2>
        </motion.div>

        <motion.div 
          className="gallery-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {items.map((item, index) => (
            <motion.div 
              key={index} 
              className="gallery-item" 
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              onClick={() => setSelectedImage(item)}
              style={{ 
                gridColumn: item.span > 1 ? `span ${item.span}` : 'span 1', 
                height: '100%',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <Image
                src={item.src}
                alt={item.alt}
                width={item.span > 1 ? (item.span === 3 ? 1200 : 800) : 400}
                height={500}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div 
                className="gallery-overlay"
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'rgba(0, 181, 176, 0.15)',
                  opacity: 0,
                  transition: 'opacity 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                onMouseEnter={(e) => e.currentTarget.style.opacity = 1}
                onMouseLeave={(e) => e.currentTarget.style.opacity = 0}
              >
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  background: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.1)'
                }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2.5">
                    <circle cx="11" cy="11" r="8"/>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                    <line x1="11" y1="8" x2="11" y2="14"/>
                    <line x1="8" y1="11" x2="14" y2="11"/>
                  </svg>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(15, 23, 23, 0.9)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              zIndex: 2000,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '24px',
              cursor: 'zoom-out'
            }}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedImage(null)}
              style={{
                position: 'absolute',
                top: '24px',
                right: '24px',
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: 'white',
                fontSize: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'white';
                e.currentTarget.style.color = '#101717';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.color = 'white';
              }}
            >
              ✕
            </button>

            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking the image card itself
              style={{
                position: 'relative',
                maxWidth: '90vw',
                maxHeight: '80vh',
                borderRadius: '24px',
                overflow: 'hidden',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                cursor: 'default'
              }}
            >
              <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                style={{
                  maxWidth: '100%',
                  maxHeight: '80vh',
                  display: 'block',
                  objectFit: 'contain'
                }}
              />
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%)',
                padding: '24px',
                color: 'white'
              }}>
                <p style={{ fontWeight: 600, fontSize: '16px', margin: 0 }}>{selectedImage.alt}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
