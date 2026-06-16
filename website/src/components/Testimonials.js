import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

export default function Testimonials() {
  const { t: content } = useLanguage();
  const { eyebrow, title, list } = content.testimonials;

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section id="testimonials" className="section" data-od-id="testimonials">
      <div className="container">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ textAlign: 'center', marginBottom: '56px' }}
        >
          <span className="eyebrow">{eyebrow}</span>
          <h2 className="h2">{title}</h2>
        </motion.div>
        <motion.div 
          className="grid-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {list.map((item, index) => (
            <motion.div 
              key={index} 
              className="card stack"
              variants={itemVariants}
              whileHover={{ y: -6, scale: 1.01 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <div className="row" style={{ color: '#FFD700', gap: '4px' }}>
                {Array.from({ length: item.stars }).map((_, i) => (
                  <span key={i}>★</span>
                ))}
              </div>
              <p style={{ fontStyle: 'italic', color: 'var(--muted)', fontSize: '14px' }}>
                "{item.quote}"
              </p>
              <h4 style={{ fontWeight: 700, fontSize: '14px' }}>— {item.author}</h4>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
