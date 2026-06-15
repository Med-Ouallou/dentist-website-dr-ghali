import { useLanguage } from '../context/LanguageContext';

export default function Testimonials() {
  const { t: content } = useLanguage();
  const { eyebrow, title, list } = content.testimonials;

  return (
    <section id="testimonials" className="section" data-od-id="testimonials">
      <div className="container">
        <div className="reveal" style={{ textAlign: 'center', marginBottom: '56px' }}>
          <span className="eyebrow">{eyebrow}</span>
          <h2 className="h2">{title}</h2>
        </div>
        <div className="grid-3">
          {list.map((item, index) => (
            <div key={index} className="card stack reveal">
              <div className="row" style={{ color: '#FFD700', gap: '4px' }}>
                {Array.from({ length: item.stars }).map((_, i) => (
                  <span key={i}>★</span>
                ))}
              </div>
              <p style={{ fontStyle: 'italic', color: 'var(--muted)', fontSize: '14px' }}>
                "{item.quote}"
              </p>
              <h4 style={{ fontWeight: 700, fontSize: '14px' }}>— {item.author}</h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
