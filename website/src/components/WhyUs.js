import Image from 'next/image';
import { useLanguage } from '../context/LanguageContext';

export default function WhyUs() {
  const { t: content } = useLanguage();
  const { eyebrow, title, lead, image, items } = content.whyUs;

  return (
    <section className="section" data-od-id="why-us">
      <div className="container grid-2" style={{ alignItems: 'center', gap: '80px' }}>
        <div className="stack reveal" style={{ gap: '40px' }}>
          <div className="stack" style={{ gap: '16px' }}>
            <span className="eyebrow">{eyebrow}</span>
            <h2 className="h2">{title}</h2>
            <p className="lead">{lead}</p>
          </div>
          <div className="stack" style={{ gap: '24px' }}>
            {items.map((item, index) => (
              <div key={index} className="row" style={{ alignItems: 'flex-start', gap: '20px' }}>
                <div style={{ color: 'var(--accent)', marginTop: '4px' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
                <div>
                  <h4 style={{ fontWeight: 700, marginBottom: '4px' }}>{item.title}</h4>
                  <p style={{ fontSize: '14px', color: 'var(--muted)' }}>{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="reveal" style={{ position: 'relative', width: '100%', aspectRatio: '4/3', borderRadius: '40px 120px 40px 40px', overflow: 'hidden' }}>
          <Image
            src={image}
            alt="Équipement High-Tech de la Clinique"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            style={{ objectFit: 'cover' }}
          />
        </div>
      </div>
    </section>
  );
}
