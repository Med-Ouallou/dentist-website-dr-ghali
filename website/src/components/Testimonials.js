import { useLanguage } from '../context/LanguageContext';
import { useEffect, useState } from 'react';

export default function Testimonials() {
  const { t: content, lang } = useLanguage();
  const { eyebrow, title, list } = content.testimonials;

  // Duplicate items twice to ensure a seamless infinite scroll loop
  const loopList = [...list, ...list, ...list];

  return (
    <section id="testimonials" className="section" data-od-id="testimonials" style={{ overflow: 'hidden' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <span className="eyebrow">{eyebrow}</span>
          <h2 className="h2">{title}</h2>
        </div>
      </div>

      {/* Infinite scrolling track wrapper */}
      <div 
        className="infinite-scroll-wrapper"
        style={{
          width: '100%',
          overflow: 'hidden',
          position: 'relative',
          paddingBlock: '10px',
          maskImage: 'linear-gradient(to right, transparent, white 15%, white 85%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, white 15%, white 85%, transparent)'
        }}
      >
        <div 
          className="infinite-scroll-track"
          style={{
            display: 'flex',
            gap: '24px',
            width: 'max-content',
            animation: lang === 'ar' ? 'scroll-rtl 40s linear infinite' : 'scroll-ltr 40s linear infinite'
          }}
          onMouseEnter={(e) => e.currentTarget.style.animationPlayState = 'paused'}
          onMouseLeave={(e) => e.currentTarget.style.animationPlayState = 'running'}
        >
          {loopList.map((item, index) => (
            <div 
              key={index} 
              className="card stack"
              style={{
                width: '350px',
                flexShrink: 0,
                padding: '24px',
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-lg)',
                boxShadow: '0 8px 30px rgba(0, 181, 176, 0.03)',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px'
              }}
            >
              <div className="row" style={{ color: '#FFD700', gap: '4px' }}>
                {Array.from({ length: item.stars }).map((_, i) => (
                  <span key={i}>★</span>
                ))}
              </div>
              <p style={{ fontStyle: 'italic', color: 'var(--muted)', fontSize: '14px', margin: 0, flexGrow: 1 }}>
                "{item.quote}"
              </p>
              <h4 style={{ fontWeight: 700, fontSize: '14px', margin: 0 }}>— {item.author}</h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
