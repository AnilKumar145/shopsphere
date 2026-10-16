/**
 * ============================================================================
 * 🎓 TRAINEE EXERCISE: CR-12C — Generic Table Primitive (GenericTable<T>)
 * Module 12: Advanced Component Patterns (Units 12.1, 12.2)
 * ----------------------------------------------------------------------------
 * 🎯 Objective: Author a reusable generic table component with type-safe
 *    column definitions, accessor keys, and custom cell renderers.
 * 📁 Reference: shopsphere-solution/src/components/ui/GenericTable.tsx
 * ============================================================================
 */

/**
 * Reusable Generic Table Component
 * Demonstrates 2.7 (Generics), 3.5 (Reusable Tables), 12.2 (Generic Components: Generic Props, Type Parameters), 15.5
 */

import React, { ReactNode } from 'react';
import './GenericTable.css';

export interface ColumnDefinition<T> {
  key: string;
  header: string;
  render?: (item: T, index: number) => ReactNode;
  width?: string;
  align?: 'left' | 'center' | 'right';
}

export interface GenericTableProps<T> {
  data: readonly T[];
  columns: readonly ColumnDefinition<T>[];
  keyExtractor: (item: T, index: number) => string | number;
  emptyMessage?: string;
  className?: string;
}

export function GenericTable<T>({
  data,
  columns,
  keyExtractor,
  emptyMessage = 'No data available to display.',
  className = '',
}: GenericTableProps<T>): React.JSX.Element {
  if (data.length === 0) {
    return (
      <div className="ui-table__empty">
        <p>{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className={`ui-table-container ${className}`}>
      <table className="ui-table">
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                style={{ width: col.width, textAlign: col.align || 'left' }}
                className="ui-table__th"
                scope="col"
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => {
            const rowKey = keyExtractor(item, index);
            return (
              <tr key={rowKey} className="ui-table__tr">
                {columns.map((col) => {
                  const cellContent = col.render
                    ? col.render(item, index)
                    : (item as Record<string, unknown>)[col.key] !== undefined
                    ? String((item as Record<string, unknown>)[col.key])
                    : null;

                  return (
                    <td
                      key={col.key}
                      style={{ textAlign: col.align || 'left' }}
                      className="ui-table__td"
                    >
                      {cellContent}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
