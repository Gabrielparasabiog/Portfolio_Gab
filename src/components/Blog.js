import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FaCalendar, FaUser, FaBook, FaLightbulb, FaCode, FaRocket, FaUsers, FaChartLine, FaGraduationCap, FaTrophy, FaBrain, FaLaptopCode, FaProjectDiagram, FaTools, FaHandshake, FaRobot } from 'react-icons/fa';
import './Blog.css';

const Blog = () => {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const blogPosts = [
    {
      id: 1,
      category: 'learning',
      icon: FaBook,
      date: '2024',
      title: t('blog.post1.title'),
      excerpt: t('blog.post1.excerpt'),
      content: t('blog.post1.content'),
      readTime: '5 min read'
    },
    {
      id: 2,
      category: 'experience',
      icon: FaCode,
      date: 'Dec 2024',
      title: t('blog.post2.title'),
      excerpt: t('blog.post2.excerpt'),
      content: t('blog.post2.content'),
      readTime: '6 min read'
    },
    {
      id: 3,
      category: 'project',
      icon: FaProjectDiagram,
      date: 'Nov 2024',
      title: t('blog.post3.title'),
      excerpt: t('blog.post3.excerpt'),
      content: t('blog.post3.content'),
      readTime: '7 min read'
    },
    {
      id: 4,
      category: 'learning',
      icon: FaBrain,
      date: 'Oct 2024',
      title: t('blog.post4.title'),
      excerpt: t('blog.post4.excerpt'),
      content: t('blog.post4.content'),
      readTime: '5 min read'
    },
    {
      id: 5,
      category: 'experience',
      icon: FaUsers,
      date: 'Sep 2024',
      title: t('blog.post5.title'),
      excerpt: t('blog.post5.excerpt'),
      content: t('blog.post5.content'),
      readTime: '6 min read'
    },
    {
      id: 6,
      category: 'project',
      icon: FaRobot,
      date: 'Aug 2024',
      title: t('blog.post6.title'),
      excerpt: t('blog.post6.excerpt'),
      content: t('blog.post6.content'),
      readTime: '8 min read'
    },
    {
      id: 7,
      category: 'learning',
      icon: FaTools,
      date: 'Jul 2024',
      title: t('blog.post7.title'),
      excerpt: t('blog.post7.excerpt'),
      content: t('blog.post7.content'),
      readTime: '5 min read'
    },
    {
      id: 8,
      category: 'experience',
      icon: FaHandshake,
      date: 'Jun 2024',
      title: t('blog.post8.title'),
      excerpt: t('blog.post8.excerpt'),
      content: t('blog.post8.content'),
      readTime: '6 min read'
    },
    {
      id: 9,
      category: 'project',
      icon: FaGraduationCap,
      date: 'May 2024',
      title: t('blog.post9.title'),
      excerpt: t('blog.post9.excerpt'),
      content: t('blog.post9.content'),
      readTime: '7 min read'
    },
    {
      id: 10,
      category: 'learning',
      icon: FaChartLine,
      date: 'Apr 2024',
      title: t('blog.post10.title'),
      excerpt: t('blog.post10.excerpt'),
      content: t('blog.post10.content'),
      readTime: '6 min read'
    },
    {
      id: 11,
      category: 'experience',
      icon: FaLaptopCode,
      date: 'Mar 2024',
      title: t('blog.post11.title'),
      excerpt: t('blog.post11.excerpt'),
      content: t('blog.post11.content'),
      readTime: '5 min read'
    },
    {
      id: 12,
      category: 'project',
      icon: FaRocket,
      date: 'Feb 2024',
      title: t('blog.post12.title'),
      excerpt: t('blog.post12.excerpt'),
      content: t('blog.post12.content'),
      readTime: '7 min read'
    },
    {
      id: 13,
      category: 'learning',
      icon: FaLightbulb,
      date: 'Jan 2024',
      title: t('blog.post13.title'),
      excerpt: t('blog.post13.excerpt'),
      content: t('blog.post13.content'),
      readTime: '6 min read'
    },
    {
      id: 14,
      category: 'experience',
      icon: FaTrophy,
      date: 'Dec 2023',
      title: t('blog.post14.title'),
      excerpt: t('blog.post14.excerpt'),
      content: t('blog.post14.content'),
      readTime: '5 min read'
    },
    {
      id: 15,
      category: 'project',
      icon: FaUser,
      date: 'Nov 2023',
      title: t('blog.post15.title'),
      excerpt: t('blog.post15.excerpt'),
      content: t('blog.post15.content'),
      readTime: '6 min read'
    }
  ];

  const categories = [
    { id: 'all', label: t('blog.categories.all'), icon: FaCalendar },
    { id: 'learning', label: t('blog.categories.learning'), icon: FaBook },
    { id: 'experience', label: t('blog.categories.experience'), icon: FaCode },
    { id: 'project', label: t('blog.categories.project'), icon: FaProjectDiagram }
  ];

  const filteredPosts = selectedCategory === 'all' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

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
    hidden: { y: 50, opacity: 0 },
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
      id="blog" 
      className="blog section"
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
        {t('blog.title')}
      </motion.h2>

      <motion.div 
        className="blog-categories"
        variants={itemVariants}
      >
        {categories.map((category) => {
          const IconComponent = category.icon;
          return (
            <motion.button
              key={category.id}
              className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category.id)}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <IconComponent className="category-icon" />
              <span>{category.label}</span>
            </motion.button>
          );
        })}
      </motion.div>

      <motion.div 
        className="blog-grid"
        variants={containerVariants}
      >
        {filteredPosts.map((post) => {
          const IconComponent = post.icon;
          return <BlogCard key={post.id} post={post} IconComponent={IconComponent} />;
        })}
      </motion.div>
    </motion.section>
  );
};

const BlogCard = ({ post, IconComponent }) => {
  const { t } = useTranslation();
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <motion.article
      className="blog-card"
      whileHover={{ y: -10, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="blog-card-header">
        <div className="blog-icon-wrapper">
          <IconComponent className="blog-icon" />
        </div>
        <div className="blog-meta">
          <span className="blog-date">
            <FaCalendar className="meta-icon" />
            {post.date}
          </span>
          <span className="blog-read-time">{post.readTime}</span>
        </div>
      </div>
      
      <h3 className="blog-title">{post.title}</h3>
      <p className="blog-excerpt">{post.excerpt}</p>
      
      {isExpanded && (
        <motion.div
          className="blog-content"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="blog-content-text">
            {post.content.split('\n').map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>
        </motion.div>
      )}
      
      <motion.button
        className="blog-read-more"
        onClick={() => setIsExpanded(!isExpanded)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {isExpanded ? t('blog.readLess') : t('blog.readMore')}
      </motion.button>
    </motion.article>
  );
};

export default Blog;

