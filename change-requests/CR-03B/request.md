# CR-03B: Reusable Star Rating & Review Badge Component Library

## 1. Title
# CR-03B: Reusable Star Rating & Review Badge Component Library

## 2. Description
Consumer trust in luxury retail hinges on social proof. Marketplaces like Apple, Nordstrom, and Tiffany & Co. present customer ratings through accessible, visually refined star icons and review count badges. In many legacy codebases, ratings are output as raw strings (e.g. "4.2 stars (18 reviews)"), creating poor visual aesthetics and zero keyboard accessibility.

Developing a modular UI component library requires designing reusable primitives with customizable sizes, color tokens, and full ARIA accessibility attributes.

By the end of this Change Request, you will be able to:
- Construct reusable, accessible UI component primitives in TypeScript.
- Implement optional props with clean default parameter values.
- Meet WCAG 2.1 AA screen-reader standards for rating presentations.

## 3. Topic Coverage
### React & TypeScript Concepts
- Optional props with default values (`maxStars = 5`)
- Union prop types for sizing (`size?: "sm" | "md" | "lg"`)
- React.ReactNode children composition

### Design Patterns & UI Architecture
- Reusable UI Library Architecture
- Presentational Primitive Pattern
- Accessible ARIA Widget Pattern

### Domain & UX Concepts
- Visual luxury social proof
- Screen reader rating announcements
- Responsive component sizing

## 4. Steps to Run the Activity
1. **Navigate to workspace**:
   ```bash
   cd c:\Users\DELL\Downloads\SHOPSPHERE\shopsphere-trainee
   ```
2. **Verify dependencies**:
   ```bash
   npm install
   ```
3. **Start local development server**:
   ```bash
   npm run dev
   ```
4. **Execute specific test suite**:
   ```bash
   npm test -- src/test/Button.test.tsx
   ```
5. **View in browser**:
   Navigate to `http://localhost:3000` to test the interactive feature live.

## 5. Target Files, Components, Hooks & APIs
| Type | Name | File Path | Status | Notes |
| :---: | :--- | :--- | :---: | :--- |
| COMPONENT | `StarRating` | `src/components/ui/StarRating.tsx` | **NEW** | Accessible 5-star visual rating component |
| STYLE | `StarRating.css` | `src/components/ui/StarRating.css` | **NEW** | Luxury gold star styling and size variations |
| COMPONENT | `ReviewBadge` | `src/components/ui/ReviewBadge.tsx` | **NEW** | Formatted review count badge component |

## 6. Step-by-Step Instructions of Implementation
### STEP 1: Author StarRatingProps Interface
- **Where:** `src/components/ui/StarRating.tsx -> StarRatingProps`
- **What:** Define props: rating (number), maxStars?: number, size?: "sm" | "md" | "lg", and interactive?: boolean.
- **Why:** Provides flexibility across small card views and large hero detail pages.
- **Hint:** Default maxStars to 5 and size to "md".

### STEP 2: Implement Star Rendering with SVG Icons
- **Where:** `src/components/ui/StarRating.tsx -> StarRating`
- **What:** Map over array of maxStars, rendering filled, half-filled, or empty star icons based on rating.
- **Why:** Eliminates brittle character glyphs and ensures pixel-perfect vector rendering.
- **Hint:** Use aria-label="Rated X out of Y stars" on the container with role="img".

### STEP 3: Build ReviewBadge Companion Component
- **Where:** `src/components/ui/ReviewBadge.tsx -> ReviewBadge`
- **What:** Create a component that displays rating number and parenthesized review count (e.g. "4.8 ★ (124 reviews)").
- **Why:** Encapsulates social proof formatting across cards and detail pages.
- **Hint:** Accept count (number) and optional verifiedOnly (boolean).


## 7. Acceptance Criteria
- [ ] StarRating renders exact number of filled and empty stars according to score
- [ ] Container has role="img" and descriptive aria-label for screen readers
- [ ] Supports sm, md, and lg size tokens cleanly
- [ ] TypeScript compiles without errors or any types

## 8. Expected Output & Visual Evidence
### Vitest / React Testing Library Output
```text
 RUN  v2.1.9 C:/Users/DELL/Downloads/SHOPSPHERE/shopsphere-trainee

 ✓ src/test/Button.test.tsx (3 tests) 180ms
   ✓ Reusable Star Rating & Review Badge Component Library > renders successfully with valid contracts
   ✓ Reusable Star Rating & Review Badge Component Library > handles edge cases and boundary conditions
   ✓ Reusable Star Rating & Review Badge Component Library > enforces accessibility attributes and keyboard interactions

 Test Files  1 passed (1)
      Tests  3 passed (3)
   Duration  420ms
```

### UI Interaction State Matrix
| User Action / Trigger | UI Element | Expected Behavior / Visual Change |
| :--- | :--- | :--- |
| Render rating=3.5 | `<StarRating rating={3.5} />` | Displays 3 filled stars, 1 half star, 1 empty star |
| Inspect DOM with screen reader | `StarRating container` | Reads "Rated 3.5 out of 5 stars" |

## 9. How to Run the Commands
Consolidated cheat sheet for rapid verification:
- **Dev Server**: `npm run dev`
- **Run All Tests**: `npm test -- --run`
- **Targeted Test**: `npm test -- src/test/Button.test.tsx`
- **Type Check**: `npx tsc --noEmit`
- **Production Build**: `npm run build`
