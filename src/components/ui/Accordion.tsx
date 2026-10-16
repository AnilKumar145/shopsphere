/**
 * Compound Component Pattern: Accordion
 * Demonstrates 12.3 Compound Components: Compound Component Pattern, Shared Context, Type-Safe Composition
 */

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ChevronDown } from 'lucide-react';
import './Accordion.css';

interface AccordionContextValue {
  expandedIds: string[];
  toggleItem: (id: string) => void;
  allowMultiple?: boolean;
}

const AccordionContext = createContext<AccordionContextValue | undefined>(undefined);

export interface AccordionProps {
  children: ReactNode;
  allowMultiple?: boolean;
  defaultExpanded?: string[];
  className?: string;
}

export function Accordion({
  children,
  allowMultiple = false,
  defaultExpanded = [],
  className = '',
}: AccordionProps): React.JSX.Element {
  const [expandedIds, setExpandedIds] = useState<string[]>(defaultExpanded);

  const toggleItem = (id: string) => {
    setExpandedIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      }
      return allowMultiple ? [...prev, id] : [id];
    });
  };

  return (
    <AccordionContext.Provider value={{ expandedIds, toggleItem, allowMultiple }}>
      <div className={`ui-accordion ${className}`}>{children}</div>
    </AccordionContext.Provider>
  );
}

// Subcomponent: AccordionItem
interface AccordionItemProps {
  id: string;
  children: ReactNode;
  className?: string;
}

export function AccordionItem({ id, children, className = '' }: AccordionItemProps): React.JSX.Element {
  return (
    <div className={`ui-accordion__item ${className}`} data-item-id={id}>
      {children}
    </div>
  );
}

// Subcomponent: AccordionHeader
interface AccordionHeaderProps {
  itemId: string;
  children: ReactNode;
  className?: string;
}

export function AccordionHeader({ itemId, children, className = '' }: AccordionHeaderProps): React.JSX.Element {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error('AccordionHeader must be used within an Accordion component');
  }

  const isExpanded = context.expandedIds.includes(itemId);

  return (
    <button
      type="button"
      className={`ui-accordion__header ${isExpanded ? 'ui-accordion__header--expanded' : ''} ${className}`}
      onClick={() => context.toggleItem(itemId)}
      aria-expanded={isExpanded}
    >
      <span className="ui-accordion__title">{children}</span>
      <ChevronDown
        className={`ui-accordion__chevron ${isExpanded ? 'ui-accordion__chevron--expanded' : ''}`}
        size={18}
      />
    </button>
  );
}

// Subcomponent: AccordionBody
interface AccordionBodyProps {
  itemId: string;
  children: ReactNode;
  className?: string;
}

export function AccordionBody({ itemId, children, className = '' }: AccordionBodyProps): React.JSX.Element | null {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error('AccordionBody must be used within an Accordion component');
  }

  const isExpanded = context.expandedIds.includes(itemId);
  if (!isExpanded) return null;

  return (
    <div className={`ui-accordion__body ${className}`} role="region">
      {children}
    </div>
  );
}

// Attach compound subcomponents to main Accordion component
Accordion.Item = AccordionItem;
Accordion.Header = AccordionHeader;
Accordion.Body = AccordionBody;
