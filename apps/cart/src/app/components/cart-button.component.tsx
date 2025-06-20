import React, { useEffect, useState } from 'react';
import { createRoot, Root } from 'react-dom/client';
import { useNavigate } from 'react-router';
// import { useNavigate } from 'react-router-dom';
const CART_KEY = 'cartItems';

const CartButton = () => {
    const [ count, setCount ] = useState(0);
    // const navigate = useNavigate();

    const navigate = (path: string) => { console.log(path); };

    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem(CART_KEY) || '[]');
        setCount(stored.length);

        const handler = (e: any) => {
            const items = JSON.parse(localStorage.getItem(CART_KEY) || '[]');
            items.push(e.detail);
            localStorage.setItem(CART_KEY, JSON.stringify(items));
            setCount(items.length);
        };

        window.addEventListener('cart:add', handler);
        return () => window.removeEventListener('cart:add', handler);
    }, []);

    return (
        <a
            className="p-2 mx-1 position-relative"
            onClick={() => navigate('/pages/cart')}
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
