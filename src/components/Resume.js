import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FaDownload, FaFilePdf, FaUser, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import './Resume.css';

const Resume = () => {
  const { t } = useTranslation();

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/Gabriel_Abiog_Resume.pdf';
    link.download = 'Gabriel_Paras_Abiog_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <motion.section 
      id="resume" 
      className="resume section"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="resume-container"
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, type: "spring" }}
      >
        <motion.div
          className="resume-header"
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="resume-icon-wrapper">
            <FaFilePdf className="resume-icon" />
          </div>
          <h2 className="resume-title">{t('resume.title')}</h2>
          <p className="resume-subtitle">{t('resume.subtitle')}</p>
        </motion.div>

        <motion.div
          className="resume-preview"
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="resume-info-card">
            <div className="resume-info-item">
              <FaUser className="info-icon" />
              <div>
                <strong>{t('resume.name')}</strong>
                <p>Gabriel Paras Abiog</p>
              </div>
            </div>
            <div className="resume-info-item">
              <FaEnvelope className="info-icon" />
              <div>
                <strong>{t('resume.email')}</strong>
                <p>gabrielparasabiog@gmail.com</p>
              </div>
            </div>
            <div className="resume-info-item">
              <FaMapMarkerAlt className="info-icon" />
              <div>
                <strong>{t('resume.location')}</strong>
                <p>Quezon City, Philippines</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="resume-download-section"
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <motion.button
            className="download-btn"
            onClick={handleDownload}
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <FaDownload className="download-icon" />
            <span>{t('resume.download')}</span>
          </motion.button>
          <p className="download-note">{t('resume.note')}</p>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default Resume;

