import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartEventService } from '../services/cart-event.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-order-button',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './order-button.component.html',
    styleUrl: './order-button.component.css',
})
export class OrderButtonComponent implements OnInit, OnDestroy {
    private readonly CART_KEY = 'cartItems';
    private cartSubscription: Subscription | undefined;
    count = 0;

    constructor(private cartEventService: CartEventService) { }

    ngOnInit(): void {
        const stored = JSON.parse(localStorage.getItem(this.CART_KEY) || '[]');
        this.count = stored.length;

        // Subscribe to cart add events
        this.cartSubscription = this.cartEventService.getCartAddEvents().subscribe(detail => {
            const items = JSON.parse(localStorage.getItem(this.CART_KEY) || '[]');
            items.push(detail);
            localStorage.setItem(this.CART_KEY, JSON.stringify(items));
            this.count = items.length;
        });
    }

    ngOnDestroy(): void {
        // Clean up subscription when component is destroyed
        this.cartSubscription?.unsubscribe();
    };
}
