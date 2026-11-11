import React, { useState, useEffect, useRef } from 'react';
import { Copy, Check, ArrowUpRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { RouteKey } from '../types/portfolio';
import { EMAIL, DISPLAY_NAME, SOCIAL_LINKS } from '../data/portfolioData';
import { GlassWords } from './GlassWords';
import { usePortfolio } from '../context/PortfolioContext';

gsap.registerPlugin(ScrollTrigger);

// 25 deterministic, multi-directional scatter presets
// Bounded vertically so characters stay closely aligned with the headline line and eliminate empty vertical void
const SCATTER_PRESETS = [
  // "Let's" (5 chars: L, e, t, ', s)
  { x: -340, y: -14, rotate: -22, scale: 0.92, opacity: 0.70 },
  { x: -220, y: 16,  rotate: 18,  scale: 1.04, opacity: 0.70 },
  { x: -80,  y: -10, rotate: -14, scale: 0.94, opacity: 0.72 },
  { x: 70,   y: 15,  rotate: 24,  scale: 1.06, opacity: 0.70 },
  { x: 280,  y: -12, rotate: -20, scale: 0.95, opacity: 0.72 },

  // "Build" (5 chars: B, u, i, l, d)
  { x: -420, y: 14,  rotate: 22,  scale: 1.05, opacity: 0.65 },
  { x: -320, y: -15, rotate: -16, scale: 0.92, opacity: 0.72 },
  { x: -180, y: 16,  rotate: 20,  scale: 1.04, opacity: 0.74 },
  { x: 320,  y: -16, rotate: -22, scale: 0.90, opacity: 0.68 },
  { x: 420,  y: 15,  rotate: 16,  scale: 1.04, opacity: 0.65 },

  // "something" (9 chars: s, o, m, e, t, h, i, n, g)
  { x: -380, y: -16, rotate: -26, scale: 0.94, opacity: 0.68 },
  { x: 180,  y: 14,  rotate: 15,  scale: 1.08, opacity: 0.72 },
  { x: -120, y: -12, rotate: -18, scale: 0.92, opacity: 0.75 },
  { x: 40,   y: 18,  rotate: 22,  scale: 1.02, opacity: 0.72 },
  { x: 180,  y: -14, rotate: -20, scale: 0.94, opacity: 0.74 },
  { x: 320,  y: 16,  rotate: 16,  scale: 1.04, opacity: 0.70 },
  { x: 290,  y: -12, rotate: -12, scale: 0.96, opacity: 0.75 },
  { x: -280, y: 15,  rotate: 20,  scale: 1.05, opacity: 0.70 },
  { x: 380,  y: -15, rotate: -24, scale: 0.92, opacity: 0.68 },

  // "Great." (6 chars: G, r, e, a, t, .)
  { x: -260, y: 16,  rotate: -20, scale: 1.06, opacity: 0.72 },
  { x: -50,  y: -16, rotate: 14,  scale: 0.95, opacity: 0.74 },
  { x: 120,  y: 14,  rotate: -16, scale: 1.04, opacity: 0.72 },
  { x: 110,  y: -12, rotate: 20,  scale: 0.94, opacity: 0.72 },
  { x: 290,  y: 15,  rotate: -24, scale: 1.04, opacity: 0.70 },
  { x: 410,  y: -14, rotate: 26,  scale: 1.10, opacity: 0.65 },
];

interface FooterProps {
  activeRoute?: RouteKey;
  isHome?: boolean;
}

export const Footer: React.FC<FooterProps> = ({ activeRoute, isHome = false }) => {
  const { profile } = usePortfolio();
  const [copied, setCopied] = useState(false);
  const footerRef = useRef<HTMLElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const targetEmail = profile.email || EMAIL;
  const displayName = profile.displayName || DISPLAY_NAME;
  const socialLinks = profile.socialLinks || SOCIAL_LINKS;

  // Independent intersection observers:
  // - actionsRef triggers when buttons enter viewport
  // - bottomRef triggers when social links & bottom bar enter viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
          } else {
            entry.target.classList.remove('is-revealed');
          }
        });
      },
      {
        threshold: 0.05,
        rootMargin: '0px 0px -15px 0px'
      }
    );

    if (actionsRef.current) observer.observe(actionsRef.current);
    if (bottomRef.current) observer.observe(bottomRef.current);

    return () => {
      observer.disconnect();
    };
  }, [activeRoute, isHome]);

  // GSAP scroll-driven kinetic typography assembly for "Let's Build something Great."
  useEffect(() => {
    const footerEl = footerRef.current;
    if (!footerEl) return;

    // Respect reduced motion preferences
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const letters = footerEl.querySelectorAll<HTMLElement>('.scatter-letter');
    if (!letters.length) return;

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 120);

    const ctx = gsap.context(() => {
      // Dynamic responsiveness: scale scatter distance according to screen width
      const getFactorX = () => Math.min(1, Math.max(0.25, window.innerWidth / 1150));
      const getFactorY = () => (window.innerWidth <= 768 ? 0.35 : Math.min(0.85, window.innerWidth / 1150));

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: footerEl,
          start: 'top 95%',
          end: 'top 45%',
          scrub: 1.2,
          invalidateOnRefresh: true
        }
      });

      // All letters animate together simultaneously:
      letters.forEach((el, index) => {
        const cfg = SCATTER_PRESETS[index % SCATTER_PRESETS.length];

        tl.fromTo(
          el,
          {
            x: () => cfg.x * getFactorX(),
            y: () => cfg.y * getFactorY(),
            rotation: cfg.rotate,
            scale: cfg.scale,
            opacity: cfg.opacity,
            force3D: true
          },
          {
            x: 0,
            y: 0,
            rotation: 0,
            scale: 1,
            opacity: 1,
            ease: 'power2.out',
            duration: 1,
            force3D: true
          },
          0
        );
      });
    }, footerEl);

    return () => {
      clearTimeout(timer);
      ctx.revert();
    };
  }, [activeRoute, isHome]);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(targetEmail);
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    }
  };

  // Filter out Springer Paper specifically for the footer section (LinkedIn, GitHub, WhatsApp)
  const footerSocialLinks = socialLinks.filter(
    ([label]) => !label.toLowerCase().includes('springer')
  );

  return (
    <>
      {/* Architectural Footer (Present across all pages) */}
      <footer ref={footerRef} className="architectural-footer" aria-labelledby="footer-cta-title">
        <div className="wrap footer-cta-content">
          <GlassWords as="h2" id="footer-cta-title" className="footer-headline" scatter>
            Let's Build <br className="hidden-mobile" />
            <span className="footer-serif-accent">something</span> <br />
            Great.
          </GlassWords>

          <div ref={actionsRef} className="footer-actions">
            <a
              href={`mailto:${targetEmail}`}
              className="footer-btn footer-btn-primary footer-anim-left"
            >
              <span>Send Email Directly</span>
            </a>
            <button
              type="button"
              onClick={handleCopyEmail}
              className="footer-btn footer-btn-secondary footer-anim-right"
              aria-label="Copy email address"
            >
              {copied ? <Check size={18} /> : <Copy size={18} />}
              <span>{copied ? 'Email Copied!' : 'Copy Email'}</span>
            </button>
          </div>

          <div ref={bottomRef} className="footer-bottom-section">
            <div className="footer-social-row footer-anim-fade">
              {footerSocialLinks.map(([label, href]) => (
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

            <div className="footer-bottom-bar mono footer-anim-fade">
              <GlassWords as="span">© 2026 {displayName.toUpperCase()} • ALL RIGHTS RESERVED</GlassWords>
              <GlassWords as="span" className="footer-location-tag">DHAKA, BANGLADESH · UTC+6</GlassWords>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};
