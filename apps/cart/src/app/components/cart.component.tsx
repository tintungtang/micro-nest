import { useEffect, useState } from 'react';
import { CART_COUNT_EVENT } from 'hub';

const CartComponent = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const handler = (event: Event) => {
      const detail = (event as CustomEvent).detail;
      if (detail && typeof detail.count === 'number') {
        setCount(detail.count);
      }
    };

    window.addEventListener(CART_COUNT_EVENT, handler);
    return () => window.removeEventListener(CART_COUNT_EVENT, handler);
  }, []);

  return <span>{count}</span>;
};

export default CartComponent;
