import React, { useEffect, useState } from 'react';

const CART_KEY = 'cartItems';

interface CartButtonProps {
  className?: string;
  onClick?: () => void;
}

const SimpleCartButton: React.FC<CartButtonProps> = ({ 
  className = '', 
  onClick 
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Load initial count
    const stored = JSON.parse(localStorage.getItem(CART_KEY) || '[]');
    setCount(stored.length);

    // Listen for cart changes
    const handleCartChange = (e: any) => {
      const items = JSON.parse(localStorage.getItem(CART_KEY) || '[]');
      items.push(e.detail);
      localStorage.setItem(CART_KEY, JSON.stringify(items));
      setCount(items.length);
    };

    window.addEventListener('cart:add', handleCartChange);
    return () => window.removeEventListener('cart:add', handleCartChange);
  }, []);

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      window.location.href = '/pages/cart';
    }
  };

  return (
    <button
      className={`cart-button ${className}`}
      onClick={handleClick}
      title={`${count} items in cart`}
    >
      <div className="cart-icon">
        <svg 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2"
        >
          <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
          <line x1="3" y1="6" x2="21" y2="6"/>
          <path d="M16 10a4 4 0 01-8 0"/>
        </svg>
        
        {count > 0 && (
          <span className="cart-badge">
            {count > 99 ? '99+' : count}
          </span>
        )}
      </div>
    </button>
  );
};

export default SimpleCartButton;
