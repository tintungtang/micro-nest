/**
 * Shared contracts between MFEs.
 * Keeping types, storage keys and event names in one place prevents
 * the remotes from drifting apart (e.g. different localStorage keys).
 */

export interface Product {
    id: number;
    name: string;
    description: string;
    imageUrl: string;
    price: number;
    category?: string;
}

export interface CartItem {
    id: number;
    name: string;
    price: number;
    imageUrl?: string;
    quantity: number;
}

export type OrderStatus = 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';

export interface Order {
    id: string;
    placedAt: string;
    status: OrderStatus;
    items: CartItem[];
    total: number;
}

export interface UserProfile {
    username: string;
    fullName: string;
    email: string;
    phone: string;
    address: string;
}

/** localStorage keys shared by every MFE (the "shared store"). */
export const STORAGE_KEYS = {
    cart: 'CART_ITEMS',
    orders: 'ORDERS',
    profile: 'USER_PROFILE',
    userRole: 'userRole',
} as const;

/** window CustomEvent names shared by every MFE. */
export const MFE_EVENTS = {
    /** payload: Product — a product was added to the cart */
    cartAdd: 'cart:add',
    /** payload: CartItem[] — the cart content changed */
    cartChanged: 'cart:changed',
    /** payload: Order[] — the order list changed */
    ordersChanged: 'orders:changed',
    /** payload: UserProfile | null — sign-in / sign-out / profile update */
    authChanged: 'auth:changed',
    /** payload: string — ask the shell router to navigate to a URL */
    navigate: 'mfe:navigate',
} as const;
