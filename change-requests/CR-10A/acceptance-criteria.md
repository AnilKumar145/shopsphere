# Acceptance Criteria: CR-10A — Redux Preferences Slice for Multi-Currency & Active Locale

## Criteria Checklist
### AC-1: createSlice with setCurrency action and selectActiveCurrency selector
- **Verification**: Ensure unit tests assert this behavior.
- **Pass Condition**: Behavior operates cleanly without regressions.

### AC-2: Navbar currency dropdown dispatching Redux state change
- **Verification**: Ensure unit tests assert this behavior.
- **Pass Condition**: Behavior operates cleanly without regressions.

### AC-3: Storefront prices dynamically update to active currency symbol and converted rate
- **Verification**: Ensure unit tests assert this behavior.
- **Pass Condition**: Behavior operates cleanly without regressions.


## Non-Functional Requirements
- **Strict TypeScript**: Zero `any` annotations across all modified files.
- **Accessibility**: Meets WCAG 2.1 AA keyboard navigation and focus management.
- **Independence**: Fully implementable from the golden baseline without dependencies on other CRs.
