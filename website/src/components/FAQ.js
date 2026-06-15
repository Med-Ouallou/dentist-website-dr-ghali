'use client';

import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function FAQ() {
  const { t: content } = useLanguage();
  const { eyebrow, title, list } = content.faq;
  const [activeId, setActiveId] = useState(null);

  const toggleAccordion = (id) => {
    setActiveId(activeId === id ? null : id);
  };

  return (
    <section id="faq" className="section" data-od-id="faq" style={{ background: 'white' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        <div className="reveal" style={{ textAlign: 'center', marginBottom: '48px' }}>
          <span className="eyebrow">{eyebrow}</span>
          <h2 className="h2">{title}</h2>
        </div>
        <div className="stack">
          {list.map((item) => (
            <div 
              key={item.id} 
              className={`accordion-item ${activeId === item.id ? 'active' : ''}`}
            >
              <button 
                className="accordion-trigger" 
                onClick={() => toggleAccordion(item.id)}
                aria-expanded={activeId === item.id}
                style={{ textAlign: 'start' }}
              >
                <span>{item.question}</span> 
                <motion.span
                  animate={{ rotate: activeId === item.id ? 180 : 0 }}
                  transition={{ duration: 0.25, ease: 'easeInOut' }}
                  style={{ display: 'inline-block', fontSize: '20px', fontWeight: 600 }}
                >
                  {activeId === item.id ? '−' : '+'}
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {activeId === item.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    style={{ overflow: 'hidden' }}
                  >
                    <p style={{ paddingBottom: '24px', color: 'var(--muted)', fontSize: '15px', lineHeight: '1.6', margin: 0 }}>
                      {item.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
