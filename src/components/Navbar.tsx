import React, { useState, useEffect } from 'react';
import { RouteKey } from '../types/portfolio';
import { REAL_NAV_LINKS, DISPLAY_NAME } from '../data/portfolioData';

interface NavbarProps {
  activeRoute: RouteKey;
}

export const Navbar: React.FC<NavbarProps> = ({ activeRoute }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(false);
  }, [activeRoute]);

  return (
    <header className="site-nav">
      <div className="wrap nav-inner">
        <a className="brand" href="#home" aria-label={`${DISPLAY_NAME}, home`}>
          <span className="brand-dot" aria-hidden="true" />
          <span>{DISPLAY_NAME}</span>
        </a>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {REAL_NAV_LINKS.map(([route, label]) => (
            <a
              key={route}
              className={activeRoute === route ? 'active' : ''}
              href={`#${route}`}
              aria-current={activeRoute === route ? 'page' : undefined}
            >
              {label}
            </a>
          ))}
        </nav>

        <button
          className={`menu-toggle${isOpen ? ' open' : ''}`}
          type="button"
          aria-label={isOpen ? 'Close navigation' : 'Open navigation'}
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <nav
        className={`mobile-nav${isOpen ? ' open' : ''}`}
        id="mobile-navigation"
        aria-label="Mobile navigation"
      >
        <div className="wrap mobile-nav-inner">
          {REAL_NAV_LINKS.map(([route, label], index) => (
            <a
              key={route}
              className={activeRoute === route ? 'active' : ''}
              href={`#${route}`}
              aria-current={activeRoute === route ? 'page' : undefined}
            >
              <span className="mono">0{index + 1}</span>
              {label}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
};
