import React, { useState, useEffect } from 'react';
import { RouteKey } from './types/portfolio';
import { ROUTE_TITLES } from './data/portfolioData';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './components/Home';
import { NewsPage } from './components/NewsPage';
import { ResearchPage } from './components/ResearchPage';
import { PublicationsPage } from './components/PublicationsPage';
import { TeachingPage } from './components/TeachingPage';
import { IndustryPage } from './components/IndustryPage';
import { ProjectsPage } from './components/ProjectsPage';
import { EducationPage } from './components/EducationPage';
import { ContactsPage } from './components/ContactsPage';

const ROUTE_COMPONENTS: Record<RouteKey, React.ComponentType> = {
  home: Home,
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

export const App: React.FC = () => {
  const [activeRoute, setActiveRoute] = useState<RouteKey>(getRouteFromHash);

  useEffect(() => {
    const handleHashChange = () => {
      setActiveRoute(getRouteFromHash());
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    document.title = ROUTE_TITLES[activeRoute] || 'S M Asif Hossain';
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [activeRoute]);

  const ActiveComponent = ROUTE_COMPONENTS[activeRoute] || Home;

  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Navbar activeRoute={activeRoute} />
      <main id="main-content" className="route-page" key={activeRoute}>
        <ActiveComponent />
      </main>
      <Footer />
    </>
  );
};

export default App;
