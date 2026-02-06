import React from 'react';
import { useTranslation } from 'react-i18next';
import Education from '../components/Education';
import Blog from '../components/Blog';
import Resume from '../components/Resume';
import PageLayout from '../components/PageLayout';

const JourneyPage = () => {
  const { t } = useTranslation();

  const sections = [
    { id: 'education', label: t('education.title') },
    { id: 'blog', label: t('blog.title') },
    { id: 'resume', label: t('resume.title') }
  ];

  return (
    <PageLayout sections={sections}>
      <Education />
      <Blog />
      <Resume />
    </PageLayout>
  );
};

export default JourneyPage;
