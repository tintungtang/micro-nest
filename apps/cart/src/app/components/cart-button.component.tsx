import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

const CART_KEY = 'cartItems';

const CartButton = () => {
  const [count, setCount] = useState(0);

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
      data-bs-toggle="offcanvas"
      data-bs-target="#offcanvasCart"
      aria-controls="offcanvasCart"
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
    connectedCallback() {
      ReactDOM.render(<CartButton />, this);
    }
    disconnectedCallback() {
      ReactDOM.unmountComponentAtNode(this);
    }
  }
  if (!customElements.get('mfe-cart-button')) {
    customElements.define('mfe-cart-button', CartButtonElement);
  }
}

defineCartButtonElement();
export default CartButton;
