import { useEffect, useState } from 'react';

const CART_KEY = 'cartItems';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

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

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (items.length === 0) {
    return <div className="p-4">Your cart is empty.</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Order Items</h2>
      <table className="table-auto w-full mb-4">
        <thead>
          <tr>
            <th className="text-left p-2">Product</th>
            <th className="p-2">Qty</th>
            <th className="p-2">Price</th>
            <th className="p-2">Total</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id} className="border-t">
              <td className="p-2">{item.name}</td>
              <td className="text-center p-2">{item.quantity}</td>
              <td className="text-right p-2">${item.price.toFixed(2)}</td>
              <td className="text-right p-2">
                ${(item.price * item.quantity).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="text-right font-semibold">Cart Total: ${total.toFixed(2)}</div>
    </div>
  );
}

export default OrderListPage;
