# CR-04B: Dual-Mode Catalog List/Grid Rendering & Responsive ProductRow

## 1. Title
# CR-04B: Dual-Mode Catalog List/Grid Rendering & Responsive ProductRow

## 2. Description
In large luxury merchandise catalogs, shoppers have differing browsing habits. Visual browsers prefer multi-column grid cards to scan photography, whereas detail-oriented shoppers prefer horizontal list views that surface dimensions, ratings, and immediate action buttons.

Frontend developers must support dynamic layout toggles without duplicating data fetching logic or introducing layout jitter when switching views.

By the end of this Change Request, you will be able to:
- Implement dynamic layout switching between multi-column grid and single-column list views.
- Build responsive horizontal card rows with strict TypeScript prop contracts.
- Maintain smooth 60fps responsive reflow across mobile and desktop breakpoints.

## 3. Topic Coverage
### React & TypeScript Concepts
- Discriminated layout union (`"grid" | "list"`)
- Component prop sharing
- Responsive CSS media query architecture

### Design Patterns & UI Architecture
- Presenter Component Pattern
- Dual-Mode Rendering Strategy
- Responsive Card Layout

### Domain & UX Concepts
- Customizable browsing experience
- Detailed metadata row presentation
- Instant view switching without page reload

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
   npm test -- src/test/ProductViewToggle.test.tsx
   ```
5. **View in browser**:
   Navigate to `http://localhost:3000` to test the interactive feature live.

## 5. Target Files, Components, Hooks & APIs
| Type | Name | File Path | Status | Notes |
| :---: | :--- | :--- | :---: | :--- |
| COMPONENT | `ProductViewToggle` | `src/components/catalog/ProductViewToggle.tsx` | **NEW** | Grid vs List view switcher toolbar |
| COMPONENT | `ProductListRow` | `src/features/catalog/components/ProductListRow.tsx` | **NEW** | Horizontal row presentation for list mode |
| STYLE | `ProductListRow.css` | `src/features/catalog/components/ProductListRow.css` | **NEW** | Horizontal flexbox styling and responsive collapse |
| PAGE | `ProductListPage` | `src/pages/ProductListPage.tsx` | **UPDATE** | Conditionally render grid or list row container |

## 6. Step-by-Step Instructions of Implementation
### STEP 1: Build ProductViewToggle Component
- **Where:** `src/components/catalog/ProductViewToggle.tsx`
- **What:** Create a grouped button bar with Grid and List SVG icons.
- **Why:** Allows the user to switch layout modes.
- **Hint:** Use aria-pressed to communicate active state.

### STEP 2: Implement ProductListRow Presentation
- **Where:** `src/features/catalog/components/ProductListRow.tsx`
- **What:** Build a horizontal card layout displaying thumbnail, category, title, price, rating, and action buttons.
- **Why:** Optimizes information density for list browsing.
- **Hint:** Use flex-direction: row with responsive wrap on mobile.

### STEP 3: Conditionally Render in ProductListPage
- **Where:** `src/pages/ProductListPage.tsx`
- **What:** Render products.map with ProductCard in grid mode or ProductListRow in list mode.
- **Why:** Shares the filtered product list seamlessly.
- **Hint:** Keep stable keys (product.id) across both view modes.


## 7. Acceptance Criteria
- [ ] ProductViewToggle toggles active state between grid and list
- [ ] List mode renders products horizontally with full metadata and actions
- [ ] Grid mode renders 3-4 column card tiles
- [ ] Vitest tests in ProductViewToggle.test.tsx pass with 100% assertions

## 8. Expected Output & Visual Evidence
### Vitest / React Testing Library Output
```text
 RUN  v2.1.9 C:/Users/DELL/Downloads/SHOPSPHERE/shopsphere-trainee

 ✓ src/test/ProductViewToggle.test.tsx (3 tests) 180ms
   ✓ Dual-Mode Catalog List/Grid Rendering & Responsive ProductRow > renders successfully with valid contracts
   ✓ Dual-Mode Catalog List/Grid Rendering & Responsive ProductRow > handles edge cases and boundary conditions
   ✓ Dual-Mode Catalog List/Grid Rendering & Responsive ProductRow > enforces accessibility attributes and keyboard interactions

 Test Files  1 passed (1)
      Tests  3 passed (3)
   Duration  420ms
```

### UI Interaction State Matrix
| User Action / Trigger | UI Element | Expected Behavior / Visual Change |
| :--- | :--- | :--- |
| Click List View icon | `ProductViewToggle` | Catalog smoothly transitions into horizontal rows |
| Click Grid View icon | `ProductViewToggle` | Catalog restores multi-column card grid |

## 9. How to Run the Commands
Consolidated cheat sheet for rapid verification:
- **Dev Server**: `npm run dev`
- **Run All Tests**: `npm test -- --run`
- **Targeted Test**: `npm test -- src/test/ProductViewToggle.test.tsx`
- **Type Check**: `npx tsc --noEmit`
- **Production Build**: `npm run build`
