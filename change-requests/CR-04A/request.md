# CR-04A: Luxury Dark Mode & Dynamic CSS Theme Tokens

## 1. Title
# CR-04A: Luxury Dark Mode & Dynamic CSS Theme Tokens

## 2. Description
High-end luxury e-commerce brands like Chanel, Balenciaga, and Porsche Design deliver immersive browsing experiences using curated color palettes. A high-contrast dark theme ('Midnight Noir') provides dramatic product presentation while reducing eye strain during evening shopping sessions.

From a frontend architecture viewpoint, theme switching should never cause layout shifts, flashes of unstyled content (FOUC), or force page reloads. Themes must be implemented using CSS Custom Property design tokens bound to a root data-theme attribute.

By the end of this Change Request, you will be able to:
- Architect scalable CSS Custom Property theme tokens in modern vanilla CSS.
- Build a responsive theme switcher component with smooth CSS color transitions.
- Synchronize theme preferences with browser localStorage and system preferences.

## 3. Topic Coverage
### React & TypeScript Concepts
- DOM dataset manipulation (`data-theme`)
- Type-safe theme unions (`"light" | "dark"`)
- localStorage synchronization with fallbacks

### Design Patterns & UI Architecture
- CSS Custom Property Token Architecture
- Persistent UI State Pattern
- Theme Context Provider Pattern

### Domain & UX Concepts
- Midnight Noir luxury aesthetic
- WCAG 2.1 AA color contrast compliance
- Zero layout shifts on theme switch

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
| STYLE | `tokens.css & index.css` | `src/styles/tokens.css` | **UPDATE** | Declare light and dark CSS variable tokens |
| COMPONENT | `ThemeToggle` | `src/components/common/ThemeToggle.tsx` | **NEW** | Interactive sun/moon theme switch button |
| LAYOUT | `Navbar` | `src/layouts/Navbar.tsx` | **UPDATE** | Mount ThemeToggle in header actions |

## 6. Step-by-Step Instructions of Implementation
### STEP 1: Declare CSS Theme Tokens
- **Where:** `src/styles/tokens.css -> [data-theme="dark"]`
- **What:** Define dark mode variables for --bg-primary, --text-primary, --border-color, and --surface-card.
- **Why:** Ensures centralized theme styling without repetitive media query classes.
- **Hint:** Use deep obsidian (#0a0a0c) and soft platinum (#f5f5f7).

### STEP 2: Build ThemeToggle Component
- **Where:** `src/components/common/ThemeToggle.tsx -> ThemeToggle`
- **What:** Create a button that reads and toggles document.documentElement.dataset.theme.
- **Why:** Provides direct user control over visual aesthetics.
- **Hint:** Persist choice in localStorage using key "shopsphere-theme".

### STEP 3: Integrate in Navbar
- **Where:** `src/layouts/Navbar.tsx -> Navbar`
- **What:** Mount <ThemeToggle /> adjacent to wishlist and cart badges.
- **Why:** Makes the theme toggle accessible on all pages.
- **Hint:** Add proper aria-label="Toggle dark mode".


## 7. Acceptance Criteria
- [ ] Clicking ThemeToggle switches document.documentElement.dataset.theme between "light" and "dark"
- [ ] CSS transitions smoothly change background and text colors over 200ms
- [ ] Theme choice persists across page reloads via localStorage

## 8. Expected Output & Visual Evidence
### Vitest / React Testing Library Output
```text
 RUN  v2.1.9 C:/Users/DELL/Downloads/SHOPSPHERE/shopsphere-trainee

 ✓ src/test/Button.test.tsx (3 tests) 180ms
   ✓ Luxury Dark Mode & Dynamic CSS Theme Tokens > renders successfully with valid contracts
   ✓ Luxury Dark Mode & Dynamic CSS Theme Tokens > handles edge cases and boundary conditions
   ✓ Luxury Dark Mode & Dynamic CSS Theme Tokens > enforces accessibility attributes and keyboard interactions

 Test Files  1 passed (1)
      Tests  3 passed (3)
   Duration  420ms
```

### UI Interaction State Matrix
| User Action / Trigger | UI Element | Expected Behavior / Visual Change |
| :--- | :--- | :--- |
| Click theme toggle button | `ThemeToggle` | Theme flips to dark, background becomes dark obsidian |
| Reload browser page | `Root DOM` | Stored theme preference is immediately restored |

## 9. How to Run the Commands
Consolidated cheat sheet for rapid verification:
- **Dev Server**: `npm run dev`
- **Run All Tests**: `npm test -- --run`
- **Targeted Test**: `npm test -- src/test/Button.test.tsx`
- **Type Check**: `npx tsc --noEmit`
- **Production Build**: `npm run build`
