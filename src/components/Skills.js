import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import './Skills.css';

const Skills = () => {
  const { t } = useTranslation();

  const professionalSkills = [
    'Testing',
    'Automation',
    'Scripting',
    'Problem-solving',
    'Organization',
    'Analysis',
    'Design',
    'Integration',
    'Debugging',
    'Documentation',
    'Optimization',
    'Communication',
    'Collaboration',
    'Troubleshooting',
    'Deployment'
  ];

  const technicalSkills = [
    'Python',
    'JavaScript',
    'Node.js',
    'React.js',
    'REST APIs',
    'Kali',
    'Postman',
    'JUnit',
    'Java',
    'C++',
    'Express.js',
    'MongoDB',
    'AWS',
    'Linux',
    'Selenium',
    'PyTest'
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 120
      }
    }
  };

  return (
    <motion.section
      id="skills"
      className="skills section"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      <motion.h2 className="section-title" variants={itemVariants}>
        {t('skills.title')}
      </motion.h2>

      <div className="skills-content">
        <motion.div variants={itemVariants}>
          <h3>{t('skills.professional')}</h3>
          <motion.div className="skills-grid" variants={containerVariants}>
            {professionalSkills.map((skill, index) => (
              <motion.div
                key={`${skill}-${index}`}
                className="skill-tag"
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -4 }}
              >
                <span>{skill}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <h3>{t('skills.technical')}</h3>
          <motion.div className="skills-grid" variants={containerVariants}>
            {technicalSkills.map((skill, index) => (
              <motion.div
                key={`${skill}-${index}`}
                className="skill-tag"
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -4 }}
              >
                <span>{skill}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Skills;
