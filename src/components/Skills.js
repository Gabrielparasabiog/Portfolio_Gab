import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { 
  SiPython, SiJavascript, SiNodedotjs, SiReact, SiCplusplus,
  SiMongodb, SiPostman, SiSelenium, SiExpress, SiAmazonaws, SiLinux,
  SiKalilinux, SiJunit5, SiTypescript, SiDocker, SiKubernetes
} from 'react-icons/si';
import { FaJava } from 'react-icons/fa';
import './Skills.css';

const Skills = () => {
  const { t } = useTranslation();
  
  // Skills organized by category
  const usingNow = [
    { name: 'Python', icon: SiPython, color: '#3776AB' },
    { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E' },
    { name: 'React.js', icon: SiReact, color: '#61DAFB' },
    { name: 'Node.js', icon: SiNodedotjs, color: '#339933' },
    { name: 'Express.js', icon: SiExpress, color: '#000000' },
    { name: 'MongoDB', icon: SiMongodb, color: '#47A248' },
    { name: 'Postman', icon: SiPostman, color: '#FF6C37' },
    { name: 'Selenium', icon: SiSelenium, color: '#43B02A' }
  ];

  const learning = [
    { name: 'AWS', icon: SiAmazonaws, color: '#FF9900' },
    { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
    { name: 'Docker', icon: SiDocker, color: '#2496ED' },
    { name: 'Kubernetes', icon: SiKubernetes, color: '#326CE5' }
  ];

  const otherSkills = [
    { name: 'Java', icon: FaJava, color: '#007396' },
    { name: 'C++', icon: SiCplusplus, color: '#00599C' },
    { name: 'Linux', icon: SiLinux, color: '#FCC624' },
    { name: 'Kali', icon: SiKalilinux, color: '#557C94' },
    { name: 'JUnit', icon: SiJunit5, color: '#25A162' },
    { name: 'PyTest', icon: SiPython, color: '#007396' }
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
      
      <div className="skills-categories">
        {/* Using Now */}
        <motion.div className="skill-category" variants={itemVariants}>
          <h3 className="category-title">{t('skills.usingNow')}</h3>
          <motion.div 
            className="skills-icon-grid"
            variants={containerVariants}
          >
            {usingNow.map((skill, index) => {
              const IconComponent = skill.icon;
              return (
                <motion.div
                  key={index}
                  className="skill-icon-card"
                  variants={itemVariants}
                  whileHover={{ scale: 1.1, y: -10, rotateZ: 5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  {IconComponent && (
                    <IconComponent 
                      size={40} 
                      color={skill.color}
                      className="skill-tech-icon"
                    />
                  )}
                  <span className="skill-tech-name">{skill.name}</span>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>

        {/* Learning */}
        <motion.div className="skill-category" variants={itemVariants}>
          <h3 className="category-title">{t('skills.learning')}</h3>
          <motion.div 
            className="skills-icon-grid"
            variants={containerVariants}
          >
            {learning.map((skill, index) => {
              const IconComponent = skill.icon;
              return (
                <motion.div
                  key={index}
                  className="skill-icon-card learning"
                  variants={itemVariants}
                  whileHover={{ scale: 1.1, y: -10, rotateZ: 5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  {IconComponent ? (
                    <IconComponent 
                      size={40} 
                      color={skill.color}
                      className="skill-tech-icon"
                    />
                  ) : (
                    <div 
                      className="skill-tech-icon placeholder"
                      style={{ backgroundColor: skill.color }}
                    >
                      {skill.name.charAt(0)}
                    </div>
                  )}
                  <span className="skill-tech-name">{skill.name}</span>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>

        {/* Other Skills */}
        <motion.div className="skill-category" variants={itemVariants}>
          <h3 className="category-title">{t('skills.otherSkills')}</h3>
          <motion.div 
            className="skills-icon-grid"
            variants={containerVariants}
          >
            {otherSkills.map((skill, index) => {
              const IconComponent = skill.icon;
              return (
                <motion.div
                  key={index}
                  className="skill-icon-card"
                  variants={itemVariants}
                  whileHover={{ scale: 1.1, y: -10, rotateZ: 5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  {IconComponent && (
                    <IconComponent 
                      size={40} 
                      color={skill.color}
                      className="skill-tech-icon"
                    />
                  )}
                  <span className="skill-tech-name">{skill.name}</span>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Skills;

