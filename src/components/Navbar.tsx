import React, { useState, useEffect } from 'react';
import { RouteKey } from '../types/portfolio';
import { REAL_NAV_LINKS, DISPLAY_NAME } from '../data/portfolioData';
import { usePortfolio } from '../context/PortfolioContext';
import { Sun, Moon } from 'lucide-react';

interface NavbarProps {
  activeRoute: RouteKey;
  theme?: 'dark' | 'light';
  onToggleTheme?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeRoute, theme = 'dark', onToggleTheme }) => {
  const { profile } = usePortfolio();
  const [isOpen, setIsOpen] = useState(false);
  const brandName = profile.displayName || DISPLAY_NAME;

  useEffect(() => {
    setIsOpen(false);
  }, [activeRoute]);

  return (
    <header className="site-nav">
      <div className="wrap nav-inner">
        <a className="brand" href="#home" aria-label={`${brandName}, home`}>
          <span>{brandName}</span>
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
          {onToggleTheme ? (
            <button
              className="theme-toggle-btn"
              type="button"
              onClick={onToggleTheme}
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
            </button>
          ) : null}
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
          {onToggleTheme ? (
            <button
              className="mobile-theme-toggle"
              type="button"
              onClick={onToggleTheme}
            >
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
              <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
            </button>
          ) : null}
        </div>
      </nav>
    </header>
  );
};
