import React from 'react';
import { PageHeader } from './PageHeader';
import { ContactRibbon } from './ContactRibbon';
import { PHONE, WHATSAPP, LOCATION } from '../data/portfolioData';
import { usePortfolio } from '../context/PortfolioContext';

export const ContactsPage: React.FC = () => {
  const { profile } = usePortfolio();
  const phone = profile.phone || PHONE;
  const whatsapp = profile.whatsapp || WHATSAPP;
  const location = profile.location || LOCATION;
  const composeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${profile.email || 'mdnasifurahman@gmail.com'}`;

  return (
    <>
      <PageHeader
        kicker="Contact"
        title={
          <>
            Let’s build something <em>impactful.</em>
          </>
        }
      >
        <p>
          I’m open to software engineering roles, backend consulting, full-stack client projects, and machine learning research collaborations. Reach out directly via email, phone, or WhatsApp.
        </p>
      </PageHeader>

      <section className="contact-page wrap" aria-labelledby="contact-details-title">
        <div className="contact-invitation">
          <div>
            <p className="kicker">Direct Channels</p>
            <h2 id="contact-details-title">
              Software engineering, backend architecture, and technical consulting.
            </h2>
          </div>
          <p>
            Whether you need a robust backend API, full-stack application development, or want to discuss machine learning research, I am always happy to connect.
          </p>
        </div>

        <ContactRibbon className="contact-page-links" />

        <div className="contact-cards-grid">
          <div className="contact-direct-card">
            <span className="mono contact-card-label">Direct Phone</span>
            <p className="contact-card-val">
              <a href={`tel:${phone}`}>{phone}</a>
            </p>
          </div>

          <div className="contact-direct-card">
            <span className="mono contact-card-label">WhatsApp</span>
            <p className="contact-card-val">
              <a href={whatsapp} target="_blank" rel="noopener noreferrer">{phone} ↗</a>
            </p>
          </div>

          <div className="contact-direct-card">
            <span className="mono contact-card-label">Location</span>
            <p className="contact-card-val">
              {location}
            </p>
          </div>
        </div>

        <div className="contact-map-frame">
          <iframe
            src="https://www.google.com/maps?q=Dhaka+Bangladesh&output=embed"
            width="100%"
            height="320"
            style={{ border: 0, display: 'block' }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Location Map"
          />
        </div>

        <div className="contact-action-row">
          <a
            className="footer-btn footer-btn-primary"
            href={composeUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>Send an Email Directly ↗</span>
          </a>
        </div>
      </section>
    </>
  );
};
