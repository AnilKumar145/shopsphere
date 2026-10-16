# ShopSphere — Testing Strategy & Quality Gates

## 1. Testing Pyramid & Infrastructure

ShopSphere implements automated quality gates across unit, component, integration, and browser interaction layers:

```
          / \
         / E2E \       --> Browser Subagent Journeys (Playwright / Antigravity Browser)
        /-------\
       / Integr. \     --> Routing, CartContext, ProtectedRoute, API Service
      /-----------\
     /  Component  \   --> Button, ProductCard, Modal, Form Controls
    /---------------\
   /   Unit Tests    \ --> Formatters, Cart Calculations, Storage, Custom Hooks
  /-------------------\
```

### Tooling Configuration
- **Test Runner**: [Vitest](https://vitest.dev/) (fast, native ESM support, Vite config integration).
- **DOM Environment**: [jsdom](https://github.com/jsdom/jsdom).
- **Component Testing**: [@testing-library/react](https://testing-library.com/) and `@testing-library/jest-dom`.
- **Browser Automation**: Antigravity Browser Subagent with automated WebP interaction recording.

---

## 2. Automated Test Suites & Evidence

All 7 test suites pass cleanly with 23 automated assertions:

| Test Suite | Module Focus | What Is Validated | Result |
| :--- | :--- | :--- | :---: |
| [`src/test/cartCalculations.test.ts`](file:///c:/Users/DELL/Downloads/FakerStoreAPI/src/test/cartCalculations.test.ts) | 5.7, 14.1, 14.8 | Subtotal calculation, sales tax derivation, free shipping threshold ($75), handling malformed inputs | **4 / 4 Passed** |
| [`src/test/formatters.test.ts`](file:///c:/Users/DELL/Downloads/FakerStoreAPI/src/test/formatters.test.ts) | 2.2, 14.1, 14.8 | Currency formatting ($), date formatting, text truncation, category capitalization | **5 / 5 Passed** |
| [`src/test/useDebounce.test.ts`](file:///c:/Users/DELL/Downloads/FakerStoreAPI/src/test/useDebounce.test.ts) | 7.8, 14.5 | Custom hook asynchronous timer advancement, debounce delay cancellation | **2 / 2 Passed** |
| [`src/test/Button.test.tsx`](file:///c:/Users/DELL/Downloads/FakerStoreAPI/src/test/Button.test.tsx) | 3.5, 14.3, 14.4 | Prop rendering, click event handlers, loading spinner display, variant classes | **4 / 4 Passed** |
| [`src/test/CartContext.test.tsx`](file:///c:/Users/DELL/Downloads/FakerStoreAPI/src/test/CartContext.test.tsx) | 5.4, 5.6, 10.3, 14.5 | Reducer actions: adding items, quantity updates, removal on zero, clearing cart | **3 / 3 Passed** |
| [`src/test/apiService.test.ts`](file:///c:/Users/DELL/Downloads/FakerStoreAPI/src/test/apiService.test.ts) | 9.2, 9.6, 14.6 | Mocking `fetch`, verifying 200 OK responses, fallback recovery, 401 error throws | **3 / 3 Passed** |
| [`src/test/ProtectedRoute.test.tsx`](file:///c:/Users/DELL/Downloads/FakerStoreAPI/src/test/ProtectedRoute.test.tsx) | 8.7, 11.5, 14.7 | MemoryRouter navigation, redirecting unauthenticated users, rendering protected pages | **2 / 2 Passed** |
| **Total** | | **All 7 Test Files** | **23 / 23 Passed** |

---

## 3. End-to-End Customer Journey Verification

The application was exercised via the automated browser subagent against the running server (`http://localhost:3000`):

1. **Storefront Load**: Verified typography, hero section, category tiles, and curated products.
2. **Catalog & Filtering**: Filtered products by category ("Fine Jewelry"), verifying dynamic count updates (4 items).
3. **Product Detail**: Navigated to product `/products/5`, inspected image and specs, increased quantity to 2, and added to bag.
4. **Toast & Bag**: Verified instant toast notification and navbar badge update.
5. **Cart Persistence**: Reached `/cart`, inspected derived totals ($1,390.00 subtotal, $111.20 tax, $1,501.20 total), refreshed page, and confirmed persistence.
6. **Multi-Step Checkout**:
   - Shipping address review.
   - Delivery option selection (Complimentary Standard).
   - Simulated payment review (demo card ending in 4242).
   - Final review and order placement.
7. **Order Confirmation**: Verified confirmation view with order reference `SP-816652-4074` and confirmed status.
