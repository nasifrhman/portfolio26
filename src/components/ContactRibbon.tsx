import React, { useState, useRef, useEffect } from 'react';
import { EMAIL, SOCIAL_LINKS, GMAIL_COMPOSE_URL } from '../data/portfolioData';

interface ContactRibbonProps {
  className?: string;
}

export const ContactRibbon: React.FC<ContactRibbonProps> = ({ className = '' }) => {
  const [copied, setCopied] = useState(false);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        window.clearTimeout(timerRef.current);
      }
    };
  }, []);

  const fallbackCopy = (text: string) => {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
  };

  const handleCopy = async () => {
    setCopied(true);
    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
    }
    timerRef.current = window.setTimeout(() => setCopied(false), 1800);

    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(EMAIL);
      } else {
        fallbackCopy(EMAIL);
      }
    } catch {
      try {
        fallbackCopy(EMAIL);
      } catch {
        setCopied(false);
      }
    }
  };

  return (
    <div className={`contact-ribbon ${className}`.trim()} aria-label="Contact and profile links">
      <div className="contact-email-block">
        <div className="contact-email-actions">
          <a href={GMAIL_COMPOSE_URL} target="_blank" rel="noopener noreferrer">
            Email
          </a>
          <button type="button" onClick={handleCopy} aria-live="polite">
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>
        <span className="contact-email-address">{EMAIL}</span>
      </div>

      <div className="contact-profile-links">
        {SOCIAL_LINKS.map(([label, href]) => (
          <a key={label} href={href} target="_blank" rel="noopener noreferrer">
            {label} <span aria-hidden="true">↗</span>
          </a>
        ))}
      </div>
    </div>
  );
};
