import { createCustomElement } from '@angular/elements';
import { createApplication } from '@angular/platform-browser';
import { OrderButtonComponent } from '../components/order-button.component';

export async function registerOrderButtonElement() {
    try {
        // Check if already registered
        if (customElements.get('mfe-order-button')) {
            return;
        }

        // Create Angular application
        const app = await createApplication();
        
        // Create custom element
        const OrderButtonElement = createCustomElement(OrderButtonComponent, { 
            injector: app.injector 
        });
        
        // Register custom element
        customElements.define('mfe-order-button', OrderButtonElement);
        
        console.log('mfe-order-button custom element registered successfully');
    } catch (error) {
        console.error('Failed to register mfe-order-button custom element:', error);
    }
}

// Auto-register when module is imported
registerOrderButtonElement();
