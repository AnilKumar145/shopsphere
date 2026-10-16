# CR-02B: Generic Record DTOs & Runtime Configuration Types

## 1. Title
# CR-02B: Generic Record DTOs & Runtime Configuration Types

## 2. Description
Enterprise SaaS applications like Stripe and Vercel rely on typed configuration dictionaries to manage feature toggles, environment API hosts, and key-value metadata tables. Without generic dictionary types, configuration objects default to loosely typed dictionaries (`Record<string, any>`), opening severe runtime blind spots.

In TypeScript, leveraging generic utilities like `Record<K, V>` and interface extension guarantees that dictionary keys are constrained to validated union sets, while dictionary values strictly conform to known data structures.

By the end of this Change Request, you will be able to:
- Construct type-safe dictionary DTOs using generic `Record<K, V>` utility types.
- Author robust runtime environment configuration interfaces.
- Protect configuration access with strict TypeScript key constraints.

## 3. Topic Coverage
### React & TypeScript Concepts
- Generic utility type `Record<Keys, Type>`
- Interface inheritance and type intersection
- Type narrowing and optional configuration fields

### Design Patterns & UI Architecture
- Configuration Object Pattern
- Single Source of Truth (SSOT)
- Type-Safe DTO Mapping

### Domain & UX Concepts
- Predictable environment startup
- Zero runtime configuration crashes
- Transparent feature flag toggling

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
   npm test -- src/test/appConfig.test.ts
   ```
5. **View in browser**:
   Navigate to `http://localhost:3000` to test the interactive feature live.

## 5. Target Files, Components, Hooks & APIs
| Type | Name | File Path | Status | Notes |
| :---: | :--- | :--- | :---: | :--- |
| TYPE | `AppConfig & FeatureFlags` | `src/config/appConfig.ts` | **NEW** | Typed environment configuration contract |
| TYPE | `ExchangeRateMap` | `src/types/currency.ts` | **UPDATE** | Generic Record mapping currency to rates |

## 6. Step-by-Step Instructions of Implementation
### STEP 1: Define ExchangeRateMap with Record Utility
- **Where:** `src/types/currency.ts -> ExchangeRateMap`
- **What:** Declare export type ExchangeRateMap = Record<CurrencyCode, number>.
- **Why:** Enforces that every currency code has an associated numeric multiplier.
- **Hint:** TypeScript will error if any CurrencyCode member is missing from the record unless Partial is used.

### STEP 2: Create AppConfig Contract
- **Where:** `src/config/appConfig.ts -> AppConfig`
- **What:** Define an interface AppConfig containing apiBaseUrl (string), requestTimeout (number), isProduction (boolean), and featureFlags (Record<string, boolean>).
- **Why:** Prevents ad-hoc access to import.meta.env across disparate component files.
- **Hint:** Use readonly properties to ensure immutability at runtime.

### STEP 3: Export Default AppConfig Instance
- **Where:** `src/config/appConfig.ts -> appConfig`
- **What:** Export a singleton config object populated with environment variables or sensible fallbacks.
- **Why:** Provides a clean importable configuration for Axios and service layers.
- **Hint:** Use import.meta.env.VITE_API_URL ?? "https://fakestoreapi.com".


## 7. Acceptance Criteria
- [ ] ExchangeRateMap strictly requires all CurrencyCode keys with numeric values
- [ ] appConfig object is strongly typed with zero any annotations
- [ ] Unit tests in appConfig.test.ts verify fallback defaults and properties

## 8. Expected Output & Visual Evidence
### Vitest / React Testing Library Output
```text
 RUN  v2.1.9 C:/Users/DELL/Downloads/SHOPSPHERE/shopsphere-trainee

 ✓ src/test/appConfig.test.ts (3 tests) 180ms
   ✓ Generic Record DTOs & Runtime Configuration Types > renders successfully with valid contracts
   ✓ Generic Record DTOs & Runtime Configuration Types > handles edge cases and boundary conditions
   ✓ Generic Record DTOs & Runtime Configuration Types > enforces accessibility attributes and keyboard interactions

 Test Files  1 passed (1)
      Tests  3 passed (3)
   Duration  420ms
```

### UI Interaction State Matrix
| User Action / Trigger | UI Element | Expected Behavior / Visual Change |
| :--- | :--- | :--- |
| Inspect appConfig.apiBaseUrl | `appConfig.ts` | Returns valid API URL string |
| Access nonexistent config key | `TypeScript Compiler` | Type error: Property does not exist on type AppConfig |

## 9. How to Run the Commands
Consolidated cheat sheet for rapid verification:
- **Dev Server**: `npm run dev`
- **Run All Tests**: `npm test -- --run`
- **Targeted Test**: `npm test -- src/test/appConfig.test.ts`
- **Type Check**: `npx tsc --noEmit`
- **Production Build**: `npm run build`
