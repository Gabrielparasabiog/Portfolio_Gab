import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Chatbot.css';

const ROUTE_MAP = {
  about: '/#about',
  stats: '/#stats',
  skills: '/portfolio#skills',
  experience: '/portfolio#experience',
  projects: '/portfolio#projects',
  education: '/journey#education',
  blog: '/journey#blog',
  resume: '/journey#resume',
  contact: '/contact#contact'
};

const Chatbot = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL || '';
  const apiCandidates = apiBaseUrl
    ? [`${apiBaseUrl.replace(/\/$/, '')}/api/chat`]
    : ['/api/chat', 'http://localhost:5000/api/chat'];

  const normalizeResponseLinks = (text) =>
    text.replace(/href="#(.*?)"/g, (_, id) => {
      const target = ROUTE_MAP[id] || `/#${id}`;
      return `href="${target}"`;
    });

  const localResponses = [
    {
      keywords: ['certification', 'certifications', 'certificate', 'certified', 'credential', 'sertipikasyon', 'cert'],
      response: [
        '<strong>Certifications:</strong>',
        '<ul>',
        '<li>Cisco DevNet Associate (Dec 2023)</li>',
        '<li>CCNA: Introduction to Networks (Jul 2023)</li>',
        '<li>IT Specialist - Python (Nov 2022)</li>',
        '<li>IT Specialist - Java (Nov 2022)</li>',
        '<li>Accelerate Your Job Search with AI - Google (2025)</li>',
        '<li>Discover the Art of Prompting - Google (2025)</li>',
        '<li>Google Project Management Professional Certificate (v2) - Coursera (2025)</li>',
        '<li>Introduction to AI - Google (2025)</li>',
        '</ul>',
        '<a href="/journey#education" class="chatbot-link">View education and certifications</a>'
      ].join('')
    },
    {
      keywords: ['project', 'projects', 'portfolio', 'work'],
      response: [
        'Gabriel has completed 15+ projects across AI, data analytics, and full-stack development.',
        ' <a href="/portfolio#projects" class="chatbot-link">View projects</a>'
      ].join('')
    },
    {
      keywords: ['experience', 'work', 'job', 'intern', 'role'],
      response: [
        'Gabriel has 4+ years of combined experience across AI development, data analysis, and QA.',
        ' <a href="/portfolio#experience" class="chatbot-link">View experience</a>'
      ].join('')
    },
    {
      keywords: ['skills', 'technologies', 'tech stack', 'tools', 'stack'],
      response: [
        'He works with Python, JavaScript, React, Node.js, testing tools, and AI/ML frameworks.',
        ' <a href="/portfolio#skills" class="chatbot-link">View skills</a>'
      ].join('')
    },
    {
      keywords: ['contact', 'email', 'reach', 'hire'],
      response: [
        'You can reach Gabriel at gabrielparasabiog@gmail.com.',
        ' <a href="/contact#contact" class="chatbot-link">Contact page</a>'
      ].join('')
    },
    {
      keywords: ['education', 'degree', 'school', 'university'],
      response: [
        'Gabriel is completing a BS in Computer Science at FEU Institute of Technology.',
        ' <a href="/journey#education" class="chatbot-link">View education</a>'
      ].join('')
    },
    {
      keywords: ['who', 'gabriel', 'about', 'bio'],
      response: [
        'Gabriel Paras Abiog is an AI Developer and Data Analyst focused on intelligent systems and data-driven solutions.',
        ' <a href="/#about" class="chatbot-link">About Gabriel</a>'
      ].join('')
    }
  ];

  const getLocalResponse = (message) => {
    const lower = message.toLowerCase();
    for (const item of localResponses) {
      if (item.keywords.some((keyword) => lower.includes(keyword))) {
        return item.response;
      }
    }

    return [
      'I can help you learn about Gabriel\'s background, projects, skills, experience, and certifications.',
      ' <a href="/#about" class="chatbot-link">Start here</a>'
    ].join('');
  };

  // Pre-defined questions - will be translated
  const getPreQuestions = () => {
    const lang = i18n.language;
    if (lang === 'tl') {
      return [
        "Sino si Gabriel?",
        "Sabihin mo sa akin ang tungkol sa mga proyekto ni Gabriel",
        "Ano ang mga tagumpay ni Gabriel?",
        "Ano ang mga teknolohiya na ginagamit ni Gabriel?",
        "Paano ko macocontact si Gabriel?",
        "Ano ang karanasan ni Gabriel?",
        "Sabihin mo sa akin ang tungkol sa AI projects ni Gabriel",
        "Ano ang mga sertipikasyon ni Gabriel?"
      ];
    } else if (lang === 'zh') {
      return [
        "Gabriel是谁？",
        "告诉我Gabriel的项目",
        "Gabriel的成就是什么？",
        "Gabriel使用什么技术？",
        "如何联系Gabriel？",
        "Gabriel的经验是什么？",
        "告诉我Gabriel的AI项目",
        "Gabriel有什么认证？"
      ];
    } else {
      return [
        "Who is Gabriel?",
        "Tell me about Gabriel's projects",
        "What are Gabriel's achievements?",
        "What technologies does Gabriel use?",
        "How can I contact Gabriel?",
        "What is Gabriel's experience?",
        "Tell me about Gabriel's AI projects",
        "What certifications does Gabriel have?"
      ];
    }
  };

  const preQuestions = getPreQuestions();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Input validation and sanitization
  const sanitizeInput = (text) => {
    if (!text) return '';
    
    // Remove potentially dangerous characters
    let sanitized = text
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/javascript:/gi, '')
      .replace(/on\w+\s*=/gi, '')
      .replace(/<iframe/gi, '')
      .replace(/<object/gi, '')
      .replace(/<embed/gi, '');
    
    // Limit length
    if (sanitized.length > 500) {
      sanitized = sanitized.substring(0, 500);
    }
    
    return sanitized.trim();
  };

  const validateInput = (text) => {
    if (!text || typeof text !== 'string') return false;
    
    // Check for dangerous patterns
    const dangerousPatterns = [
      /<script/i,
      /javascript:/i,
      /onerror=/i,
      /onload=/i,
      /<iframe/i,
      /<object/i,
      /<embed/i,
      /SELECT.*FROM/i,
      /INSERT.*INTO/i,
      /UPDATE.*SET/i,
      /DELETE.*FROM/i
    ];
    
    for (const pattern of dangerousPatterns) {
      if (pattern.test(text)) {
        return false;
      }
    }
    
    return text.length <= 500 && text.trim().length > 0;
  };

  const sendMessage = async (messageText) => {
    if (!messageText.trim()) return;

    // Validate and sanitize input
    if (!validateInput(messageText)) {
      const errorMessage = { 
        type: 'bot', 
        text: 'Invalid input detected. Please use only text characters.' 
      };
      setMessages(prev => [...prev, errorMessage]);
      return;
    }

    const sanitizedMessage = sanitizeInput(messageText);
    const userMessage = { type: 'user', text: sanitizedMessage };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    let lastError = null;
    for (const url of apiCandidates) {
      try {
        const response = await axios.post(
          url,
          {
            message: sanitizedMessage,
            language: i18n.language
          },
          {
            timeout: 10000,
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );

        const normalizedText = normalizeResponseLinks(response.data.response || '');
        const botMessage = {
          type: 'bot',
          text: normalizedText,
          hasLinks: response.data.hasLinks || normalizedText.includes('<a ')
        };
        setMessages(prev => [...prev, botMessage]);
        setIsLoading(false);
        return;
      } catch (error) {
        lastError = error;
        if (error.response && error.response.status === 429) {
          break;
        }
      }
    }

    if (lastError && lastError.response && lastError.response.status === 429) {
      setMessages(prev => [
        ...prev,
        {
          type: 'bot',
          text: t('chatbot.rateLimit')
        }
      ]);
    } else if (
      lastError &&
      lastError.response &&
      lastError.response.data &&
      lastError.response.data.response &&
      lastError.response.status >= 400 &&
      lastError.response.status < 500 &&
      lastError.response.status !== 404
    ) {
      setMessages(prev => [
        ...prev,
        {
          type: 'bot',
          text: normalizeResponseLinks(lastError.response.data.response)
        }
      ]);
    } else {
      const fallbackText = getLocalResponse(sanitizedMessage);
      setMessages(prev => [
        ...prev,
        {
          type: 'bot',
          text: fallbackText,
          hasLinks: fallbackText.includes('<a ')
        }
      ]);
    }

    setIsLoading(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handlePreQuestionClick = (question) => {
    sendMessage(question);
  };

  const handleLinkClick = useCallback((e) => {
    const link = e.target.closest('a');
    if (!link) return;

    const href = link.getAttribute('href');
    if (!href) return;

    if (href.startsWith('/')) {
      e.preventDefault();
      setIsOpen(false);
      navigate(href);
      return;
    }

    if (href.startsWith('#')) {
      e.preventDefault();
      const sectionId = href.substring(1);
      const mapped = ROUTE_MAP[sectionId];
      if (mapped) {
        setIsOpen(false);
        navigate(mapped);
        return;
      }

      const element = document.getElementById(sectionId);
      if (element) {
        setIsOpen(false);
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 300);
      }
    }
  }, [navigate]);

  useEffect(() => {
    const messageContainer = document.querySelector('.chatbot-messages');
    if (messageContainer) {
      messageContainer.addEventListener('click', handleLinkClick);
      return () => {
        messageContainer.removeEventListener('click', handleLinkClick);
      };
    }
  }, [handleLinkClick]);

  return (
    <>
      <div className={`chatbot-container ${isOpen ? 'open' : ''}`}>
        <div className="chatbot-header">
          <div className="chatbot-title">
            <span className="chatbot-icon">💬</span>
            <span>{t('chatbot.title')}</span>
          </div>
          <button 
            className="chatbot-close"
            onClick={() => setIsOpen(false)}
            aria-label="Close chatbot"
          >
            ✕
          </button>
        </div>
        
        <div className="chatbot-messages">
          {messages.length === 0 && (
            <div className="welcome-message">
              <p>{t('chatbot.welcome')}</p>
            </div>
          )}
          
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.type}`}>
              <div 
                className="message-content"
                dangerouslySetInnerHTML={{ __html: msg.text }}
              />
            </div>
          ))}
          
          {isLoading && (
            <div className="message bot">
              <div className="message-content">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          )}

          <div className="quick-questions">
            <p>{t('chatbot.preQuestions')}</p>
            {preQuestions.map((question, index) => (
              <button
                key={index}
                className="pre-question-btn"
                onClick={() => handlePreQuestionClick(question)}
                disabled={isLoading}
              >
                {question}
              </button>
            ))}
          </div>
          
          <div ref={messagesEndRef} />
        </div>
        
        <form className="chatbot-input-form" onSubmit={handleSubmit}>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => {
              const value = e.target.value;
              // Real-time validation
              if (value.length <= 500) {
                setInput(value);
              }
            }}
            onKeyDown={(e) => {
              // Prevent dangerous key combinations
              if (e.ctrlKey && (e.key === 'v' || e.key === 'V')) {
                // Allow paste but will be sanitized
                return;
              }
            }}
            placeholder={t('chatbot.placeholder')}
            className="chatbot-input"
            disabled={isLoading}
            maxLength={500}
          />
          <button 
            type="submit" 
            className="chatbot-send"
            disabled={isLoading || !input.trim()}
          >
            ➤
          </button>
        </form>
      </div>
      
      <button 
        className="chatbot-toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle chatbot"
      >
        {isOpen ? '✕' : '💬'}
      </button>
    </>
  );
};

export default Chatbot;

