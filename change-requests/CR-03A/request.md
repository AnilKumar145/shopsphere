# CR-03A: Parent-to-Child Props Flow & Multi-Level Catalog Hierarchy

## 1. Title
# CR-03A: Parent-to-Child Props Flow & Multi-Level Catalog Hierarchy

## 2. Description
Modern shopping experiences like Shopify storefronts require deep component composition where catalog pages delegate rendering to toolbars, product lists, and individual card tiles. A common architectural antipattern is passing unstructured props or relying on global state for simple parent-to-child data delegation.

By adhering to strict component hierarchy principles, parent container pages manage filtering and data fetching, while child presentation components receive data and event callbacks via explicit, strongly typed prop contracts.

By the end of this Change Request, you will be able to:
- Design clean parent-to-child component hierarchies with explicit prop contracts.
- Pass action callbacks across component boundaries without type leaks or prop drilling.
- Structure presentation components with strict TypeScript `React.FC` or function signatures.

## 3. Topic Coverage
### React & TypeScript Concepts
- Component Props Interfaces and typing
- Callback function prop typing (`(id: number) => void`)
- Children props and component composition

### Design Patterns & UI Architecture
- Container / Presentational Component Pattern
- Unidirectional Data Flow
- Event Callback Delegation

### Domain & UX Concepts
- Seamless user interaction flow
- Predictable visual feedback on click actions
- Consistent product card actions

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
| COMPONENT | `ProductListPage` | `src/pages/ProductListPage.tsx` | **UPDATE** | Parent container coordinating catalog state and handlers |
| COMPONENT | `ProductCard` | `src/features/catalog/components/ProductCard.tsx` | **UPDATE** | Child card receiving product model and callback props |
| COMPONENT | `ProductViewToggle` | `src/components/catalog/ProductViewToggle.tsx` | **NEW** | Child toolbar toggle receiving mode and change callback |

## 6. Step-by-Step Instructions of Implementation
### STEP 1: Define ProductViewToggleProps Interface
- **Where:** `src/components/catalog/ProductViewToggle.tsx -> ProductViewToggleProps`
- **What:** Define props interface with mode: "grid" | "list" and onChange: (mode: "grid" | "list") => void.
- **Why:** Guarantees the toggle component remains purely presentational and reusable.
- **Hint:** Export the interface so parent components can import it if needed.

### STEP 2: Extend ProductCardProps with Quick View Callback
- **Where:** `src/features/catalog/components/ProductCard.tsx -> ProductCardProps`
- **What:** Add optional onQuickView?: (product: Product) => void callback to ProductCardProps.
- **Why:** Allows parent catalog to intercept click events and render the modal dialog.
- **Hint:** Use optional chaining when invoking onQuickView?.(product).

### STEP 3: Wire Callbacks in ProductListPage
- **Where:** `src/pages/ProductListPage.tsx -> ProductListPage`
- **What:** Pass state and handlers down to ProductViewToggle and ProductCard elements.
- **Why:** Centralizes catalog state in the parent container.
- **Hint:** Pass setViewMode to onChange and openModal to onQuickView.


## 7. Acceptance Criteria
- [ ] ProductViewToggle renders both grid and list buttons with active states
- [ ] Clicking a toggle button triggers parent onChange callback with selected mode
- [ ] ProductCard triggers onQuickView when the quick view action button is clicked
- [ ] All tests in ProductViewToggle.test.tsx pass cleanly

## 8. Expected Output & Visual Evidence
### Vitest / React Testing Library Output
```text
 RUN  v2.1.9 C:/Users/DELL/Downloads/SHOPSPHERE/shopsphere-trainee

 ✓ src/test/ProductViewToggle.test.tsx (3 tests) 180ms
   ✓ Parent-to-Child Props Flow & Multi-Level Catalog Hierarchy > renders successfully with valid contracts
   ✓ Parent-to-Child Props Flow & Multi-Level Catalog Hierarchy > handles edge cases and boundary conditions
   ✓ Parent-to-Child Props Flow & Multi-Level Catalog Hierarchy > enforces accessibility attributes and keyboard interactions

 Test Files  1 passed (1)
      Tests  3 passed (3)
   Duration  420ms
```

### UI Interaction State Matrix
| User Action / Trigger | UI Element | Expected Behavior / Visual Change |
| :--- | :--- | :--- |
| Click List view button | `ProductViewToggle` | Parent viewMode updates to "list" and UI updates |
| Click Quick View icon on ProductCard | `ProductCard` | Parent handles product selection and opens modal |

## 9. How to Run the Commands
Consolidated cheat sheet for rapid verification:
- **Dev Server**: `npm run dev`
- **Run All Tests**: `npm test -- --run`
- **Targeted Test**: `npm test -- src/test/ProductViewToggle.test.tsx`
- **Type Check**: `npx tsc --noEmit`
- **Production Build**: `npm run build`
