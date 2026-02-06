import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FaGraduationCap, FaTrophy, FaUsers } from 'react-icons/fa';
import './Education.css';

const Education = () => {
  const { t } = useTranslation();
  const certifications = [
    'Cisco DevNet Associate – Cisco (Dec 2023)',
    'CCNA: Introduction to Networks – Cisco (Jul 2023)',
    'IT Specialist – Python – Certiport/Pearson VUE (Nov 2022)',
    'IT Specialist – Java – Certiport/Pearson VUE (Nov 2022)',
    'Accelerate Your Job Search with AI - Google (2025)',
    'Discover the Art of Prompting - Google (2025)',
    'Google Project Management Professional Certificate (v2) - Coursera (2025)',
    'Introduction to AI - Google (2025)'
  ];

  const activities = [
    {
      role: 'Organizer',
      event: 'CS Expo 2024, FEU Institute of Technology',
      date: 'Nov 2024'
    },
    {
      role: 'Organizer',
      event: 'The Grand Cyber League, FIT iTamaraws Esports Club',
      date: 'Oct 2023'
    },
    {
      role: 'Participant',
      event: 'Multiple tech events including StartUp Spark, ACMX, FOSS4ML, Design Thinking Summit, Agile Seminar',
      date: ''
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <motion.section 
      id="education" 
      className="education section"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      <motion.h2 
        className="section-title"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {t('education.title')}
      </motion.h2>
      <div className="education-content">
        <motion.div 
          className="education-item"
          variants={itemVariants}
          whileHover={{ scale: 1.02, x: 10 }}
        >
          <FaGraduationCap className="education-section-icon" />
          <h3>{t('education.degree')}</h3>
          <p className="institution">{t('education.institution')}</p>
          <p className="coursework">
            <strong>{t('education.coursework')}</strong> Software Quality Assurance, Software Engineering, 
            Database Management, Artificial Intelligence, Networking Fundamentals
          </p>
        </motion.div>
        
        <motion.div 
          className="certifications"
          variants={itemVariants}
        >
          <h3><FaTrophy className="section-icon" /> {t('education.certifications')}</h3>
          <motion.div 
            className="cert-list"
            variants={containerVariants}
          >
            {certifications.map((cert, index) => (
              <motion.div
                key={index}
                className="cert-item"
                variants={itemVariants}
                whileHover={{ x: 10, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <FaTrophy className="cert-icon" />
                <span>{cert}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div 
          className="activities"
          variants={itemVariants}
        >
          <h3><FaUsers className="section-icon" /> {t('education.activities')}</h3>
          <motion.div 
            className="activities-list"
            variants={containerVariants}
          >
            {activities.map((activity, index) => (
              <motion.div
                key={index}
                className="activity-item"
                variants={itemVariants}
                whileHover={{ x: 10, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <div className="activity-header">
                  <span className="activity-role">{activity.role}</span>
                  {activity.date && <span className="activity-date">{activity.date}</span>}
                </div>
                <p className="activity-event">{activity.event}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Education;

