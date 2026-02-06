import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import './About.css';

const About = () => {
  const { t } = useTranslation();
  
  return (
    <motion.section 
      id="about" 
      className="about section"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <motion.h2 
        className="section-title"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {t('about.title')}
      </motion.h2>
      <div className="about-content">
        <motion.div 
          className="profile-section"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, type: "spring" }}
        >
          <motion.div 
            className="profile-image-wrapper"
            whileHover={{ scale: 1.05, rotateY: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
            style={{ transformStyle: "preserve-3d" }}
          >
            <img 
              src="/portrait-about.png" 
              alt="Gabriel Paras Abiog" 
              className="profile-image"
            />
            <div className="profile-overlay"></div>
          </motion.div>
          <motion.div 
            className="contact-info"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <motion.p
              whileHover={{ x: 10, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <strong>{t('about.address')}</strong> 117 Patnuaby St. Brgy San Agustin Q.C
            </motion.p>
            <motion.p
              whileHover={{ x: 10, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <strong>{t('about.email')}</strong> gabrielparasabiog@gmail.com
            </motion.p>
            <motion.p
              whileHover={{ x: 10, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <strong>{t('about.website')}</strong> www.reallygreatsite.com
            </motion.p>
          </motion.div>
        </motion.div>
        <motion.div 
          className="summary"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, type: "spring" }}
        >
          <div className="summary-content">
            <p>{t('about.summary1')}</p>
            <p>{t('about.summary2')}</p>
            <p>{t('about.summary3')}</p>
            <div className="summary-highlights">
              <div className="highlight-item">
                <strong>{t('about.highlight1')}</strong> {t('about.highlight1Text')}
              </div>
              <div className="highlight-item">
                <strong>{t('about.highlight2')}</strong> {t('about.highlight2Text')}
              </div>
              <div className="highlight-item">
                <strong>{t('about.highlight3')}</strong> {t('about.highlight3Text')}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default About;

