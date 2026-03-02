import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
  FaProjectDiagram,
  FaRobot,
  FaGraduationCap,
  FaChalkboardTeacher,
  FaStore,
  FaShoppingBag
} from 'react-icons/fa';
import './Projects.css';

const Projects = () => {
  const { t } = useTranslation();
  const projects = [
    {
      name: 'TALA: AI-Powered Calendar Assistant',
      type: 'Capstone Project',
      tech: ['Python', 'Java'],
      description:
        'Developed and tested scheduling and calendar API features for functionality, accuracy, and edge cases.',
      achievements: [
        'Created test cases to verify UI consistency and backend logic reliability.'
      ],
      icon: FaProjectDiagram
    },
    {
      name: 'FEU Tech AI Chatbot',
      tech: ['GPT-4', 'LangChain', 'MongoDB', 'Node.js', 'Express.js', 'React.js'],
      description:
        'Designed API response validation tests to maintain chatbot accuracy after updates.',
      achievements: [
        'Monitored performance metrics to detect delays and optimize backend response time.'
      ],
      icon: FaRobot
    },
    {
      name: 'AI Skill Assessment',
      tech: ['Python', 'Node.js', 'MongoDB'],
      description:
        'Built an AI-based evaluation system to assess user proficiency through interactive tests.',
      achievements: [
        'Designed automated scripts to verify scoring accuracy, question randomization, and database integrity.'
      ],
      icon: FaGraduationCap
    },
    {
      name: 'AI Tutor',
      tech: ['Python', 'OpenAI API', 'React.js'],
      description:
        'Developed a virtual tutor providing personalized learning recommendations.',
      achievements: [
        'Performed QA validation on lesson flow, content accuracy, and adaptive difficulty levels.'
      ],
      icon: FaChalkboardTeacher
    },
    {
      name: 'E-Commerce Website',
      tech: ['WooCommerce', 'Elementor'],
      description:
        'Developed a fully responsive e-commerce website from Figma design mockups.',
      achievements: [
        'Implemented WooCommerce product catalogs with categories, filters, variable products, and discount coupons.',
        'Configured payment gateways (PayPal, Stripe) and shipping zones with dynamic rate rules.',
        'Integrated WPForms for customer inquiries and automated email notifications.'
      ],
      icon: FaStore
    },
    {
      name: 'Shopify Clothing Store',
      tech: ['Shopify', 'Liquid', 'Meta Pixel', 'Mailchimp'],
      description:
        'Built and customized a Shopify store based on complete branding guidelines.',
      achievements: [
        'Configured product collections, tagging systems, search filters, and promotional discount automation.',
        'Modified Shopify Liquid templates to adjust layout and reusable sections.',
        'Optimized checkout flow and mobile responsiveness to improve user conversion.'
      ],
      icon: FaShoppingBag
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0, rotateX: -15 },
    visible: {
      y: 0,
      opacity: 1,
      rotateX: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <motion.section
      id="projects"
      className="projects section"
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
        {t('projects.title')}
      </motion.h2>
      <motion.div className="projects-grid" variants={containerVariants}>
        {projects.map((project, index) => {
          const IconComponent = project.icon;
          return (
            <motion.div
              key={index}
              className="project-card"
              variants={cardVariants}
              whileHover={{
                y: -15,
                rotateY: 5,
                rotateX: 5,
                scale: 1.02,
                transition: { type: 'spring', stiffness: 300 }
              }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="project-icon-wrapper">
                <IconComponent className="project-icon" />
              </div>
              <div className="project-header">
                <h3>{project.name}</h3>
                {project.type && <span className="project-type">{project.type}</span>}
              </div>
              <div className="project-tech">
                {project.tech.map((tech, idx) => (
                  <motion.span
                    key={idx}
                    className="tech-tag"
                    whileHover={{ scale: 1.1, y: -2 }}
                    transition={{ type: 'spring', stiffness: 400 }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
              <p className="project-description">{project.description}</p>
              {project.achievements && (
                <div className="project-achievements">
                  <h4 className="achievements-title">{t('projects.achievements')}</h4>
                  <ul className="achievements-list">
                    {project.achievements.map((achievement, idx) => (
                      <motion.li
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 }}
                      >
                        {achievement}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              )}
            </motion.div>
          );
        })}
      </motion.div>
    </motion.section>
  );
};

export default Projects;
