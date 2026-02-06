import React from 'react';
import { useTranslation } from 'react-i18next';
import Skills from '../components/Skills';
import Experience from '../components/Experience';
import Projects from '../components/Projects';
import PageLayout from '../components/PageLayout';

const PortfolioPage = () => {
  const { t } = useTranslation();

  const sections = [
    { id: 'skills', label: t('skills.title') },
    { id: 'experience', label: t('experience.title') },
    { id: 'projects', label: t('projects.title') }
  ];

  return (
    <PageLayout sections={sections}>
      <Skills />
      <Experience />
      <Projects />
    </PageLayout>
  );
};

export default PortfolioPage;
