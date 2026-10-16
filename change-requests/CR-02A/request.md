# CR-02A: Multi-Currency Union Types & Pure Conversion Utilities

## 1. Title
# CR-02A: Multi-Currency Union Types & Pure Conversion Utilities

## 2. Description
In international luxury e-commerce platforms like Farfetch, Net-a-Porter, and SSENSE, catering to a global clientele requires seamless multi-currency support (USD, EUR, GBP, JPY). Hardcoding string currency symbols or performing ad-hoc string formatting leads to currency symbol collisions, calculation inaccuracies, and unhandled currency edge cases.

From a frontend engineering perspective, multi-currency engines require strict static type guarantees. Relying on generic string types makes functions vulnerable to typos (e.g. passing 'usd' instead of 'USD') and prevents the TypeScript compiler from enforcing exhaustive conversion cases.

By the end of this Change Request, you will be able to:
- Model domain currency identifiers using TypeScript discriminated string literal union types.
- Implement exhaustive switch-case narrowing with zero `any` annotations.
- Build pure financial utility functions with strict parameter and return type safety.

## 3. Topic Coverage
### React & TypeScript Concepts
- String literal union types (`CurrencyCode`)
- Exhaustive pattern matching and type narrowing
- Strict parameter and return type annotations
- Type exports and barrel re-exports

### Design Patterns & UI Architecture
- Pure utility functions with deterministic outputs
- Immutable data transformation
- Domain-driven type definitions

### Domain & UX Concepts
- Global multi-currency pricing display
- ISO currency code standard compliance
- Accurate precision rounding for luxury retail

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
   npm test -- src/test/formatters.test.ts
   ```
5. **View in browser**:
   Navigate to `http://localhost:3000` to test the interactive feature live.

## 5. Target Files, Components, Hooks & APIs
| Type | Name | File Path | Status | Notes |
| :---: | :--- | :--- | :---: | :--- |
| TYPE | `CurrencyCode & CurrencyConfig` | `src/types/currency.ts` | **NEW** | Union types, config interfaces, and rate contracts |
| UTIL | `convertCurrency` | `src/utils/currencyUtils.ts` | **NEW** | Pure currency conversion and lookup functions |
| UTIL | `formatCurrency` | `src/utils/formatters.ts` | **UPDATE** | Extend formatter to accept active currency |

## 6. Step-by-Step Instructions of Implementation
### STEP 1: Define CurrencyCode Union and CurrencyConfig Interface
- **Where:** `src/types/currency.ts -> CurrencyCode & CurrencyConfig`
- **What:** Declare a strict union type CurrencyCode = "USD" | "EUR" | "GBP" | "JPY" and an interface CurrencyConfig containing code, symbol, label, and exchangeRateToUSD.
- **Why:** Prevents arbitrary string inputs across the codebase and enables compiler-checked currency handling.
- **Hint:** Use the `export type` and `export interface` syntax. Do not use enum or any.

### STEP 2: Create Exchange Rate Lookup Table
- **Where:** `src/utils/currencyUtils.ts -> SUPPORTED_CURRENCIES`
- **What:** Define an immutable record of supported currencies mapping each CurrencyCode to its symbol and conversion rate against USD.
- **Why:** Centralizes the conversion logic in a single source of truth.
- **Hint:** Type the constant with Record<CurrencyCode, CurrencyConfig> or CurrencyConfig[].

### STEP 3: Implement convertCurrency Function
- **Where:** `src/utils/currencyUtils.ts -> convertCurrency()`
- **What:** Write a pure function taking amount (number), from (CurrencyCode), and to (CurrencyCode) returning the converted price rounded to 2 decimal places.
- **Why:** Ensures deterministic, testable financial arithmetic without side effects.
- **Hint:** Formula: (amount / fromRate) * toRate. Round using Math.round((val + Number.EPSILON) * 100) / 100.


## 7. Acceptance Criteria
- [ ] CurrencyCode permits only "USD" | "EUR" | "GBP" | "JPY"
- [ ] convertCurrency(100, "USD", "EUR") correctly calculates the EUR equivalent
- [ ] Zero `any` types present in currency.ts and currencyUtils.ts
- [ ] All automated tests in formatters.test.ts pass with 100% assertions

## 8. Expected Output & Visual Evidence
### Vitest / React Testing Library Output
```text
 RUN  v2.1.9 C:/Users/DELL/Downloads/SHOPSPHERE/shopsphere-trainee

 ✓ src/test/formatters.test.ts (3 tests) 180ms
   ✓ Multi-Currency Union Types & Pure Conversion Utilities > renders successfully with valid contracts
   ✓ Multi-Currency Union Types & Pure Conversion Utilities > handles edge cases and boundary conditions
   ✓ Multi-Currency Union Types & Pure Conversion Utilities > enforces accessibility attributes and keyboard interactions

 Test Files  1 passed (1)
      Tests  3 passed (3)
   Duration  420ms
```

### UI Interaction State Matrix
| User Action / Trigger | UI Element | Expected Behavior / Visual Change |
| :--- | :--- | :--- |
| Call convertCurrency(100, "USD", "EUR") | `currencyUtils.ts` | Returns accurate converted float (e.g. 92.00) |
| Pass invalid code "CAD" | `TypeScript Compiler` | Compile-time error: Type "CAD" is not assignable to type CurrencyCode |
| Format negative or zero value | `formatters.ts` | Gracefully returns formatted zero currency string |

## 9. How to Run the Commands
Consolidated cheat sheet for rapid verification:
- **Dev Server**: `npm run dev`
- **Run All Tests**: `npm test -- --run`
- **Targeted Test**: `npm test -- src/test/formatters.test.ts`
- **Type Check**: `npx tsc --noEmit`
- **Production Build**: `npm run build`
