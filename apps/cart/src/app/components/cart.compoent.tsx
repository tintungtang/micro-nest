import { useNavigate } from 'react-router-dom';

const CartCompoent = () => {
    const navigate = useNavigate();
    const handleCheckout = () => {
        navigate('/checkout');
    };
    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Your cart</h2>
            <button
                onClick={handleCheckout}
                className="bg-blue-500 text-white px-4 py-2 rounded"
            >
                Go to Checkout
            </button>
        </div>
    );
};

export default CartCompoent;
