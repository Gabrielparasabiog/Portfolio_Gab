import React from 'react';
import { motion } from 'framer-motion';
import { FaFacebook, FaLinkedin, FaGithub } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <motion.div
          className="footer-social"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="social-icons-footer">
            <motion.a
              href="https://www.facebook.com/GabrielParasAbiog"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon-footer"
              whileHover={{ scale: 1.15, y: -5, rotateZ: 5 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400 }}
              aria-label="Facebook"
            >
              <FaFacebook />
            </motion.a>
            <motion.a
              href="https://www.linkedin.com/in/gabriel-paras-abiog-603358338/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon-footer"
              whileHover={{ scale: 1.15, y: -5, rotateZ: -5 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400 }}
              aria-label="LinkedIn"
            >
              <FaLinkedin />
            </motion.a>
            <motion.a
              href="https://github.com/Gabrielparasabiog"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon-footer"
              whileHover={{ scale: 1.15, y: -5, rotateZ: 5 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400 }}
              aria-label="GitHub"
            >
              <FaGithub />
            </motion.a>
          </div>
        </motion.div>
        
        <motion.div
          className="footer-text"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p>
            © {currentYear} Gabriel Paras Abiog.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;





