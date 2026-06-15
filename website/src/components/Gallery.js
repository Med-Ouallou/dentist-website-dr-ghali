import Image from 'next/image';
import { useLanguage } from '../context/LanguageContext';

export default function Gallery() {
  const { t: content } = useLanguage();
  const { eyebrow, title, items } = content.gallery;

  return (
    <section id="gallery" className="section" data-od-id="gallery" style={{ background: 'white' }}>
      <div className="container">
        <div className="reveal" style={{ textAlign: 'center', marginBottom: '48px' }}>
          <span className="eyebrow">{eyebrow}</span>
          <h2 className="h2">{title}</h2>
        </div>
        <div className="gallery-grid">
          {items.map((item, index) => (
            <div 
              key={index} 
              className="gallery-item reveal" 
              style={{ 
                gridColumn: item.span > 1 ? `span ${item.span}` : 'span 1', 
                height: '100%' 
              }}
            >
              <Image
                src={item.src}
                alt={item.alt}
                width={item.span > 1 ? (item.span === 3 ? 1200 : 800) : 400}
                height={500}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
