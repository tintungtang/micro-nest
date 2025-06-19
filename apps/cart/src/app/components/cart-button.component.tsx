import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { CART_COUNT_EVENT, getCartCount } from 'hub';

const CartButton = () => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    setCount(getCartCount());
    const handler = (event: Event) => {
      const detail = (event as CustomEvent).detail;
      if (detail && typeof detail.count === 'number') {
        setCount(detail.count);
      }
    };
    window.addEventListener(CART_COUNT_EVENT, handler);
    return () => window.removeEventListener(CART_COUNT_EVENT, handler);
  }, []);

  return (
    <a className="p-2 mx-1" data-bs-toggle="offcanvas" data-bs-target="#offcanvasCart" aria-controls="offcanvasCart">
      <svg width="24" height="24"><use xlinkHref="#shopping-bag"></use></svg>
      <span className="badge bg-primary rounded-pill ms-1">{count}</span>
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
