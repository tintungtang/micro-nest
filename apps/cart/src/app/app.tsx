// eslint-disable-next-line @typescript-eslint/no-unused-vars
// import styles from './app.module.scss';
//
// import NxWelcome from './nx-welcome';
//
// export function App() {
//     return (
//         <div>
//             <NxWelcome title="cart" />
//         </div>
//     );
// }
//
// export default App;

// import styles from './app.module.scss';
import ReactDOM from 'react-dom';


export function App() {
    return (
        <div className="p-4">
            <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
                <div className="px-6 py-4">
                    <h1 className="font-bold text-xl mb-2">Cart</h1>
                    <p className="text-gray-700 text-base">This is the React Cart page styled with TailAdmin.</p>
                </div>
            </div>
        </div>
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
