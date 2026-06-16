'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

export default function ResultsSlider() {
  const { t: content } = useLanguage();
  const { eyebrow, title, lead, list } = content.results;
  
  // Dynamic initialization of slider values based on list size
  const [sliderVals, setSliderVals] = useState(list.map(() => 50));

  const updateSliderVal = (index, value) => {
    const nextVals = [...sliderVals];
    nextVals[index] = value;
    setSliderVals(nextVals);
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15
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
    <section id="results" className="section" data-od-id="results" style={{ background: 'white' }}>
      <div className="container">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ textAlign: 'center', marginBottom: '64px' }}
        >
          <span className="eyebrow">{eyebrow}</span>
          <h2 className="h2">{title}</h2>
          <p className="lead" style={{ marginInline: 'auto', marginTop: '16px' }}>{lead}</p>
        </motion.div>
        
        <motion.div 
          className="grid-3" 
          style={{ gap: '32px' }}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {list.map((item, index) => (
            <motion.div 
              key={index} 
              className="card" 
              variants={itemVariants}
              whileHover={{ y: -6 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              style={{ padding: 0, overflow: 'hidden', border: 'none' }}
            >
              <div className="comparison-slider" style={{ borderRadius: 'var(--radius-lg)' }}>
                <div className="image-after">
                  <Image 
                    src={item.after} 
                    alt={`${item.label} Après`} 
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="image-before" style={{ width: `${sliderVals[index] ?? 50}%` }}>
                  <Image 
                    src={item.before} 
                    alt={`${item.label} Avant`} 
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value={sliderVals[index] ?? 50} 
                  className="slider" 
                  onChange={(e) => updateSliderVal(index, Number(e.target.value))}
                />
                <div className="label label-before">Avant</div>
                <div className="label label-after">Après</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
