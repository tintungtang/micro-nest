import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
const CART_KEY = 'cartItems';
@Component({
    selector: 'mfe-order-cart-button',
    imports: [CommonModule],
    templateUrl: 'CartButton.component.html',
})
export class CartButtonComponent implements OnInit, OnDestroy {
    count = 0;
    private eventHandler?: (event: CustomEvent) => void;

    constructor(private router: Router, private elementRef: ElementRef) {}

    ngOnInit(): void {
        // Load initial count from localStorage
        this.loadCartCount();

        // Listen for cart:add custom events
        this.eventHandler = (event: CustomEvent) => {
            const items = JSON.parse(localStorage.getItem(CART_KEY) || '[]');
            items.push(event.detail);
            localStorage.setItem(CART_KEY, JSON.stringify(items));
            this.count = items.length;
        };

        window.addEventListener('cart:add', this.eventHandler as EventListener);
    }

    ngOnDestroy(): void {
        if (this.eventHandler) {
            window.removeEventListener(
                'cart:add',
                this.eventHandler as EventListener
            );
        }
    }

    private loadCartCount(): void {
        const stored = JSON.parse(localStorage.getItem(CART_KEY) || '[]');
        this.count = stored.length;
    }

    navigateToOrders(): void {
        this.router.navigateByUrl('/pages/orders');
    }
}
