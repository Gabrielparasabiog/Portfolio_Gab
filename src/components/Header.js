import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import LanguageSwitcher from './LanguageSwitcher';
import './Header.css';

const Header = ({ darkMode, toggleDarkMode }) => {
  const { t } = useTranslation();

  return (
    <motion.header 
      className="header"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, type: "spring" }}
    >
      <div className="header-container">
        <motion.div 
          className="logo"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          <h1>{t('header.title')}</h1>
          <p>{t('header.subtitle')}</p>
        </motion.div>
        <nav className="nav-links" aria-label="Primary">
          <NavLink to="/" end className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            {t('nav.home')}
          </NavLink>
          <NavLink to="/portfolio" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            {t('nav.portfolio')}
          </NavLink>
          <NavLink to="/journey" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            {t('nav.journey')}
          </NavLink>
          <NavLink to="/contact" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            {t('nav.contact')}
          </NavLink>
        </nav>
        <div className="header-controls">
          <LanguageSwitcher />
          <motion.button 
            className="theme-toggle"
            onClick={toggleDarkMode}
            aria-label="Toggle dark mode"
            whileHover={{ scale: 1.1, rotate: 180 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            {darkMode ? '☀️' : '🌙'}
          </motion.button>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;

