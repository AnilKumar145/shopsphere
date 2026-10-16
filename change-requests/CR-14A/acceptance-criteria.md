# Acceptance Criteria: CR-14A — Vitest Unit Tests for Pricing Calculation Engine & Financial Math

## Criteria Checklist
### AC-1: Test volume tier discounts (5% at $100, 10% at $250, 15% at $500)
- **Verification**: Ensure unit tests assert this behavior.
- **Pass Condition**: Behavior operates cleanly without regressions.

### AC-2: Test promotional discount codes (ATELIER20, VIP50) and boundary edge cases
- **Verification**: Ensure unit tests assert this behavior.
- **Pass Condition**: Behavior operates cleanly without regressions.

### AC-3: Test free shipping threshold qualification ($150 cutoff) with 100% assertions passing
- **Verification**: Ensure unit tests assert this behavior.
- **Pass Condition**: Behavior operates cleanly without regressions.


## Non-Functional Requirements
- **Strict TypeScript**: Zero `any` annotations across all modified files.
- **Accessibility**: Meets WCAG 2.1 AA keyboard navigation and focus management.
- **Independence**: Fully implementable from the golden baseline without dependencies on other CRs.
