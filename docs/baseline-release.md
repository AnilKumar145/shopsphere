# ShopSphere — Baseline Release Specification

## 1. Release Overview

- **Product Name**: ShopSphere
- **Version**: `1.0.0 (Baseline Release)`
- **Release Status**: Verified & Ready for Evaluation
- **Target Audience**: Evaluation team reviewing full curriculum traceability (Modules 2–15 and 17).

---

## 2. Verification Commands & Results

| Gate / Command | Description | Exact Result |
| :--- | :--- | :---: |
| `npx tsc --noEmit` | Strict TypeScript compiler check | **Exit Code 0** (0 errors) |
| `npm run build` | Vite production compilation & bundling | **Exit Code 0** (All 1691 modules transformed in 7.04s) |
| `npm test` | Vitest automated unit & component test suite | **Exit Code 0** (7/7 test files passed, 23/23 tests passed) |
| Browser Subagent | Automated full-journey validation | **100% Successful Flow** |

---

## 3. Production Bundle Assets

```
dist/index.html                                   1.15 kB │ gzip:  0.62 kB
dist/assets/Modal-icwNLRl1.css                    1.87 kB │ gzip:  0.67 kB
dist/assets/FormElements-BTTid-zC.css             2.03 kB │ gzip:  0.79 kB
dist/assets/LoginPage-DsF-6ml5.css                2.74 kB │ gzip:  0.71 kB
dist/assets/OrderConfirmationPage-PurnLGRq.css    2.79 kB │ gzip:  0.79 kB
dist/assets/AccountPage-B_Z19k_v.css              3.00 kB │ gzip:  0.78 kB
dist/assets/ProductCard-yJNOl5R1.css              3.06 kB │ gzip:  0.88 kB
dist/assets/WishlistPage-Dd81bCdd.css             3.28 kB │ gzip:  0.92 kB
dist/assets/OrdersPage-BabSUt_d.css               4.43 kB │ gzip:  1.00 kB
dist/assets/ProductDetailPage-DmLFlGOA.css        4.69 kB │ gzip:  1.20 kB
dist/assets/HomePage-BlDVd6E2.css                 4.73 kB │ gzip:  1.19 kB
dist/assets/CartPage-BW7QYjFW.css                 5.56 kB │ gzip:  1.25 kB
dist/assets/CheckoutPage-9gdswcTo.css             5.67 kB │ gzip:  1.20 kB
dist/assets/ProductListPage-BZpvn-4O.css          6.30 kB │ gzip:  1.47 kB
dist/assets/index-sGNVvj4k.css                   16.47 kB │ gzip:  3.86 kB
dist/assets/ProductCard-BAVUAIQA.js              12.46 kB │ gzip:  4.62 kB
dist/assets/CheckoutPage-CwjcI7PR.js             12.76 kB │ gzip:  3.87 kB
dist/assets/index-ZEASiVst.js                   258.05 kB │ gzip: 83.47 kB
```

---

## 4. Known Technical Limitations & Demo Boundaries

1. **Remote Data Source Limitations**:
   - The Fake Store API is a demo REST mock server. While read operations (`/products`, `/products/categories`, `/products/:id`) return real catalog objects, remote mutations (POST `/products`, PUT `/products/:id`, POST `/users`) do not persist in a live database across page refreshes.
   - Consequently, simulated checkout orders and user preferences are recorded and persisted locally using the client-side `orderService` and browser `localStorage`.
2. **Demonstration Authentication**:
   - The `/auth/login` endpoint returns a signed static JWT token. The application implements full session hydration and expiration checks, but does not claim production-grade session security or multi-device synchronization.
3. **Simulated Payment**:
   - The checkout payment process is strictly a demonstration sandbox. No real card payments are collected or transmitted. A payment failure simulation checkbox is provided specifically to allow evaluators to test error recovery states.

---

## 5. Strict Change Request (CR) Separation Confirmation

In strict compliance with **Section 14 (Strict Change Request separation)** of the requirements:
- **No Change Requests (CRs) were created, planned, or mixed into this baseline.**
- No `CR-001`, `CR-002`, or future request folders exist.
- All core product journeys (Storefront, Catalog, Detail, Cart, Wishlist, Auth, Multi-step Checkout, Orders, Account, 404) are fully implemented and verified in the baseline release.
