import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FaProjectDiagram, FaCode, FaUsers, FaTrophy, FaChartLine, FaBrain } from 'react-icons/fa';
import './Stats.css';

const Stats = () => {
  const { t } = useTranslation();
  
  const stats = [
    {
      icon: FaProjectDiagram,
      number: '15+',
      label: t('stats.projects'),
      description: t('stats.projectsDesc')
    },
    {
      icon: FaCode,
      number: '10+',
      label: t('stats.technologies'),
      description: t('stats.technologiesDesc')
    },
    {
      icon: FaUsers,
      number: '5+',
      label: t('stats.collaborations'),
      description: t('stats.collaborationsDesc')
    },
    {
      icon: FaTrophy,
      number: '8',
      label: t('stats.certifications'),
      description: t('stats.certificationsDesc')
    },
    {
      icon: FaChartLine,
      number: '95%+',
      label: t('stats.testCoverage'),
      description: t('stats.testCoverageDesc')
    },
    {
      icon: FaBrain,
      number: '4',
      label: t('stats.aiProjects'),
      description: t('stats.aiProjectsDesc')
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
    hidden: { y: 50, opacity: 0, scale: 0.8 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <motion.section 
      id="stats" 
      className="stats section"
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
        {t('stats.title')}
      </motion.h2>
      <motion.div className="stats-grid" variants={containerVariants}>
        {stats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <motion.div
              key={index}
              className="stat-card"
              variants={itemVariants}
              whileHover={{ 
                y: -15, 
                scale: 1.05,
                rotateY: 5,
                transition: { type: "spring", stiffness: 300 }
              }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="stat-icon-wrapper">
                <IconComponent className="stat-icon" />
              </div>
              <motion.div 
                className="stat-number"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ 
                  type: "spring", 
                  stiffness: 200,
                  delay: index * 0.1 
                }}
              >
                {stat.number}
              </motion.div>
              <h3 className="stat-label">{stat.label}</h3>
              <p className="stat-description">{stat.description}</p>
            </motion.div>
          );
        })}
      </motion.div>
    </motion.section>
  );
};

export default Stats;

