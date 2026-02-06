import React from 'react';
import SectionNav from './SectionNav';
import './PageLayout.css';

const PageLayout = ({ sections, children }) => (
  <main>
    <div className="page-layout">
      <div className="page-sidebar">
        <SectionNav sections={sections} />
      </div>
      <div className="page-content">
        {children}
      </div>
    </div>
  </main>
);

export default PageLayout;
