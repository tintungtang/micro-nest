import { useEffect, useState } from 'react';

interface CartItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
}

const CheckoutComponent = () => {
    const [items, setItems] = useState<CartItem[]>([]);

    useEffect(() => {
        try {
            const stored = localStorage.getItem('cartItems');
            if (stored) {
                setItems(JSON.parse(stored));
            }
        } catch (err) {
            console.error('Failed to load items', err);
        }
    }, []);

    const total = items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Checkout</h2>
            {items.length === 0 ? (
                <p>No items in cart.</p>
            ) : (
                <>
                    <ul className="mb-4">
                        {items.map((item) => (
                            <li key={item.id} className="mb-2">
                                {item.name} x {item.quantity} - $
                                {item.price * item.quantity}
                            </li>
                        ))}
                    </ul>
                    <div className="font-semibold">
                        Total: ${total.toFixed(2)}
                    </div>
                </>
            )}
        </div>
    );
};

export default CheckoutComponent;
