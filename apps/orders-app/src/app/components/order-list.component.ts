import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface OrderItem {
    id: number;
    name: string;
    description: string;
    imageUrl: string;
    price: number;
}

@Component({
    selector: 'mfe-order-list-section',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './order-list.component.html',
})
export class OrderListComponent implements OnInit {
    CART_KEY = 'cartItems';
    count = 0;
    orders: OrderItem[] = [];

    ngOnInit() {
        const stored = JSON.parse(localStorage.getItem(this.CART_KEY) || '[]');
        this.count = stored.length;
        this.orders = stored;
    }
}
