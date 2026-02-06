import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import './SectionNav.css';

const SectionNav = ({ sections = [] }) => {
  const { t } = useTranslation();
  const [activeId, setActiveId] = useState(sections[0]?.id || '');

  const sectionIds = useMemo(() => sections.map((section) => section.id), [sections]);

  useEffect(() => {
    if (!sectionIds.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        root: null,
        rootMargin: '-20% 0px -60% 0px',
        threshold: 0.1
      }
    );

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [sectionIds]);

  if (!sections.length) return null;

  return (
    <aside className="section-nav" aria-label={t('nav.onThisPage')}>
      <p className="section-nav-title">{t('nav.onThisPage')}</p>
      <div className="section-nav-links">
        {sections.map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            className={`section-nav-link ${activeId === section.id ? 'active' : ''}`}
          >
            {section.label}
          </a>
        ))}
      </div>
    </aside>
  );
};

export default SectionNav;
