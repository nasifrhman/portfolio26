import React, { useState, useEffect } from 'react';
import { RouteKey } from './types/portfolio';
import { ROUTE_TITLES, DISPLAY_NAME } from './data/portfolioData';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './components/Home';
import { SkillsPage } from './components/SkillsPage';
import { NewsPage } from './components/NewsPage';
import { ResearchPage } from './components/ResearchPage';
import { PublicationsPage } from './components/PublicationsPage';
import { TeachingPage } from './components/TeachingPage';
import { IndustryPage } from './components/IndustryPage';
import { ProjectsPage } from './components/ProjectsPage';
import { EducationPage } from './components/EducationPage';
import { ContactsPage } from './components/ContactsPage';
import { MagnifyingCursor } from './components/MagnifyingCursor';

const ROUTE_COMPONENTS: Record<RouteKey, React.ComponentType> = {
  home: Home,
  skills: SkillsPage,
  skill: SkillsPage,
  news: NewsPage,
  research: ResearchPage,
  publication: PublicationsPage,
  teaching: TeachingPage,
  industry: IndustryPage,
  projects: ProjectsPage,
  education: EducationPage,
  contacts: ContactsPage
};

function getRouteFromHash(): RouteKey {
  const hash = window.location.hash.replace(/^#\/?/, '').toLowerCase();
  return (ROUTE_COMPONENTS[hash as RouteKey] ? hash : 'home') as RouteKey;
}

function getInitialTheme(): 'dark' | 'light' {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('portfolio_theme');
    if (saved === 'dark' || saved === 'light') return saved;
  }
  return 'dark';
}

export const App: React.FC = () => {
  const [activeRoute, setActiveRoute] = useState<RouteKey>(getRouteFromHash);
  const [theme, setTheme] = useState<'dark' | 'light'>(getInitialTheme);

  useEffect(() => {
    const handleHashChange = () => {
      setActiveRoute(getRouteFromHash());
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('portfolio_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  useEffect(() => {
    document.title = ROUTE_TITLES[activeRoute] || `${DISPLAY_NAME} — Software Engineer & Back-End Developer`;
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [activeRoute]);

  const ActiveComponent = ROUTE_COMPONENTS[activeRoute] || Home;

  return (
    <>
      <MagnifyingCursor />
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Navbar activeRoute={activeRoute} theme={theme} onToggleTheme={toggleTheme} />
      <main id="main-content" className="route-page" key={activeRoute}>
        <ActiveComponent />
      </main>
      <Footer activeRoute={activeRoute} isHome={activeRoute === 'home'} />
    </>
  );
};

export default App;
