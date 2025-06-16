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
        <div className="bg-gray-100 p-4">
            <h1 className="text-2xl font-bold">Home</h1>
            <p className="text-gray-600">This is the React Home page</p>
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
