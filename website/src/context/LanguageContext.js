'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import contentFr from '../data/content_fr.json';
import contentAr from '../data/content_ar.json';

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('fr');

  useEffect(() => {
    const savedLang = localStorage.getItem('preferredLang');
    if (savedLang === 'ar' || savedLang === 'fr') {
      setLang(savedLang);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('preferredLang', lang);
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  const t = lang === 'ar' ? contentAr : contentFr;

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
