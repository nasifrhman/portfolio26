import React from 'react';
import { EMAIL, DISPLAY_NAME, GMAIL_COMPOSE_URL } from '../data/portfolioData';

export const Footer: React.FC = () => {
  return (
    <footer className="site-footer">
      <div className="wrap footer-inner">
        <div>
          <p className="footer-thesis">
            Designing reliable backends and digital solutions that scale with <em>confidence</em>.
          </p>
          <a
            className="text-link"
            href={GMAIL_COMPOSE_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            {EMAIL} <span aria-hidden="true">↗</span>
          </a>
        </div>
        <div className="footer-meta mono">
          <span>Dhaka, Bangladesh</span>
          <span>© 2026 {DISPLAY_NAME}</span>
        </div>
      </div>
    </footer>
  );
};
