import React from 'react';
import { PageHeader } from './PageHeader';
import { ContactRibbon } from './ContactRibbon';
import { PHONE, WHATSAPP, LOCATION, GMAIL_COMPOSE_URL } from '../data/portfolioData';

export const ContactsPage: React.FC = () => {
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
            <p className="kicker">§ Direct Channels</p>
            <h2 id="contact-details-title">
              Software engineering, backend architecture, and technical consulting.
            </h2>
          </div>
          <p>
            Whether you need a robust backend API, full-stack application development, or want to discuss machine learning research, I am always happy to connect.
          </p>
        </div>

        <ContactRibbon className="contact-page-links" />

        <div style={{ marginTop: '2.5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
          <div style={{ padding: '1.5rem', background: 'var(--paper-2)', border: '1px solid var(--rule)', borderRadius: '4px' }}>
            <span className="mono" style={{ fontSize: '12px', textTransform: 'uppercase', color: 'var(--mid)', letterSpacing: '0.1em' }}>Direct Phone</span>
            <p style={{ marginTop: '0.5rem', fontWeight: 600, fontSize: '18px' }}>
              <a href={`tel:${PHONE}`}>{PHONE}</a>
            </p>
          </div>

          <div style={{ padding: '1.5rem', background: 'var(--paper-2)', border: '1px solid var(--rule)', borderRadius: '4px' }}>
            <span className="mono" style={{ fontSize: '12px', textTransform: 'uppercase', color: 'var(--mid)', letterSpacing: '0.1em' }}>WhatsApp</span>
            <p style={{ marginTop: '0.5rem', fontWeight: 600, fontSize: '18px' }}>
              <a href={WHATSAPP} target="_blank" rel="noopener noreferrer">01798552909 ↗</a>
            </p>
          </div>

          <div style={{ padding: '1.5rem', background: 'var(--paper-2)', border: '1px solid var(--rule)', borderRadius: '4px' }}>
            <span className="mono" style={{ fontSize: '12px', textTransform: 'uppercase', color: 'var(--mid)', letterSpacing: '0.1em' }}>Location</span>
            <p style={{ marginTop: '0.5rem', fontWeight: 600, fontSize: '18px' }}>
              {LOCATION}
            </p>
          </div>
        </div>

        <div style={{ marginTop: '2.5rem', borderRadius: '4px', overflow: 'hidden', border: '1px solid var(--rule)' }}>
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

        <div style={{ marginTop: '2rem' }}>
          <a
            className="primary-link"
            href={GMAIL_COMPOSE_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            Send an Email <span aria-hidden="true">↗</span>
          </a>
        </div>
      </section>
    </>
  );
};
