import { Component, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

const CART_KEY = 'cartItems';

@Component({
    selector: 'mfe-order-button',
    standalone: true,
    imports: [CommonModule],
    template: `
        <a
            class="p-2 mx-1 position-relative mfe-order-button-link"
            (click)="navigateToOrders()"
            style="cursor: pointer;"
        >
            <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M6 2L5 6H19L18 2H6ZM5 8V22H19V8H5ZM12 10C13.1 10 14 10.9 14 12H10C10 10.9 10.9 10 12 10Z"
                    fill="currentColor"
                />
            </svg>

            <span
                class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary"
                *ngIf="count > 0"
            >
                {{ count }}
            </span>
        </a>
    `,
})
export class OrderButtonComponent implements OnInit, OnDestroy {
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
        this.router.navigate(['/orders']);
    }
}
