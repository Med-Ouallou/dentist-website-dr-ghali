'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

export default function AppointmentForm() {
  const { t: content, lang } = useLanguage();
  const { title, lead, byPhoneLabel, hoursLabel, phone, hours, fields, buttonText, submittingText, successMessage } = content.appointment;

  const generalConsultation = lang === 'fr' ? 'Consultation générale' : 'استشارة عامة';
  const servicesOptions = [
    ...content.services.list.map(s => s.title),
    generalConsultation
  ];

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (servicesOptions.length > 0 && !formData.service) {
      setFormData(prev => ({ ...prev, service: servicesOptions[0] }));
    }
  }, [servicesOptions, formData.service]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert('Veuillez remplir votre nom et votre numéro de téléphone.');
      return;
    }
    // Simulate API request
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        phone: '',
        service: servicesOptions[0],
        message: ''
      });
      alert(successMessage);
    }, 1000);
  };

  return (
    <section id="appointment" className="section" data-od-id="appointment">
      <div className="container">
        <motion.div 
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="card card-large"
        >
          <div className="grid-2 gap-large">
            <div className="stack" style={{ gap: '32px' }}>
              <div>
                <h2 className="h2" style={{ marginBottom: '16px' }}>{title}</h2>
                <p className="lead">{lead}</p>
              </div>
              <div className="stack" style={{ gap: '20px' }}>
                <div className="row" style={{ gap: '16px' }}>
                  <div className="feature-icon" style={{ margin: 0, width: '40px', height: '40px' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l2.19-2.19a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                    </svg>
                  </div>
                  <div>
                    <h4 style={{ fontWeight: 700 }}>{byPhoneLabel}</h4>
                    <p style={{ fontSize: '14px', color: 'var(--muted)' }}><span className="force-ltr">{phone}</span></p>
                  </div>
                </div>
                <div className="row" style={{ gap: '16px' }}>
                  <div className="feature-icon" style={{ margin: 0, width: '40px', height: '40px' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
                    </svg>
                  </div>
                  <div>
                    <h4 style={{ fontWeight: 700 }}>{hoursLabel}</h4>
                    <p style={{ fontSize: '14px', color: 'var(--muted)' }}>{hours}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <form className="stack" style={{ gap: '20px' }} onSubmit={handleSubmit}>
              <div className="grid-2" style={{ gap: '16px' }}>
                <div className="field">
                  <label>{fields.nameLabel}</label>
                  <input 
                    type="text" 
                    className="input" 
                    placeholder={fields.namePlaceholder}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div className="field">
                  <label>{fields.phoneLabel}</label>
                  <input 
                    type="tel" 
                    className="input" 
                    placeholder={fields.phonePlaceholder}
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="field">
                <label>{fields.serviceLabel}</label>
                <div className={`custom-select-container ${dropdownOpen ? 'open' : ''}`} ref={dropdownRef}>
                  <div 
                    className="custom-select-trigger" 
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                  >
                    <span>{formData.service || servicesOptions[0]}</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)', transform: dropdownOpen ? 'rotate(180deg)' : 'none', color: 'var(--accent)' }}>
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </div>
                  <div className="custom-select-options">
                    {servicesOptions.map((opt, index) => (
                      <div 
                        key={index} 
                        className={`custom-select-option ${formData.service === opt ? 'selected' : ''}`}
                        onClick={() => {
                          setFormData({ ...formData, service: opt });
                          setDropdownOpen(false);
                        }}
                      >
                        <span>{opt}</span>
                        {formData.service === opt && (
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="field">
                <label>{fields.messageLabel}</label>
                <textarea 
                  className="textarea" 
                  placeholder={fields.messagePlaceholder}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                ></textarea>
              </div>
              <button 
                type="submit" 
                className="btn btn-primary" 
                style={{ justifyContent: 'center' }}
                disabled={submitted}
              >
                {submitted ? submittingText : buttonText}
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
