import React from 'react';
import { useTranslation } from 'react-i18next';
import Contact from '../components/Contact';
import PageLayout from '../components/PageLayout';

const ContactPage = () => {
  const { t } = useTranslation();

  const sections = [{ id: 'contact', label: t('contact.title') }];

  return (
    <PageLayout sections={sections}>
      <Contact />
    </PageLayout>
  );
};

export default ContactPage;
