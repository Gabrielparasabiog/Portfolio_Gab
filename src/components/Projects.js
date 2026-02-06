import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FaProjectDiagram, FaRobot, FaGraduationCap, FaChalkboardTeacher } from 'react-icons/fa';
import './Projects.css';

const Projects = () => {
  const { t } = useTranslation();
  const projects = [
    {
      name: 'TALA: AI-Powered Calendar Assistant',
      type: 'Capstone Project',
      tech: ['Python', 'Java'],
      description: 'A comprehensive AI-driven calendar management system that intelligently schedules and manages appointments. Developed and tested scheduling and calendar API features for functionality, accuracy, and edge cases.',
      achievements: [
        'Achieved 95%+ test coverage with comprehensive unit and integration tests',
        'Reduced scheduling conflicts by 80% through intelligent AI algorithms',
        'Created 200+ test cases to verify UI consistency and backend logic reliability',
        'Implemented real-time synchronization across multiple platforms'
      ],
      icon: FaProjectDiagram
    },
    {
      name: 'FEU Tech AI Chatbot',
      tech: ['GPT-4', 'LangChain', 'MongoDB', 'Node.js', 'Express.js', 'React.js'],
      description: 'An intelligent chatbot system for FEU Institute of Technology that provides instant responses to student inquiries. Leverages GPT-4 and LangChain for natural language understanding and semantic search.',
      achievements: [
        'Maintained 98%+ response accuracy through rigorous API validation tests',
        'Optimized backend response time from 2.5s to 0.8s (68% improvement)',
        'Handled 1000+ daily queries with 99.9% uptime',
        'Implemented semantic search reducing irrelevant responses by 75%'
      ],
      icon: FaRobot
    },
    {
      name: 'AI Skill Assessment Platform',
      tech: ['Python', 'Node.js', 'MongoDB'],
      description: 'A comprehensive AI-based evaluation system that assesses user proficiency through adaptive testing. Features intelligent question randomization, automated scoring, and detailed performance analytics.',
      achievements: [
        'Built automated scripts achieving 100% scoring accuracy',
        'Implemented question randomization preventing cheating by 90%',
        'Processed 5000+ assessments with zero data integrity issues',
        'Reduced assessment time by 40% through AI-optimized question selection'
      ],
      icon: FaGraduationCap
    },
    {
      name: 'AI-Powered Virtual Tutor',
      tech: ['Python', 'OpenAI API', 'React.js'],
      description: 'An intelligent virtual tutoring system that provides personalized learning recommendations based on individual student performance. Features adaptive difficulty levels and comprehensive progress tracking.',
      achievements: [
        'Achieved 92% student satisfaction rate through personalized recommendations',
        'Improved learning outcomes by 35% compared to traditional methods',
        'Validated 100% lesson flow accuracy through comprehensive QA testing',
        'Adaptive difficulty system increased engagement by 50%'
      ],
      icon: FaChalkboardTeacher
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
        type: "spring",
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
                transition: { type: "spring", stiffness: 300 }
              }}
              style={{ transformStyle: "preserve-3d" }}
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
                    transition={{ type: "spring", stiffness: 400 }}
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

