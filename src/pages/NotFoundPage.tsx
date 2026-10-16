/**
 * Not Found / 404 Route
 * Demonstrates 8.8 Route Error Handling (Not Found Pages)
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, ArrowRight } from 'lucide-react';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export const NotFoundPage: React.FC = () => {
  useDocumentTitle('Page Not Found');

  return (
    <div className="container" style={{ padding: '8rem 1.5rem', textAlign: 'center' }}>
      <div
        style={{
          display: 'inline-flex',
          padding: '1rem',
          borderRadius: '50%',
          backgroundColor: 'var(--color-bg-subtle)',
          color: 'var(--color-accent)',
          marginBottom: '1.5rem',
        }}
      >
        <Compass size={48} />
      </div>

      <span className="section-eyebrow">404 Error</span>
      <h1
        style={{
          fontSize: 'var(--text-3xl)',
          fontFamily: 'var(--font-serif)',
          margin: '0.5rem 0 1rem',
        }}
      >
        This Curated Page Does Not Exist
      </h1>
      <p
        style={{
          maxWidth: '480px',
          margin: '0 auto 2rem',
          color: 'var(--color-text-secondary)',
          lineHeight: 'var(--leading-relaxed)',
        }}
      >
        The link you followed may be outdated, or the piece may have moved to an alternative collection archive.
      </p>

      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
        <Link to="/" className="ui-button ui-button--primary ui-button--lg">
          <span>Return Home</span>
        </Link>
        <Link to="/products" className="ui-button ui-button--outline ui-button--lg">
          <span>Explore Catalog</span>
          <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
};
