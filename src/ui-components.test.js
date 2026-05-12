import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import HomePage from './pages/HomePage';
import PortfolioPage from './pages/PortfolioPage';
import JourneyPage from './pages/JourneyPage';
import ContactPage from './pages/ContactPage';
import NotFoundPage from './pages/NotFoundPage';
import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './components/Hero';
import About from './components/About';
import Stats from './components/Stats';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Education from './components/Education';
import Blog from './components/Blog';
import Resume from './components/Resume';
import Contact from './components/Contact';
import Chatbot from './components/Chatbot';
import PageLayout from './components/PageLayout';
import SectionNav from './components/SectionNav';
import LanguageSwitcher from './components/LanguageSwitcher';
import Icon3D from './components/Icon3D';
import ScrollToTop from './components/ScrollToTop';

jest.mock('axios', () => ({
  post: jest.fn()
}));

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key,
    i18n: {
      language: 'en',
      changeLanguage: jest.fn()
    }
  })
}));

describe('UI component render coverage', () => {
  const renderWithRouter = (ui, initialEntries = ['/']) =>
    render(<MemoryRouter initialEntries={initialEntries}>{ui}</MemoryRouter>);

  it('renders App shell', () => {
    const { container } = render(<App />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders all pages', () => {
    expect(renderWithRouter(<HomePage />).container.firstChild).toBeInTheDocument();
    expect(renderWithRouter(<PortfolioPage />).container.firstChild).toBeInTheDocument();
    expect(renderWithRouter(<JourneyPage />).container.firstChild).toBeInTheDocument();
    expect(renderWithRouter(<ContactPage />).container.firstChild).toBeInTheDocument();
    expect(renderWithRouter(<NotFoundPage />).container.firstChild).toBeInTheDocument();
  });

  it('renders layout and navigation helpers', () => {
    expect(
      render(
        <PageLayout sections={[{ id: 'demo', label: 'Demo' }]}>
          <div id="demo">content</div>
        </PageLayout>
      ).container.firstChild
    ).toBeInTheDocument();
    expect(
      render(<SectionNav sections={[{ id: 'demo', label: 'Demo' }]} />).container.firstChild
    ).toBeInTheDocument();
    expect(renderWithRouter(<ScrollToTop />).container).toBeInTheDocument();
  });

  it('renders all portfolio sections/components', () => {
    expect(renderWithRouter(<Header darkMode toggleDarkMode={jest.fn()} />).container.firstChild).toBeInTheDocument();
    expect(render(<Footer />).container.firstChild).toBeInTheDocument();
    expect(renderWithRouter(<Hero />).container.firstChild).toBeInTheDocument();
    expect(render(<About />).container.firstChild).toBeInTheDocument();
    expect(render(<Stats />).container.firstChild).toBeInTheDocument();
    expect(render(<Skills />).container.firstChild).toBeInTheDocument();
    expect(render(<Experience />).container.firstChild).toBeInTheDocument();
    expect(render(<Projects />).container.firstChild).toBeInTheDocument();
    expect(render(<Education />).container.firstChild).toBeInTheDocument();
    expect(render(<Blog />).container.firstChild).toBeInTheDocument();
    expect(render(<Resume />).container.firstChild).toBeInTheDocument();
    expect(render(<Contact />).container.firstChild).toBeInTheDocument();
    expect(renderWithRouter(<Chatbot />).container.firstChild).toBeInTheDocument();
  });

  it('renders utility components', () => {
    expect(render(<LanguageSwitcher />).container.firstChild).toBeInTheDocument();
    const FakeIcon = () => <span>icon</span>;
    expect(render(<Icon3D icon={FakeIcon} label="Icon label" />).container.firstChild).toBeInTheDocument();
  });
});
