import { createRoot, Root } from 'react-dom/client';
import CartPage from './cart-page';

/**
 * Exposed via Module Federation as `cart/CartPage`.
 * Importing this module registers the <mfe-cart-page> custom element,
 * which lets the Angular shell mount the React checkout page.
 */
export function defineCartPageElement() {
    class CartPageElement extends HTMLElement {
        private _root?: Root;

        connectedCallback() {
            if (!this._root) {
                this._root = createRoot(this);
                this._root.render(<CartPage />);
            }
        }

        disconnectedCallback() {
            this._root?.unmount();
            this._root = undefined;
        }
    }

    if (!customElements.get('mfe-cart-page')) {
        customElements.define('mfe-cart-page', CartPageElement);
    }
}

defineCartPageElement();
export default CartPage;
