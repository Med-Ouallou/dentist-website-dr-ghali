import Image from 'next/image';
import { useLanguage } from '../context/LanguageContext';

export default function About() {
  const { t: content } = useLanguage();
  const { eyebrow, title, subtitle, image, paragraphs, cards } = content.about;

  return (
    <section id="about" className="section" data-od-id="about">
      <div className="container grid-2" style={{ alignItems: 'center', gap: '80px' }}>
        <div className="reveal" style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', aspectRatio: '3/4', position: 'relative', width: '100%', minHeight: '480px' }}>
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
            style={{ objectFit: 'cover' }}
          />
        </div>
        <div className="stack reveal">
          <span className="eyebrow">{eyebrow}</span>
          <h2 className="h2">{title}</h2>
          <p style={{ fontWeight: 700, color: 'var(--accent)', fontSize: '18px', marginTop: '-12px' }}>{subtitle}</p>
          <div className="stack" style={{ gap: '20px', marginTop: '24px' }}>
            {paragraphs.map((p, index) => (
              <p key={index}>{p}</p>
            ))}
          </div>
          <div className="grid-2" style={{ marginTop: '32px', gap: '20px' }}>
            {cards.map((card, index) => (
              <div key={index} className="card" style={{ padding: '20px', textAlign: 'center' }}>
                <h4 style={{ fontWeight: 700, marginBottom: '8px' }}>{card.title}</h4>
                <p style={{ fontSize: '13px', color: 'var(--muted)' }}>{card.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
