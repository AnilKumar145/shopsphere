/**
 * Sets the document head title dynamically
 * Demonstrates 7.2 useEffect & accessibility/SEO best practices
 */

import { useEffect } from 'react';

export function useDocumentTitle(title: string): void {
  useEffect(() => {
    const originalTitle = document.title;
    document.title = title ? `${title} | ShopSphere` : 'ShopSphere — Curated Contemporary Retail';

    return () => {
      document.title = originalTitle;
    };
  }, [title]);
}
