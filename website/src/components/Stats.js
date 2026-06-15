import { useLanguage } from '../context/LanguageContext';

export default function Stats() {
  const { t: content } = useLanguage();
  return (
    <section className="section reveal" data-od-id="stats" style={{ paddingBlock: '40px', borderTop: '1px solid var(--border-rich)', borderBottom: '1px solid var(--border-rich)', background: 'white' }}>
      <div className="container grid-4">
        {content.stats.items.map((item, index) => (
          <div key={index} className="stack" style={{ alignItems: 'center', textAlign: 'center', gap: '4px' }}>
            <div className="stat-num" style={item.isSpecial ? { fontSize: '40px', paddingTop: '12px' } : {}}>
              {item.value}
              {item.suffix && <span style={{ fontSize: '0.6em', opacity: 0.5 }}>{item.suffix}</span>}
            </div>
            <p className="meta" style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--muted)' }}>{item.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
