import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CartPage from './cart-page';

export function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/cart" element={<CartPage />} />
                <Route path="/pages/cart" element={<CartPage />} />
                <Route path="*" element={<CartPage />} />
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
