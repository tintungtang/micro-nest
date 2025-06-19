export const CART_COUNT_EVENT = 'cart-count-change';
const STORAGE_KEY = 'cart-items';
export interface CartItem {
  [key: string]: any;
}

export function getCartItems(): CartItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function getCartCount(): number {
  return getCartItems().length;
}

export function broadcastCartCount(count: number) {
  window.dispatchEvent(new CustomEvent(CART_COUNT_EVENT, { detail: { count } }));
}

export function addCartItem(item: CartItem): number {
  const items = getCartItems();
  items.push(item);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  broadcastCartCount(items.length);
  return items.length;
}

export function initializeCartCount() {
  broadcastCartCount(getCartCount());
}
