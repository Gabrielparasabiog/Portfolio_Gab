import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './NotFoundPage.css';

const NotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <main>
      <section className="section not-found">
        <h2 className="section-title">{t('notFound.title')}</h2>
        <p className="not-found-message">{t('notFound.message')}</p>
        <Link to="/" className="not-found-link">
          {t('notFound.cta')}
        </Link>
      </section>
    </main>
  );
};

export default NotFoundPage;
