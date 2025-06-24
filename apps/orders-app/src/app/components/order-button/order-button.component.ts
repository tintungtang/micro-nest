import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

const CART_KEY = 'cartItems';

@Component({
    selector: 'app-order-button',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './order-button.component.html',
    styleUrl: './order-button.component.css',
})
export class OrderButtonComponent {
    count = 0;
    private handler = (event: CustomEvent) => {
        const items = JSON.parse(localStorage.getItem(CART_KEY) || '[]');
        items.push(event.detail);
        localStorage.setItem(CART_KEY, JSON.stringify(items));
        this.count = items.length;
    };

    ngOnInit(): void {
        const stored = JSON.parse(localStorage.getItem(CART_KEY) || '[]');
        this.count = stored.length;

        window.addEventListener('cart:add', this.handler as EventListener);
    }

    ngOnDestroy(): void {
        window.removeEventListener('cart:add', this.handler as EventListener);
    }

    navigateToCart(): void {
        console.log('/pages/cart');
    }
}
