import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface OrderItem {
    id: number;
    name: string;
    description: string;
    price: number;
}

@Component({
    selector: 'mfe-order-list',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './order-list.component.html',
})
export class OrderListComponent {
    orderItems: OrderItem[] = [
        {
            id: 1,
            name: 'Growers cider',
            description: 'Brief description',
            price: 12
        },
        {
            id: 2,
            name: 'Fresh grapes',
            description: 'Brief description',
            price: 8
        },
        {
            id: 3,
            name: 'Heinz tomato ketchup',
            description: 'Brief description',
            price: 5
        }
    ];

    get totalPrice(): number {
        return this.orderItems.reduce((total, item) => total + item.price, 0);
    }

    get itemCount(): number {
        return this.orderItems.length;
    }

    onContinueToCheckout(): void {
        console.log('Continue to checkout clicked');
    }
}
