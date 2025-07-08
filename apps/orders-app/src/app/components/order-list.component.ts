import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface OrderItem {
    name: string;
    description: string;
    price: number;
}

@Component({
    standalone: true,
    imports: [CommonModule],
    selector: 'mfe-order-list',
    template: `
        <div class="order-md-last">
            <h4 class="d-flex justify-content-between align-items-center mb-3">
                <span class="text-primary">Your cart</span>
                <span class="badge bg-primary rounded-pill">{{
                    orders.length
                }}</span>
            </h4>

            <ul class="list-group mb-3">
                <li
                    *ngFor="let item of orders"
                    class="list-group-item d-flex justify-content-between lh-sm"
                >
                    <div>
                        <h6 class="my-0">{{ item.name }}</h6>
                        <small class="text-body-secondary">{{
                            item.description
                        }}</small>
                    </div>
                    <span class="text-body-secondary">\${{ item.price }}</span>
                </li>

                <li class="list-group-item d-flex justify-content-between">
                    <span>Total (USD)</span>
                    <strong>\${{ total }}</strong>
                </li>
            </ul>

            <button class="w-100 btn btn-primary btn-lg" type="submit">
                Continue to checkout
            </button>
        </div>
    `,
    styles: [],
})
export class OrderListComponent {
    orders: OrderItem[] = [
        {
            name: 'Growers cider',
            description: 'Premium apple cider',
            price: 12,
        },
        {
            name: 'Fresh grapes',
            description: 'Seedless green grapes',
            price: 8,
        },
        {
            name: 'Heinz ketchup',
            description: 'Tomato ketchup 500ml',
            price: 5,
        },
        { name: 'Organic bananas', description: '1kg ripe bananas', price: 4 },
        { name: 'Oreo cookies', description: 'Vanilla cream 133g', price: 3 },
    ];

    get total(): number {
        return this.orders.reduce((sum, item) => sum + item.price, 0);
    }
}
