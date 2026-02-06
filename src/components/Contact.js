import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FaEnvelope, FaGlobe, FaFacebook, FaLinkedin, FaGithub } from 'react-icons/fa';
import Icon3D from './Icon3D';
import './Contact.css';

const Contact = () => {
  const { t } = useTranslation();
  
  return (
    <motion.section 
      id="contact" 
      className="contact section"
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
        {t('contact.title')}
      </motion.h2>
      <div className="contact-content">
        <motion.p 
          className="contact-message"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {t('contact.message')}
        </motion.p>
        <motion.div 
          className="contact-links"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <motion.a 
            href="mailto:gabrielparasabiog@gmail.com" 
            className="contact-link"
            whileHover={{ scale: 1.1, y: -5, rotateZ: 2 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <Icon3D icon={FaEnvelope} size={30} color="#667eea" />
            <span>{t('contact.email')}</span>
          </motion.a>
          <motion.a 
            href="https://www.reallygreatsite.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="contact-link"
            whileHover={{ scale: 1.1, y: -5, rotateZ: -2 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <Icon3D icon={FaGlobe} size={30} color="#667eea" />
            <span>{t('contact.website')}</span>
          </motion.a>
        </motion.div>
        
        <motion.div 
          className="social-media-links"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h3 className="social-title">{t('contact.socialTitle')}</h3>
          <div className="social-icons">
            <motion.a
              href="https://www.facebook.com/GabrielParasAbiog"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
              whileHover={{ scale: 1.2, y: -5, rotateZ: 5 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400 }}
              aria-label="Facebook"
            >
              <FaFacebook />
            </motion.a>
            <motion.a
              href="https://www.linkedin.com/in/gabriel-paras-abiog-603358338/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
              whileHover={{ scale: 1.2, y: -5, rotateZ: -5 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400 }}
              aria-label="LinkedIn"
            >
              <FaLinkedin />
            </motion.a>
            <motion.a
              href="https://github.com/Gabrielparasabiog"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
              whileHover={{ scale: 1.2, y: -5, rotateZ: 5 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400 }}
              aria-label="GitHub"
            >
              <FaGithub />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Contact;

