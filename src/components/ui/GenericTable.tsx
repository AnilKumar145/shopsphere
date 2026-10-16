/**
 * ============================================================================
 * 🎓 TRAINEE EXERCISE: CR-12C — Reusable Generic Data Table Component
 * Module 12: Advanced Component Design Patterns (Units 12.2, 12.3)
 * ----------------------------------------------------------------------------
 * 🎯 Objective: Create a type-safe generic table component accepting dynamic
 *    columns, data rows, custom cell renderers, and empty state fallbacks.
 * 📖 Reference Spec: change-requests/CR-12C/request.md
 * 🌟 Golden Solution: shopsphere-solution/src/components/ui/GenericTable.tsx
 * ============================================================================
 */

import type { ReactNode } from 'react';
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

/**
 * 📝 STEP 1: Table Header Generation
 * 📝 STEP 2: Row and Column Data Mapping
 * 📝 STEP 3: Empty State Handling
 */
export function GenericTable<T>({
  data,
  columns,
  keyExtractor,
  emptyMessage = 'No records found matching your criteria.',
  className = '',
}: GenericTableProps<T>) {
  // TODO: [STUDENT IMPLEMENTATION REQUIRED]
  if (data.length === 0) {
    return (
      <div className={`table-empty-container ${className}`}>
        <p className="table-empty-text">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className={`generic-table-wrapper ${className}`}>
      <table className="generic-table">
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                style={{ width: col.width, textAlign: col.align || 'left' }}
                className="generic-th"
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={keyExtractor(item, index)} className="generic-tr">
              {columns.map((col) => (
                <td
                  key={col.key}
                  style={{ textAlign: col.align || 'left' }}
                  className="generic-td"
                >
                  {col.render ? col.render(item, index) : (item as any)[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
