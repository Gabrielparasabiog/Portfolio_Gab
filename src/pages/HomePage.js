import React from 'react';
import { useTranslation } from 'react-i18next';
import Hero from '../components/Hero';
import About from '../components/About';
import Stats from '../components/Stats';
import PageLayout from '../components/PageLayout';

const HomePage = () => {
  const { t } = useTranslation();

  const sections = [
    { id: 'about', label: t('about.title') },
    { id: 'stats', label: t('stats.title') }
  ];

  return (
    <>
      <Hero />
      <PageLayout sections={sections}>
        <About />
        <Stats />
      </PageLayout>
    </>
  );
};

export default HomePage;
