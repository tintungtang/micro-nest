import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CartCompoent from './components/cart.compoent';
import CheckoutComponent from './components/checkout.component';

export function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<CartCompoent />} />
                <Route path="/checkout" element={<CheckoutComponent />} />
            </Routes>
        </BrowserRouter>
    );
}
export function defineReactWebComponent() {
    class ReactWebComponent extends HTMLElement {
        connectedCallback() {
            ReactDOM.render(<App />, this);
        }
        disconnectedCallback() {
            ReactDOM.unmountComponentAtNode(this);
        }
    }
    if (!customElements.get('cart-react-app')) {
        customElements.define('cart-react-app', ReactWebComponent);
    }
}
defineReactWebComponent();
export default App;
