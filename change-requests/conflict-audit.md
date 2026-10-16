# Change Request Conflict & File Touchpoint Audit (15 Module CRs)

## Master Touchpoint Matrix

| File / Component Path | CR-02 | CR-03 | CR-04 | CR-05 | CR-06 | CR-07 | CR-08 | CR-09 | CR-10 | CR-11 | CR-12 | CR-13 | CR-14 | CR-15 | CR-17 | Conflict Status |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :--- |
| `src/types/` | **New** | — | — | — | **New** | — | — | — | — | — | — | — | — | — | **New** | Isolated new type files |
| `src/components/ui/` | — | **New** | — | — | — | — | — | — | — | — | — | — | — | — | — | Clean addition |
| `src/index.css` | — | — | **Mod** | — | — | — | — | — | — | — | — | — | — | — | — | Isolated theme tokens |
| `src/pages/OrdersPage.tsx` | — | — | — | **Mod** | — | — | **Mod** | — | — | — | — | — | — | — | — | Mod-05: actions; Mod-08: tabs |
| `src/pages/ProductDetailPage.tsx`| — | — | — | — | **Mod** | — | — | — | — | — | **Mod** | — | — | — | **Mod** | Non-overlapping DOM blocks |
| `src/hooks/` | — | — | — | — | — | **New** | — | — | — | — | — | — | — | — | — | Isolated new hooks |
| `src/pages/AdminPage.tsx` | — | — | — | — | — | — | — | **Mod** | — | — | — | **Mod** | — | — | — | Mod-09: modal; Mod-13: scroll |
| `src/store/slices/preferencesSlice.ts`| — | — | — | — | — | — | — | — | **Mod** | — | — | — | — | — | — | Isolated slice extension |
| `src/pages/AccountPage.tsx` | — | — | — | — | — | — | — | — | — | **Mod** | — | — | — | — | — | Isolated profile form |
| `src/pages/ProductListPage.tsx` | — | — | — | — | — | — | — | — | — | — | — | **Mod** | — | — | — | Isolated calculation memo |
| `src/test/` | — | — | — | — | — | — | — | — | — | — | — | — | **New** | — | — | Isolated test files |
| `src/services/auditLogger.ts` | — | — | — | — | — | — | — | — | — | — | — | — | — | **New** | — | Isolated service |

---

## Overlap Analysis & Separation Guarantees

1. **`OrdersPage.tsx` (CR-MOD-05 vs CR-MOD-08)**:
   - **CR-MOD-05 Scope**: Adds an action menu button ("Cancel", "Request Refund") inside each order card body.
   - **CR-MOD-08 Scope**: Adds top status navigation filter tabs (`All`, `Active`, `Delivered`, `Cancelled`) syncing with `useSearchParams`.
   - **Guarantee**: Independent. A trainee working on CR-MOD-05 operates inside the order card renderer; a trainee on CR-MOD-08 operates on the header filter navigation.

2. **`ProductDetailPage.tsx` (CR-MOD-06, CR-MOD-12, CR-MOD-17)**:
   - **CR-MOD-06 Scope**: Appends customer review section at the bottom of the container.
   - **CR-MOD-12 Scope**: Adds a "Notify When Available" link button next to the quantity stepper.
   - **CR-MOD-17 Scope**: Adds a "VIP Bespoke Inquiry" modal button inside jewelry category items.
   - **Guarantee**: Independent. Each operates in distinct layout zones without component coupling.

3. **`AdminPage.tsx` (CR-MOD-09 vs CR-MOD-13)**:
   - **CR-MOD-09 Scope**: Adds batch price adjustment modal trigger.
   - **CR-MOD-13 Scope**: Implements memoized catalog analytics and virtualized scrolling for the inventory table.
   - **Guarantee**: Independent operational scopes.
