import { useLanguage } from '../context/LanguageContext';

export default function WhatsAppFloat() {
  const { t: content } = useLanguage();
  const cleanPhone = content.meta.phone.replace(/\s+/g, '');
  const waNumber = cleanPhone.startsWith('0') ? `212${cleanPhone.substring(1)}` : cleanPhone;

  return (
    <a 
      href={`https://wa.me/${waNumber}`} 
      className="whatsapp-float" 
      target="_blank" 
      rel="noopener noreferrer"
      aria-label="Contactez-nous sur WhatsApp"
    >
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
      </svg>
    </a>
  );
}
