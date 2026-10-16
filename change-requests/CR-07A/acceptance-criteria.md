# Acceptance Criteria: CR-07A — Custom Hook: useCountdownTimer with Interval Cleanup

## Criteria Checklist
### AC-1: useCountdownTimer(initialSeconds, onExpire) hook with start, pause, and reset methods
- **Verification**: Ensure unit tests assert this behavior.
- **Pass Condition**: Behavior operates cleanly without regressions.

### AC-2: Proper interval cleanup on unmount preventing memory leaks
- **Verification**: Ensure unit tests assert this behavior.
- **Pass Condition**: Behavior operates cleanly without regressions.

### AC-3: Strict TypeScript return tuple/interface with zero any
- **Verification**: Ensure unit tests assert this behavior.
- **Pass Condition**: Behavior operates cleanly without regressions.


## Non-Functional Requirements
- **Strict TypeScript**: Zero `any` annotations across all modified files.
- **Accessibility**: Meets WCAG 2.1 AA keyboard navigation and focus management.
- **Independence**: Fully implementable from the golden baseline without dependencies on other CRs.
