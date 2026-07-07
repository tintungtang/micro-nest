import {
    CartItem,
    MFE_EVENTS,
    Order,
    Product,
    STORAGE_KEYS,
    UserProfile,
} from './contracts';

/**
 * Framework-agnostic shared store built on top of localStorage.
 * Every mutation goes through these helpers so there is a single
 * writer per key, and each mutation broadcasts a window CustomEvent
 * so any MFE (Angular or React) can react to the change.
 */

function read<T>(key: string, fallback: T): T {
    try {
        const raw = localStorage.getItem(key);
        return raw ? (JSON.parse(raw) as T) : fallback;
    } catch {
        return fallback;
    }
}

function emit<T>(event: string, detail: T): void {
    window.dispatchEvent(new CustomEvent(event, { detail }));
}

/* ------------------------------- Cart ------------------------------- */

export function getCartItems(): CartItem[] {
    return read<CartItem[]>(STORAGE_KEYS.cart, []);
}

export function getCartCount(): number {
    return getCartItems().reduce((sum, item) => sum + item.quantity, 0);
}

export function addToCart(product: Product): CartItem[] {
    const items = getCartItems();
    const existing = items.find((item) => item.id === product.id);
    if (existing) {
        existing.quantity += 1;
    } else {
        items.push({
            id: product.id,
            name: product.name,
            price: product.price,
            imageUrl: product.imageUrl,
            quantity: 1,
        });
    }
    localStorage.setItem(STORAGE_KEYS.cart, JSON.stringify(items));
    emit(MFE_EVENTS.cartAdd, product);
    emit(MFE_EVENTS.cartChanged, items);
    return items;
}

export function removeFromCart(productId: number): CartItem[] {
    const items = getCartItems().filter((item) => item.id !== productId);
    localStorage.setItem(STORAGE_KEYS.cart, JSON.stringify(items));
    emit(MFE_EVENTS.cartChanged, items);
    return items;
}

export function clearCart(): void {
    localStorage.setItem(STORAGE_KEYS.cart, JSON.stringify([]));
    emit(MFE_EVENTS.cartChanged, []);
}

/* ------------------------------ Orders ------------------------------ */

export function getOrders(): Order[] {
    return read<Order[]>(STORAGE_KEYS.orders, []);
}

export function getOrder(id: string): Order | undefined {
    return getOrders().find((order) => order.id === id);
}

/** Turns the current cart into a new order and clears the cart. */
export function placeOrder(): Order | null {
    const items = getCartItems();
    if (items.length === 0) {
        return null;
    }

    const order: Order = {
        id: `ORD-${Date.now().toString(36).toUpperCase()}`,
        placedAt: new Date().toISOString(),
        status: 'Processing',
        items,
        total: items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    };

    const orders = [order, ...getOrders()];
    localStorage.setItem(STORAGE_KEYS.orders, JSON.stringify(orders));
    clearCart();
    emit(MFE_EVENTS.ordersChanged, orders);
    return order;
}

/* --------------------------- Auth / profile -------------------------- */

export function getProfile(): UserProfile | null {
    return read<UserProfile | null>(STORAGE_KEYS.profile, null);
}

export function isAuthenticated(): boolean {
    return localStorage.getItem(STORAGE_KEYS.userRole) !== null;
}

export function signIn(username: string): UserProfile {
    const profile: UserProfile = getProfile() ?? {
        username,
        fullName: username,
        email: `${username}@micro.nest`,
        phone: '',
        address: '',
    };
    profile.username = username;
    localStorage.setItem(STORAGE_KEYS.userRole, 'officer');
    localStorage.setItem(STORAGE_KEYS.profile, JSON.stringify(profile));
    emit(MFE_EVENTS.authChanged, profile);
    return profile;
}

export function signOut(): void {
    localStorage.removeItem(STORAGE_KEYS.userRole);
    emit(MFE_EVENTS.authChanged, null);
}

export function updateProfile(changes: Partial<UserProfile>): UserProfile | null {
    const profile = getProfile();
    if (!profile) {
        return null;
    }
    const updated = { ...profile, ...changes };
    localStorage.setItem(STORAGE_KEYS.profile, JSON.stringify(updated));
    emit(MFE_EVENTS.authChanged, updated);
    return updated;
}

/* ----------------------------- Navigation ---------------------------- */

/** Ask the shell to route somewhere without coupling remotes to its router. */
export function requestNavigation(url: string): void {
    emit(MFE_EVENTS.navigate, url);
}
