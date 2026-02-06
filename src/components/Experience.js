import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FaCode, FaHeadset, FaBrain } from 'react-icons/fa';
import './Experience.css';

const Experience = () => {
  const { t } = useTranslation();
  const experiences = [
    {
      title: 'AI Developer Intern (Fullstack)',
      company: 'FEU Institute of Technology',
      period: 'Dec 2024 – Jul 2025',
      duration: '3 months',
      icon: FaBrain,
      achievements: 'Improved chatbot accuracy by 15%, reduced API response time by 40%',
      responsibilities: [
        'Designed and executed 500+ unit and integration tests for AI chatbot features, achieving 95%+ test coverage and ensuring stability during backend API updates.',
        'Verified real-time chatbot response accuracy (98%+) and optimized semantic search performance, reducing irrelevant responses by 75%.',
        'Conducted comprehensive manual and automated API testing using Postman and PyTest for Node.js + Express.js backend, identifying and resolving 50+ critical bugs.',
        'Documented 100+ bugs with detailed reports, collaborated with 5+ frontend developers to fix UI/UX inconsistencies, and validated all solutions before deployment.',
        'Implemented automated testing pipelines reducing manual testing time by 60% and improving deployment confidence.'
      ]
    },
    {
      title: 'Web Developer',
      company: 'IEMELIF Church Website (Team Project)',
      period: '2024',
      duration: '',
      icon: FaCode,
      achievements: 'Delivered fully responsive website with 100% cross-browser compatibility',
      responsibilities: [
        'Performed comprehensive cross-browser and responsive testing for HTML, CSS, and Java-based pages across 10+ browsers and devices, ensuring 100% compatibility.',
        'Debugged 20+ backend integration issues and ensured smooth livestream embedding with 99.9% uptime during live events.',
        'Developed a comprehensive regression test checklist with 150+ test cases for future feature updates, reducing bug reports by 70%.',
        'Collaborated with a team of 4 developers using Agile methodologies, delivering the project 2 weeks ahead of schedule.'
      ]
    },
    {
      title: 'Customer Service Representative',
      company: 'Teleperformance, Manila',
      period: '2 years',
      duration: '',
      icon: FaHeadset,
      achievements: 'Maintained 95%+ customer satisfaction rate, zero compliance violations',
      responsibilities: [
        'Supported 1000+ healthcare and financial clients, resolving complex issues with 95%+ first-call resolution rate.',
        'Maintained 100% HIPAA/financial data compliance across all interactions, with zero violations during 2-year tenure.',
        'Achieved top 10% performance rating consistently, handling 50+ calls daily while maintaining quality standards.',
        'Trained 15+ new team members on compliance protocols and customer service best practices.'
      ]
    },
    {
      title: 'AI Developer and Data Analyst',
      company: 'FEU Institute Of Technology',
      period: '',
      duration: '',
      icon: FaBrain,
      achievements: 'Deployed 5+ ML models, generated insights from 100K+ data points',
      responsibilities: [
        'Designed, trained, and deployed 5+ machine learning (ML) and deep learning (DL) models for institutional needs, improving decision-making accuracy by 40%.',
        'Collected, cleaned, and transformed 100,000+ institutional data points (academic, financial, HR, etc.) into actionable insights using Python and SQL.',
        'Created automated data pipelines reducing manual data processing time by 80% and improving data accuracy to 99.5%.',
        'Developed predictive models for student performance and resource allocation, helping optimize institutional operations.',
        'Presented data-driven insights to stakeholders, influencing strategic decisions and resource allocation.'
      ]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <motion.section 
      id="experience" 
      className="experience section"
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
        {t('experience.title')}
      </motion.h2>
      <motion.div className="experience-list" variants={containerVariants}>
        {experiences.map((exp, index) => {
          const IconComponent = exp.icon;
          return (
            <motion.div
              key={index}
              className="experience-item"
              variants={itemVariants}
              whileHover={{ x: 15, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="experience-icon-wrapper">
                <IconComponent className="experience-icon" />
              </div>
              <div className="experience-header">
                <div>
                  <h3>{exp.title}</h3>
                  <p className="company">{exp.company}</p>
                  {exp.achievements && (
                    <p className="experience-achievement">{exp.achievements}</p>
                  )}
                </div>
                <div className="experience-period">
                  {exp.period && <span>{exp.period}</span>}
                  {exp.duration && <span className="duration">{exp.duration}</span>}
                </div>
              </div>
              <ul className="responsibilities">
                {exp.responsibilities.map((resp, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    {resp}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          );
        })}
      </motion.div>
    </motion.section>
  );
};

export default Experience;

