import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './Hero.css';

const MotionLink = motion(Link);

const Hero = () => {
  const { t } = useTranslation();
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  const imageVariants = {
    hidden: { scale: 0.8, opacity: 0, rotateY: -180 },
    visible: {
      scale: 1,
      opacity: 1,
      rotateY: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 1
      }
    }
  };

  return (
    <section className="hero">
      <motion.div 
        className="hero-container"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div 
          className="hero-image-wrapper"
          variants={imageVariants}
          whileHover={{ scale: 1.05, rotateY: 5 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <img 
            src={process.env.PUBLIC_URL + '/portrait-hero.png'} 
            alt="Gabriel Paras Abiog" 
            className="hero-image"
          />
          <div className="hero-glow"></div>
        </motion.div>
        <motion.div 
          className="hero-content"
          variants={containerVariants}
        >
          <motion.h1 className="hero-name" variants={itemVariants}>
            {t('hero.name')}
          </motion.h1>
          <motion.p className="hero-title" variants={itemVariants}>
            {t('hero.title')}
          </motion.p>
          <motion.p className="hero-description" variants={itemVariants}>
            {t('hero.description')}
          </motion.p>
          <motion.div 
            className="hero-highlights"
            variants={itemVariants}
          >
            <span className="highlight-badge">{t('hero.badge1')}</span>
            <span className="highlight-badge">{t('hero.badge2')}</span>
            <span className="highlight-badge">{t('hero.badge3')}</span>
          </motion.div>
          <motion.div 
            className="hero-buttons"
            variants={itemVariants}
          >
            <MotionLink
              to="/contact#contact"
              className="hero-btn primary"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              {t('hero.button1')}
            </MotionLink>
            <MotionLink
              to="/portfolio#projects"
              className="hero-btn secondary"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              {t('hero.button2')}
            </MotionLink>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;

