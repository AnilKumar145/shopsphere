# ShopSphere — REST API Integration Specification

## 1. Remote API Source & Base URL

- **Remote API Provider**: [Fake Store API](https://fakestoreapi.com/)
- **Base URL**: `https://fakestoreapi.com`
- **Client Service Layer**: [`src/services/api.ts`](file:///c:/Users/DELL/Downloads/FakerStoreAPI/src/services/api.ts)

---

## 2. Integrated Endpoints & Supported Operations

| Method | Endpoint | Purpose | Request Body | Response DTO |
| :--- | :--- | :--- | :--- | :--- |
| **GET** | `/products` | Fetch catalog list (supports `?limit=N`) | *None* | `Product[]` |
| **GET** | `/products/:id` | Fetch single product by ID | *None* | `Product` |
| **GET** | `/products/categories` | Fetch category strings | *None* | `string[]` |
| **GET** | `/products/category/:cat` | Fetch items in specific category | *None* | `Product[]` |
| **POST** | `/auth/login` | Authenticate user credentials | `{ username, password }` | `{ token: string }` |
| **GET** | `/users/:id` | Retrieve user profile & address | *None* | `User` |
| **PUT** | `/products/:id` | Simulated product update | `Partial<Product>` | `Product` |
| **DELETE** | `/products/:id` | Simulated product removal | *None* | `{ id: number }` |

---

## 3. Request Lifecycle, Caching & Cancellation

- **Cancellation & Timeouts**: Requests in `apiService` are monitored by an internal `AbortController` with a 10-second timeout window. TanStack Query hooks pass through external `signal` instances so unmounted queries cancel inflight HTTP requests immediately.
- **Caching Strategy**: Managed via TanStack Query:
  - Catalog queries (`queryKeys.products`): `staleTime = 5 minutes`, `gcTime = 10 minutes`.
  - Categories (`queryKeys.categories`): `staleTime = 15 minutes`.
  - Product Details (`queryKeys.product(id)`): `staleTime = 5 minutes`.
- **Offline & Fault Tolerance**: If the remote Fake Store API experiences connectivity drops or rate limits, the request layer catches the exception and transparently provides high-fidelity fallback data ([`src/services/mockData.ts`](file:///c:/Users/DELL/Downloads/FakerStoreAPI/src/services/mockData.ts)).

---

## 4. Demonstration Authentication & Limitations

Fake Store API provides a demonstration authentication service:

1. **Static Demonstration JWT**: The `/auth/login` endpoint returns a signed demonstration token for valid user credentials (e.g. `username: "johnd"`, `password: "m38rmF$"`).
2. **Persistence Boundary**: The token is stored locally in `localStorage` under `shopsphere_auth_v1` with an explicit 24-hour expiration timestamp.
3. **Important Limitations**:
   - The remote Fake Store API does not maintain a server-side session registry, token blacklists, or refresh token mechanisms.
   - User account registration (`/users` POST) on Fake Store API does not persist remotely across sessions. ShopSphere simulates instant customer registration locally while providing quick-fill reviewer credentials for testing.
   - Demo authentication is never described as production-secure.
