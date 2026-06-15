'use client';

import { useState } from 'react';
import Image from 'next/image';
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

  return (
    <section id="results" className="section" data-od-id="results" style={{ background: 'white' }}>
      <div className="container">
        <div className="reveal" style={{ textAlign: 'center', marginBottom: '64px' }}>
          <span className="eyebrow">{eyebrow}</span>
          <h2 className="h2">{title}</h2>
          <p className="lead" style={{ marginInline: 'auto', marginTop: '16px' }}>{lead}</p>
        </div>
        
        <div className="grid-3" style={{ gap: '32px' }}>
          {list.map((item, index) => (
            <div key={index} className="card reveal" style={{ padding: 0, overflow: 'hidden', border: 'none' }}>
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
