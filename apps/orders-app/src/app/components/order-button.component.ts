import { Component, OnInit, OnDestroy, createComponent, ApplicationRef, Injector, EnvironmentInjector, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

const CART_KEY = 'cartItems';

@Component({
    selector: 'app-order-button',
    standalone: true,
    imports: [CommonModule, RouterModule],
    template: `
        <a
            class="order-button p-2 mx-1 position-relative"
            [routerLink]="['/orders']"
            type="button">
            <svg width="24" height="24">
                <use xlinkHref="#shopping-bag"></use>
            </svg>
            <span 
                *ngIf="count > 0" 
                class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary">
                {{ count }}
            </span>
        </a>
    `,
    styles: [`
        .order-button {
            text-decoration: none;
            cursor: pointer;
            display: inline-block;
        }
        
        .order-button:hover {
            opacity: 0.8;
        }
    `]
})
export class OrderButtonComponent implements OnInit, OnDestroy {
    count = 0;
    private eventHandler?: (event: any) => void;

    ngOnInit() {
        const stored = JSON.parse(localStorage.getItem(CART_KEY) || '[]');
        this.count = stored.length;

        this.eventHandler = (e: any) => {
            const items = JSON.parse(localStorage.getItem(CART_KEY) || '[]');
            items.push(e.detail);
            localStorage.setItem(CART_KEY, JSON.stringify(items));
            this.count = items.length;
        };

        window.addEventListener('cart:add', this.eventHandler);
    }

    ngOnDestroy() {
        if (this.eventHandler) {
            window.removeEventListener('cart:add', this.eventHandler);
        }
    }
}

export function defineOrderButtonElement() {
    class OrderButtonElement extends HTMLElement {
        private componentRef?: any;
        
        connectedCallback() {
            if (!this.componentRef) {
                this.innerHTML = `
                    <a class="order-button p-2 mx-1 position-relative" href="/orders" style="text-decoration: none; cursor: pointer; display: inline-block;">
                        <svg width="24" height="24">
                            <use xlink:href="#shopping-bag"></use>
                        </svg>
                        <span id="cart-count" class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary" style="display: none;"></span>
                    </a>
                `;
                
                this.updateCartCount();
                this.setupEventListener();
            }
        }
        
        private updateCartCount() {
            const stored = JSON.parse(localStorage.getItem('cartItems') || '[]');
            const countElement = this.querySelector('#cart-count') as HTMLElement;
            if (countElement) {
                if (stored.length > 0) {
                    countElement.textContent = stored.length.toString();
                    countElement.style.display = 'inline';
                } else {
                    countElement.style.display = 'none';
                }
            }
        }
        
        private setupEventListener() {
            const handler = (e: any) => {
                const items = JSON.parse(localStorage.getItem('cartItems') || '[]');
                items.push(e.detail);
                localStorage.setItem('cartItems', JSON.stringify(items));
                this.updateCartCount();
            };
            
            window.addEventListener('cart:add', handler);
            
            // Store reference for cleanup
            (this as any)._eventHandler = handler;
        }
        
        disconnectedCallback() {
            if ((this as any)._eventHandler) {
                window.removeEventListener('cart:add', (this as any)._eventHandler);
            }
        }
    }
    
    if (!customElements.get('mfe-order-button')) {
        customElements.define('mfe-order-button', OrderButtonElement);
    }
}

defineOrderButtonElement();