import Image from 'next/image';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'framer-motion';

export default function Services() {
  const { t: content } = useLanguage();
  const { eyebrow, title, lead, list } = content.services;

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 35 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section id="services" className="section" data-od-id="services" style={{ background: 'white' }}>
      <div className="container">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ textAlign: 'center', marginBottom: '64px' }}
        >
          <span className="eyebrow">{eyebrow}</span>
          <h2 className="h2">{title}</h2>
          <p className="lead" style={{ marginInline: 'auto', marginTop: '16px' }}>{lead}</p>
        </motion.div>
        
        <motion.div 
          className="grid-3" 
          style={{ gap: '32px' }}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {list.map((service, index) => (
            <motion.div 
              key={index} 
              className="card" 
              variants={itemVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
            >
              <div style={{ position: 'relative', width: '100%', aspectRatio: '16/10', overflow: 'hidden', background: 'var(--bg-muted)' }}>
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  style={{ objectFit: 'cover', transition: 'transform 0.5s ease' }}
                  className="service-card-image"
                />
              </div>
              <div style={{ padding: '24px 24px 28px 24px', display: 'flex', flexDirection: 'column', gap: '8px', flexGrow: 1 }}>
                <h3 className="h3" style={{ fontSize: '18px', fontWeight: 700, color: 'var(--fg)' }}>{service.title}</h3>
                <p style={{ color: 'var(--muted)', fontSize: '14px', lineHeight: '1.5', margin: 0 }}>{service.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
