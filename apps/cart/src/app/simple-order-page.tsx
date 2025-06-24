import React, { useEffect, useState } from 'react';

const CART_KEY = 'cartItems';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

export function OrderListPage() {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem(CART_KEY) || '[]');
    const grouped: Record<number, CartItem> = {};
    
    for (const prod of stored) {
      if (grouped[prod.id]) {
        grouped[prod.id].quantity += 1;
      } else {
        grouped[prod.id] = {
          id: prod.id,
          name: prod.name,
          price: prod.price,
          quantity: 1,
        };
      }
    }
    setItems(Object.values(grouped));
  }, []);

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(id);
      return;
    }
    
    setItems(items.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  const removeItem = (id: number) => {
    setItems(items.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setItems([]);
    localStorage.removeItem(CART_KEY);
  };

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  if (items.length === 0) {
    return (
      <div className="container">
        <div className="cart-page">
          <div className="empty-cart">
            <div className="empty-cart-icon">
              <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 01-8 0"/>
              </svg>
            </div>
            <h3>Your cart is empty</h3>
            <p>Add some products to get started!</p>
            <button 
              className="btn btn-primary"
              onClick={() => window.location.href = '/products'}
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="cart-page">
        <div className="card">
          <div className="card-header">
            <h1>Shopping Cart</h1>
            <p>{items.reduce((sum, item) => sum + item.quantity, 0)} items in your cart</p>
          </div>

          <div className="card-body">
            <table className="table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Total</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <div>
                        <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: '600' }}>
                          {item.name}
                        </h4>
                      </div>
                    </td>
                    <td>
                      <div className="quantity-control">
                        <button
                          className="btn btn-sm btn-secondary"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          −
                        </button>
                        <span style={{ 
                          padding: '0.25rem 0.5rem', 
                          background: 'var(--bg-color)', 
                          borderRadius: 'var(--border-radius)',
                          minWidth: '40px',
                          textAlign: 'center'
                        }}>
                          {item.quantity}
                        </span>
                        <button
                          className="btn btn-sm btn-secondary"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      {formatCurrency(item.price)}
                    </td>
                    <td style={{ textAlign: 'right', fontWeight: '600' }}>
                      {formatCurrency(item.price * item.quantity)}
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <button
                        className="btn btn-sm btn-secondary"
                        onClick={() => removeItem(item.id)}
                        title="Remove item"
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="card-footer">
            <div className="cart-summary">
              <div className="summary-row">
                <span>Subtotal:</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
              <div className="summary-row">
                <span>Tax (10%):</span>
                <span>{formatCurrency(tax)}</span>
              </div>
              <div className="summary-row total-row">
                <strong>
                  <span>Total:</span>
                  <span>{formatCurrency(total)}</span>
                </strong>
              </div>
            </div>

            <div className="cart-actions">
              <button
                className="btn btn-secondary"
                onClick={clearCart}
              >
                Clear Cart
              </button>
              <button
                className="btn btn-primary"
                onClick={() => alert('Checkout functionality coming soon!')}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderListPage;
