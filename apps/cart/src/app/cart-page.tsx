import { useEffect, useState } from 'react';
import {
    CartItem,
    getCartItems,
    MFE_EVENTS,
    Order,
    placeOrder,
    removeFromCart,
    requestNavigation,
} from 'hub';

const SHIPPING_FLAT = 5;
const FREE_SHIPPING_FROM = 50;

export function CartPage() {
    const [items, setItems] = useState<CartItem[]>(() => getCartItems());
    const [placedOrder, setPlacedOrder] = useState<Order | null>(null);

    useEffect(() => {
        const refresh = () => setItems(getCartItems());
        window.addEventListener(MFE_EVENTS.cartChanged, refresh);
        return () => window.removeEventListener(MFE_EVENTS.cartChanged, refresh);
    }, []);

    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shipping = subtotal === 0 || subtotal >= FREE_SHIPPING_FROM ? 0 : SHIPPING_FLAT;
    const total = subtotal + shipping;

    const onPlaceOrder = () => {
        const order = placeOrder();
        if (order) {
            setPlacedOrder(order);
        }
    };

    if (placedOrder) {
        return (
            <section className="container py-4" style={{ maxWidth: 640 }}>
                <div className="alert alert-success">
                    <h4 className="alert-heading">Thank you for your order!</h4>
                    <p className="mb-0">
                        Order <strong>{placedOrder.id}</strong> was placed for{' '}
                        <strong>${placedOrder.total.toFixed(2)}</strong>. You can follow it on the
                        orders page.
                    </p>
                </div>
                <div className="d-flex gap-2">
                    <button
                        className="btn btn-primary"
                        onClick={() => requestNavigation('/orders')}
                    >
                        View my orders
                    </button>
                    <button
                        className="btn btn-outline-secondary"
                        onClick={() => requestNavigation('/pages/products')}
                    >
                        Continue shopping
                    </button>
                </div>
            </section>
        );
    }

    if (items.length === 0) {
        return (
            <section className="container py-4" style={{ maxWidth: 640 }}>
                <h2 className="mb-3">Shopping cart</h2>
                <p className="text-muted">Your cart is empty.</p>
                <button
                    className="btn btn-primary"
                    onClick={() => requestNavigation('/pages/products')}
                >
                    Browse products
                </button>
            </section>
        );
    }

    return (
        <section className="container py-4">
            <h2 className="mb-4">Shopping cart</h2>
            <div className="row g-4">
                <div className="col-lg-8">
                    <table className="table align-middle">
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th className="text-center">Qty</th>
                                <th className="text-end">Price</th>
                                <th className="text-end">Subtotal</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.name}</td>
                                    <td className="text-center">{item.quantity}</td>
                                    <td className="text-end">${item.price.toFixed(2)}</td>
                                    <td className="text-end">
                                        ${(item.price * item.quantity).toFixed(2)}
                                    </td>
                                    <td className="text-end">
                                        <button
                                            className="btn btn-sm btn-outline-danger"
                                            aria-label={`Remove ${item.name}`}
                                            onClick={() => removeFromCart(item.id)}
                                        >
                                            &times;
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="col-lg-4">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title mb-3">Checkout summary</h5>
                            <div className="d-flex justify-content-between">
                                <span>Subtotal</span>
                                <span>${subtotal.toFixed(2)}</span>
                            </div>
                            <div className="d-flex justify-content-between">
                                <span>Shipping</span>
                                <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                            </div>
                            <hr />
                            <div className="d-flex justify-content-between fw-bold mb-3">
                                <span>Total (USD)</span>
                                <span>${total.toFixed(2)}</span>
                            </div>
                            <button className="btn btn-primary w-100" onClick={onPlaceOrder}>
                                Place order
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default CartPage;
