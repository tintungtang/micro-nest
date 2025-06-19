import React from 'react';
import ReactDOM from 'react-dom';

const CartButton = () => (
  <a className="p-2 mx-1" data-bs-toggle="offcanvas" data-bs-target="#offcanvasCart" aria-controls="offcanvasCart">
    <svg width="24" height="24"><use xlinkHref="#shopping-bag"></use></svg>
  </a>
);

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
