import { useLanguage } from '../context/LanguageContext';

export default function Contact() {
  
  const { t: content } = useLanguage();
  const { eyebrow, title, lead, addressLabel, address, directLabel, emailLabel, phoneLabel, mapUrl } = content.contact;
  const { email, phone, instagram, whatsapp } = content.meta;

  return (
    <section id="contact" className="section" data-od-id="contact" style={{ background: 'white' }}>
      <div className="container grid-2 gap-large">
        <div className="stack reveal" style={{ gap: '40px' }}>
          <div>
            <span className="eyebrow">{eyebrow}</span>
            <h2 className="h2">{title}</h2>
            <p className="lead" style={{ marginTop: '16px' }}>{lead}</p>
          </div>
          <div className="stack" style={{ gap: '24px' }}>
            <div className="card" style={{ padding: '24px' }}>
              <h4 style={{ fontWeight: 700, marginBottom: '8px' }}>{addressLabel}</h4>
              <p style={{ color: 'var(--muted)', fontSize: '14px' }}>{address}</p>
            </div>
            <div className="card" style={{ padding: '24px' }}>
              <h4 style={{ fontWeight: 700, marginBottom: '16px' }}>{directLabel}</h4>
              <div className="stack" style={{ gap: '12px' }}>
                <a href={`mailto:${email}`} className="contact-link" style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--muted)', fontSize: '14px', textDecoration: 'none' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, color: 'var(--accent)' }}>
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                  <span>{email}</span>
                </a>
                
                <a href={`tel:${phone.replace(/\s+/g, '')}`} className="contact-link" style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--muted)', fontSize: '14px', textDecoration: 'none' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, color: 'var(--accent)' }}>
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l2.19-2.19a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                  <span className="force-ltr">{phone}</span>
                </a>

                <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="contact-link" style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--muted)', fontSize: '14px', textDecoration: 'none' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, color: 'var(--accent)' }}>
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
                  </svg>
                  <span>WhatsApp</span>
                </a>

                <a href={instagram} target="_blank" rel="noopener noreferrer" className="contact-link" style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--muted)', fontSize: '14px', textDecoration: 'none' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, color: 'var(--accent)' }}>
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                  </svg>
                  <span>Instagram</span>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="reveal" style={{ aspectRatio: '1/1', borderRadius: 'var(--radius-lg)', overflow: 'hidden', border: '1px solid var(--border-rich)', boxShadow: '0 12px 40px rgba(0, 181, 176, 0.05)' }}>
          <iframe 
            src={mapUrl} 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </section>
  );
}
