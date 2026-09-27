import React, { useState } from 'react';
import { Copy, Check, ArrowUpRight } from 'lucide-react';
import { EMAIL, DISPLAY_NAME, SOCIAL_LINKS } from '../data/portfolioData';
import { GlassWords } from './GlassWords';

export const Footer: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    }
  };

  const tickerItems = [
    'BACKEND ARCHITECTURE',
    'HIGH-THROUGHPUT APIS',
    'DISTRIBUTED SYSTEMS',
    'MACHINE LEARNING',
    'NEURAL COMPUTING',
    'CLOUD DEVOPS',
    'PRODUCTION SCALING',
    'MICROSERVICES'
  ];

  return (
    <>
      {/* Rotated Competencies Ticker Ribbon */}
      <section className="footer-ticker-section" aria-label="Core competencies ticker">
        <div className="footer-ticker-track">
          {[...tickerItems, ...tickerItems, ...tickerItems].map((item, idx) => (
            <span key={idx} className="footer-ticker-item">
              {item} <span className="ticker-bullet">•</span>
            </span>
          ))}
        </div>
      </section>

      {/* Main Architectural Footer */}
      <footer className="architectural-footer" aria-labelledby="footer-cta-title">
        <div className="wrap footer-cta-content">
          <GlassWords as="h2" id="footer-cta-title" className="footer-headline">
            Let's Build <br className="hidden-mobile" />
            <span className="footer-serif-accent">something</span> <br />
            Great.
          </GlassWords>

          <div className="footer-actions">
            <a
              href={`mailto:${EMAIL}`}
              className="footer-btn footer-btn-primary"
            >
              <span>Send Email Directly</span>
            </a>
            <button
              type="button"
              onClick={handleCopyEmail}
              className="footer-btn footer-btn-secondary"
              aria-label="Copy email address"
            >
              {copied ? <Check size={18} /> : <Copy size={18} />}
              <span>{copied ? 'Email Copied!' : 'Copy Email'}</span>
            </button>
          </div>

          <div className="footer-social-row">
            {SOCIAL_LINKS.map(([label, href]) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-link group"
              >
                <span>{label}</span>
                <ArrowUpRight size={14} className="social-arrow" />
              </a>
            ))}
          </div>

          <div className="footer-bottom-bar mono">
            <GlassWords as="span">© 2026 {DISPLAY_NAME.toUpperCase()} • DESIGNED &amp; BUILT WITH PRECISION</GlassWords>
            <GlassWords as="span" className="footer-location-tag">DHAKA, BANGLADESH · UTC+6</GlassWords>
          </div>
        </div>
      </footer>
    </>
  );
};
