import React, { useState, useRef, useEffect } from 'react';
import { EMAIL, SOCIAL_LINKS } from '../data/portfolioData';
import { usePortfolio } from '../context/PortfolioContext';

interface ContactRibbonProps {
  className?: string;
}

export const ContactRibbon: React.FC<ContactRibbonProps> = ({ className = '' }) => {
  const { profile } = usePortfolio();
  const [copied, setCopied] = useState(false);
  const timerRef = useRef<number | null>(null);

  const targetEmail = profile.email || EMAIL;
  const targetSocialLinks = profile.socialLinks || SOCIAL_LINKS;
  const composeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${targetEmail}`;

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
        await navigator.clipboard.writeText(targetEmail);
      } else {
        fallbackCopy(targetEmail);
      }
    } catch {
      try {
        fallbackCopy(targetEmail);
      } catch {
        setCopied(false);
      }
    }
  };

  return (
    <div className={`contact-ribbon ${className}`.trim()} aria-label="Contact and profile links">
      <div className="contact-email-block">
        <div className="contact-email-actions">
          <a href={composeUrl} target="_blank" rel="noopener noreferrer">
            Email
          </a>
          <button type="button" onClick={handleCopy} aria-live="polite">
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>
        <span className="contact-email-address">{targetEmail}</span>
      </div>

      <div className="contact-profile-links">
        {targetSocialLinks.map(([label, href]) => (
          <a key={label} href={href} target="_blank" rel="noopener noreferrer">
            {label} <span aria-hidden="true">↗</span>
          </a>
        ))}
      </div>
    </div>
  );
};
