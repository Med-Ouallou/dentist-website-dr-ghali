import { motion } from 'framer-motion';
import Image from 'next/image';
import { useLanguage } from '../context/LanguageContext';

export default function About() {
  const { t: content } = useLanguage();
  const { eyebrow, title, subtitle, image, paragraphs, cards } = content.about;

  const textContainerVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  };

  return (
    <section id="about" className="section" data-od-id="about" style={{ overflow: 'hidden' }}>
      <div className="container grid-2" style={{ alignItems: 'center', gap: '80px' }}>
        <motion.div 
          initial={{ opacity: 0, x: -50, scale: 0.95 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', aspectRatio: '3/4', position: 'relative', width: '100%', minHeight: '480px' }}
        >
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
            style={{ objectFit: 'cover' }}
          />
        </motion.div>
        <motion.div 
          variants={textContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="stack"
        >
          <span className="eyebrow">{eyebrow}</span>
          <h2 className="h2">{title}</h2>
          <p style={{ fontWeight: 700, color: 'var(--accent)', fontSize: '18px', marginTop: '-12px' }}>{subtitle}</p>
          <div className="stack" style={{ gap: '20px', marginTop: '24px' }}>
            {paragraphs.map((p, index) => (
              <p key={index}>{p}</p>
            ))}
          </div>
          <div className="grid-2" style={{ marginTop: '32px', gap: '20px' }}>
            {cards.map((card, index) => (
              <motion.div 
                key={index} 
                className="card" 
                variants={cardVariants}
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                style={{ padding: '20px', textAlign: 'center', cursor: 'default' }}
              >
                <h4 style={{ fontWeight: 700, marginBottom: '8px' }}>{card.title}</h4>
                <p style={{ fontSize: '13px', color: 'var(--muted)' }}>{card.text}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
