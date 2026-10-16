# Acceptance Criteria: CR-11C — Client-Side Security Sanitization (XSS Stripping & Card Masking)

## Criteria Checklist
### AC-1: sanitizeInput(text) utility stripping HTML script tags and javascript: URIs
- **Verification**: Ensure unit tests assert this behavior.
- **Pass Condition**: Behavior operates cleanly without regressions.

### AC-2: maskCardNumber(pan) displaying only last 4 digits (e.g. •••• •••• •••• 4242)
- **Verification**: Ensure unit tests assert this behavior.
- **Pass Condition**: Behavior operates cleanly without regressions.

### AC-3: clearSecureSession() securely wiping sensitive credentials on logout
- **Verification**: Ensure unit tests assert this behavior.
- **Pass Condition**: Behavior operates cleanly without regressions.


## Non-Functional Requirements
- **Strict TypeScript**: Zero `any` annotations across all modified files.
- **Accessibility**: Meets WCAG 2.1 AA keyboard navigation and focus management.
- **Independence**: Fully implementable from the golden baseline without dependencies on other CRs.
