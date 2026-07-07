import { useEffect, useState } from 'react';
import { createRoot, Root } from 'react-dom/client';
import { getCartCount, MFE_EVENTS, requestNavigation } from 'hub';

const CartButton = () => {
    const [count, setCount] = useState(() => getCartCount());

    useEffect(() => {
        // Read-only listener: the hub store owns the localStorage writes.
        const refresh = () => setCount(getCartCount());
        window.addEventListener(MFE_EVENTS.cartChanged, refresh);
        return () => window.removeEventListener(MFE_EVENTS.cartChanged, refresh);
    }, []);

    return (
        <a
            className="p-2 mx-1 position-relative"
            title="Shopping cart"
            style={{ cursor: 'pointer' }}
            onClick={() => requestNavigation('/cart')}
        >
            <svg width="24" height="24">
                <use xlinkHref="#shopping-bag"></use>
            </svg>
            {count > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary">
                    {count}
                </span>
            )}
        </a>
    );
};

export function defineCartButtonElement() {
    class CartButtonElement extends HTMLElement {
        private _root?: Root;

        connectedCallback() {
            if (!this._root) {
                this._root = createRoot(this);
                this._root.render(<CartButton />);
            }
        }

        disconnectedCallback() {
            this._root?.unmount();
            this._root = undefined;
        }
    }

    if (!customElements.get('mfe-cart-button')) {
        customElements.define('mfe-cart-button', CartButtonElement);
    }
}

defineCartButtonElement();
export default CartButton;
