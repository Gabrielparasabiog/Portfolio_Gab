import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FaCode, FaHeadset, FaBrain, FaWordpress, FaShoppingCart } from 'react-icons/fa';
import './Experience.css';

const Experience = () => {
  const { t } = useTranslation();
  const experiences = [
    {
      title: 'AI Developer Intern (Fullstack)',
      company: 'FEU Institute of Technology',
      period: 'Dec 2024 - Jul 2025',
      duration: '',
      icon: FaBrain,
      achievements: 'Executed API and integration testing for an AI chatbot platform',
      responsibilities: [
        'Designed and executed unit and integration tests for AI chatbot features, ensuring stability during backend API updates.',
        'Verified real-time chatbot response accuracy and optimized semantic search performance.',
        'Conducted manual and automated API testing using Postman and PyTest for Node.js + Express.js backend.',
        'Documented bugs, collaborated with frontend developers to fix UI/UX inconsistencies, and validated solutions before deployment.'
      ]
    },
    {
      title: 'Web Developer',
      company: 'IEMELIF Church Website (Team Project)',
      period: 'Jan 2024 - Feb 2025',
      duration: '',
      icon: FaCode,
      achievements: 'Handled QA, regression checks, and integration fixes for a team website',
      responsibilities: [
        'Performed cross-browser and responsive testing for HTML, CSS, and Java-based pages.',
        'Debugged backend integration issues and ensured smooth livestream embedding.',
        'Developed a regression test checklist for future feature updates.'
      ]
    },
    {
      title: 'Customer Service Representative',
      company: 'Teleperformance, Manila',
      period: '',
      duration: '3 months',
      icon: FaHeadset,
      achievements: 'Handled healthcare and financial support with compliance focus',
      responsibilities: [
        'Supported healthcare and financial clients.',
        'Maintained HIPAA/financial data compliance.'
      ]
    },
    {
      title: 'AI Developer and Data Analyst',
      company: 'FEU Institute of Technology',
      period: '',
      duration: '3 years',
      icon: FaBrain,
      achievements: 'Built AI models and transformed institutional data into actionable insights',
      responsibilities: [
        'Design, train, and deploy machine learning (ML) and deep learning (DL) models for institutional needs.',
        'Collect, clean, and transform institutional data (academic, financial, HR, etc.) into actionable insights.'
      ]
    },
    {
      title: 'Freelance WordPress Developer',
      company: 'Independent / Client Projects',
      period: '2023 - Present',
      duration: '',
      icon: FaWordpress,
      achievements: 'Built and optimized WordPress and WooCommerce websites for business clients',
      responsibilities: [
        'Built and customized WordPress websites using Elementor from Figma design mockups.',
        'Configured WooCommerce product catalogs including categories, filters, product variations, and discount rules.',
        'Integrated WPForms for lead capture and automated email workflows.',
        'Implemented GA4 and Google Tag Manager for traffic tracking and conversion monitoring.',
        'Optimized website performance using caching plugins and image compression to improve load speed and Core Web Vitals.',
        'Configured SSL, security plugins, and backup systems to ensure site reliability.',
        'Integrated payment gateways such as PayPal and Stripe for e-commerce functionality.'
      ]
    },
    {
      title: 'E-Commerce Web Developer (Project-Based)',
      company: 'Client Shopify Projects',
      period: '2024 - 2025',
      duration: '',
      icon: FaShoppingCart,
      achievements: 'Delivered Shopify stores with conversion-focused customization',
      responsibilities: [
        'Set up Shopify stores including product collections, tagging, filtering, and SEO metadata.',
        'Customized Shopify themes and modified Liquid templates for layout adjustments.',
        'Implemented shipping rules, discount automation, and checkout optimization.',
        'Connected third-party marketing tools such as Mailchimp and Meta Pixel.',
        'Improved mobile responsiveness and conversion flow.'
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
        type: 'spring',
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
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div className="experience-icon-wrapper">
                <IconComponent className="experience-icon" />
              </div>
              <div>
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
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </motion.section>
  );
};

export default Experience;
