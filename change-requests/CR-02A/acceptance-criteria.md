# Acceptance Criteria: CR-02A — Multi-Currency Union Types & Pure Conversion Utilities

## Criteria Checklist
### AC-1: Define CurrencyCode = "USD" | "EUR" | "GBP" | "JPY"
- **Verification**: Ensure unit tests assert this behavior.
- **Pass Condition**: Behavior operates cleanly without regressions.

### AC-2: Implement convertCurrency(amount, from, to) with strict return typing
- **Verification**: Ensure unit tests assert this behavior.
- **Pass Condition**: Behavior operates cleanly without regressions.

### AC-3: Exhaustive switch/narrowing on currency codes with zero any types
- **Verification**: Ensure unit tests assert this behavior.
- **Pass Condition**: Behavior operates cleanly without regressions.


## Non-Functional Requirements
- **Strict TypeScript**: Zero `any` annotations across all modified files.
- **Accessibility**: Meets WCAG 2.1 AA keyboard navigation and focus management.
- **Independence**: Fully implementable from the golden baseline without dependencies on other CRs.
