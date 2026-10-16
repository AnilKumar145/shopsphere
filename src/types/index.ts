/**
 * ============================================================================
 * 🎓 TRAINEE EXERCISE: CR-09C — Global Domain Models & DTO Interfaces
 * Module 9: REST API Integration with TypeScript (Units 9.1, 9.2, 9.4)
 * ----------------------------------------------------------------------------
 * 🎯 Objective: Model core e-commerce domain types (Product, Category, CartItem,
 *    Order, User, ShippingAddress) with strict type safety.
 * 📖 Reference Spec: change-requests/CR-09C/request.md
 * 🌟 Golden Solution: shopsphere-solution/src/types/index.ts
 * ============================================================================
 */
// 2.6 Enums & Discriminated Unions
export enum SortOption {
  FEATURED = 'featured',
  PRICE_ASC = 'price_asc',
  PRICE_DESC = 'price_desc',
  RATING_DESC = 'rating_desc',
  TITLE_ASC = 'title_asc',
}

export enum OrderStatus {
  CONFIRMED = 'CONFIRMED',
  PROCESSING = 'PROCESSING',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED',
}

export enum PaymentMethod {
  CREDIT_CARD = 'credit_card',
  DEMO_INVOICE = 'demo_invoice',
}

// 2.3 Arrays and Tuples
export type CoordinatesTuple = readonly [latitude: number, longitude: number];
export type PriceRangeTuple = readonly [min: number, max: number];

// 2.4 Objects & Interfaces
export interface Rating {
  readonly rate: number;
  readonly count: number;
}

/**
 * 📝 STEP 1: Product Domain Model
 * ----------------------------------------------------------------------------
 * 🛠️ WHAT TO DO:
 *    Define Product contract matching Fake Store API schema with strict types:
 *    id (number), title (string), price (number), description (string),
 *    category (string), image (string), rating ({ rate: number, count: number }).
 */
// TODO: [STUDENT IMPLEMENTATION REQUIRED]
export interface Product {
  readonly id: number;
  readonly title: string;
  readonly price: number;
  readonly description: string;
  readonly category: string;
  readonly image: string;
  readonly rating: Rating;
}

// 2.7 Advanced TypeScript: Utility types (Partial, Pick, Omit, Record)
export type ProductSummary = Pick<Product, 'id' | 'title' | 'price' | 'category' | 'image'>;
export type ProductWithoutId = Omit<Product, 'id'>;
export type CategoryCountMap = Record<string, number>;
export type OptionalProductUpdates = Partial<Product>;

// Cart & Wishlist Models
/**
 * 📝 STEP 2: Cart Item DTO Contract
 * ----------------------------------------------------------------------------
 * 🛠️ WHAT TO DO:
 *    Model cart line items containing product model and quantity integer.
 */
// TODO: [STUDENT IMPLEMENTATION REQUIRED]
export interface CartItem {
  readonly product: Product;
  quantity: number;
}

export interface CartState {
  readonly items: CartItem[];
  readonly lastUpdated: number;
}

export interface WishlistItem {
  readonly product: Product;
  readonly addedAt: string;
}

// User & Auth Models (matching Fake Store API shape)
export interface UserName {
  firstname: string;
  lastname: string;
}

export interface Address {
  city: string;
  street: string;
  number: number;
  zipcode: string;
  geolocation?: {
    lat: string;
    long: string;
  };
}

export interface User {
  id: number;
  email: string;
  username: string;
  name: UserName;
  phone: string;
  address?: Address;
  role: 'customer' | 'admin';
}

export interface AuthSession {
  token: string;
  user: User;
  expiresAt: number;
}

// Order & Checkout Models
export interface ShippingAddressInput {
  fullName: string;
  email: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  stateOrProvince: string;
  postalCode: string;
  country: string;
  phone: string;
}

export interface PaymentSimulationInput {
  paymentMethod: PaymentMethod;
  cardholderName?: string;
  cardNumberMasked?: string;
  simulatedSuccess: boolean;
}

export interface OrderItem {
  readonly productId: number;
  readonly title: string;
  readonly price: number;
  readonly image: string;
  readonly quantity: number;
}

/**
 * 📝 STEP 3: Order History DTO Contract
 * ----------------------------------------------------------------------------
 * 🛠️ WHAT TO DO:
 *    Model customer order with id, items, totals, status, and shipping details.
 */
// TODO: [STUDENT IMPLEMENTATION REQUIRED]
export interface Order {
  readonly id: string;
  readonly orderNumber: string;
  readonly createdAt: string;
  readonly items: OrderItem[];
  readonly subtotal: number;
  readonly shippingFee: number;
  readonly estimatedTax: number;
  readonly total: number;
  readonly shippingAddress: ShippingAddressInput;
  readonly paymentMethod: PaymentMethod;
  readonly status: OrderStatus;
  readonly userId?: number;
}

// 4.5 & 9.5 UI State Representation: Discriminated Unions
export type AsyncState<T> =
  | { status: 'idle'; data: null; error: null }
  | { status: 'loading'; data: T | null; error: null }
  | { status: 'success'; data: T; error: null }
  | { status: 'error'; data: T | null; error: string };

// 2.6 Type Guards & Type Narrowing
export function isProduct(value: unknown): value is Product {
  if (typeof value !== 'object' || value === null) return false;
  const p = value as Record<string, unknown>;
  return (
    typeof p['id'] === 'number' &&
    typeof p['title'] === 'string' &&
    typeof p['price'] === 'number' &&
    typeof p['description'] === 'string' &&
    typeof p['category'] === 'string' &&
    typeof p['image'] === 'string'
  );
}
