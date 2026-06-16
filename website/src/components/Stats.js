import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

export default function Stats() {
  const { t: content } = useLanguage();

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15
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
    <motion.section 
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="section" 
      data-od-id="stats" 
      style={{ paddingBlock: '40px', borderTop: '1px solid var(--border-rich)', borderBottom: '1px solid var(--border-rich)', background: 'white' }}
    >
      <div className="container grid-4">
        {content.stats.items.map((item, index) => (
          <motion.div 
            key={index} 
            variants={itemVariants}
            className="stack" 
            style={{ alignItems: 'center', textAlign: 'center', gap: '4px' }}
          >
            <div className="stat-num" style={item.isSpecial ? { fontSize: '40px', paddingTop: '12px' } : {}}>
              {item.value}
              {item.suffix && <span style={{ fontSize: '0.6em', opacity: 0.5 }}>{item.suffix}</span>}
            </div>
            <p className="meta" style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--muted)' }}>{item.label}</p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
