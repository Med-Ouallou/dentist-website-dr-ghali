import Image from 'next/image';
import { useLanguage } from '../context/LanguageContext';

export default function Footer() {
  const { t: content } = useLanguage();
  const { logoName, instagram } = content.meta;
  const { description, navigationTitle, legalTitle, socialTitle, copyright, builtWith } = content.footer;

  return (
    <footer className="footer" data-od-id="footer">
      <div className="container stack" style={{ gap: '64px' }}>
        <div className="footer-grid">
          <div className="stack reveal" style={{ gap: '24px' }}>
            <a href="#home" className="logo">
              <div style={{ position: 'relative', width: '48px', height: '48px', borderRadius: '100%', overflow: 'hidden', background: 'white', padding: '4px' }}>
                <Image
                  src="/dr.ghali-logo.png"
                  alt="Logo Dr. Ghali"
                  fill
                  sizes="48px"
                  style={{ objectFit: 'contain' }}
                />
              </div>
              <span>{logoName}</span>
            </a>
            <p style={{ maxWidth: '32ch' }}>{description}</p>
          </div>
          
          <div className="stack reveal" style={{ gap: '16px' }}>
            <h4 style={{ color: 'var(--fg)', fontWeight: 700 }}>{navigationTitle}</h4>
            <a href="#home">Accueil</a>
            <a href="#about">La Clinique</a>
            <a href="#services">Services</a>
            <a href="#gallery">Galerie</a>
          </div>

          <div className="stack reveal" style={{ gap: '16px' }}>
            <h4 style={{ color: 'var(--fg)', fontWeight: 700 }}>{legalTitle}</h4>
            <a href="#faq">FAQ</a>
            <a href="#privacy">Confidentialité</a>
            <a href="#legal">Mentions légales</a>
          </div>

          <div className="stack reveal" style={{ gap: '16px' }}>
            <h4 style={{ color: 'var(--fg)', fontWeight: 700 }}>{socialTitle}</h4>
            <div className="row" style={{ gap: '12px' }}>
              <a href={instagram} target="_blank" rel="noopener noreferrer" className="footer-social-link" style={{ width: '32px', height: '32px', background: 'rgba(255, 255, 255, 0.12)', borderRadius: '50%', display: 'grid', placeItems: 'center', border: '1px solid rgba(255, 255, 255, 0.2)', color: 'white', transition: 'all 0.3s ease' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="row-between reveal" style={{ paddingTop: '32px', borderTop: '1px solid var(--border-rich)', opacity: 0.6, fontSize: '12px' }}>
          <span>{copyright}</span>
          <span>{builtWith}</span>
        </div>
      </div>
    </footer>
  );
}
