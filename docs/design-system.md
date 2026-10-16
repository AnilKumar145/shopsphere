# ShopSphere — Design System Specification

## 1. Visual Personality & Editorial Philosophy

ShopSphere is designed as a contemporary editorial commerce experience. Rather than relying on generic modern dashboard conventions (such as excessive glassmorphism, loud three-stop gradients, and oversized rounded pill cards), ShopSphere employs:

- **Warm Editorial Palette**: A warm ivory and bone foundation (`#fcfbf9`, `#f5f2eb`) combined with deep ink charcoal typography (`#111827`) and deliberate burnt terracotta accents (`#c2613c`).
- **Typographic Hierarchy**: Distinctive editorial pairing combining serif display headlines (*Newsreader*) for collection titles with crisp, high-legibility geometric sans-serif body (*Plus Jakarta Sans*).
- **Restrained Elevation**: Soft, non-muddy layered drop shadows (`--shadow-sm`, `--shadow-md`, `--shadow-lg`) providing subtle surface depth.
- **Micro-Interactions**: Predictable, responsive hover feedback (subtle 1-4px transforms, background color transitions, active focus rings).

---

## 2. Core Design Tokens (`src/styles/tokens.css`)

### Color Tokens

```css
/* Brand Foundation */
--color-primary: #111827;         /* Deep ink charcoal */
--color-primary-hover: #1f2937;
--color-accent: #c2613c;          /* Warm terracotta / burnt sienna */
--color-accent-hover: #a84f2d;
--color-accent-light: #fbeee9;
--color-accent-subtle: #f6e3dc;

/* Surfaces */
--color-bg-main: #fcfbf9;         /* Warm ivory */
--color-bg-surface: #ffffff;      /* Card surface */
--color-bg-subtle: #f5f2eb;       /* Soft oat cream */
--color-bg-muted: #eeebd9;        /* Warm bone */

/* Semantic States */
--color-success: #15803d;
--color-success-bg: #f0fdf4;
--color-error: #b91c1c;
--color-error-bg: #fef2f2;
--color-warning: #b45309;
--color-warning-bg: #fffbeb;
```

### Typography Scale

- **Display Serif Font**: `'Newsreader', Georgia, serif`
- **UI Sans Font**: `'Plus Jakarta Sans', -apple-system, sans-serif`
- **Scale**:
  - `--text-xs`: `0.75rem` (12px)
  - `--text-sm`: `0.84375rem` (13.5px)
  - `--text-base`: `0.9375rem` (15px)
  - `--text-md`: `1.0625rem` (17px)
  - `--text-lg`: `1.1875rem` (19px)
  - `--text-xl`: `1.375rem` (22px)
  - `--text-2xl`: `1.75rem` (28px)
  - `--text-3xl`: `2.25rem` (36px)
  - `--text-4xl`: `3.0rem` (48px)

### Spacing Scale

Based on an 8-point harmonic rhythm:
`4px (space-1)`, `8px (space-2)`, `12px (space-3)`, `16px (space-4)`, `20px (space-5)`, `24px (space-6)`, `32px (space-8)`, `40px (space-10)`, `48px (space-12)`, `64px (space-16)`, `80px (space-20)`, `96px (space-24)`.

---

## 3. UI Component Primitives

1. **Button (`Button.tsx`)**:
   - Variants: `primary`, `secondary`, `outline`, `ghost`, `accent`, `danger`.
   - Sizes: `sm` (36px), `md` (44px), `lg` (52px).
   - States: `isLoading` (with accessible spinner), disabled, hover, active, focus-visible.
2. **Form Controls (`Input.tsx`, `Select.tsx`)**:
   - Unique IDs generated via `useId`.
   - Associated `<label>`, helper text, and `role="alert"` field error announcements.
3. **Modal Portal (`Modal.tsx`)**:
   - Accessible React Portal rendering into `document.body`.
   - Backdrop click dismissal, Escape keyboard listener, body scroll lock.
4. **Generic Table (`GenericTable.tsx`)**:
   - Fully generic type parameter `<T>` for displaying tabular data (Order History, etc.).
5. **Compound Accordion (`Accordion.tsx`)**:
   - Subcomponents: `Accordion.Item`, `Accordion.Header`, `Accordion.Body`.
   - Handles product material details, shipping information, and care instructions.
6. **Toast Container (`ToastContainer.tsx`)**:
   - Live region (`aria-live="polite"`) connected to Redux Toolkit for automatic notification dismissal.

---

## 4. Accessibility Standards & Reduced Motion

- **Focus Indicators**: High-contrast outline (`2px solid var(--color-accent)`) with `2px` offset on all interactive elements via `:focus-visible`.
- **Keyboard Navigation**: Full keyboard navigation across menus, modals (Escape key), and quantity steppers.
- **Motion Reduction**: Comprehensive `@media (prefers-reduced-motion: reduce)` media query resetting animation durations to `0.01ms`.
