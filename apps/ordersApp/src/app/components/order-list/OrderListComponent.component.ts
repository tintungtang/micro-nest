import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
interface OrderItem {
    id: number;
    name: string;
    description: string;
    price: number;
    quantity: number;
}
@Component({
    standalone: true,
    selector: 'mfe-order-list-component',
    imports: [CommonModule],
    templateUrl: './OrderListComponent.component.html',
})
export class OrderListComponent {
    orderItems: OrderItem[] = [];

    ngOnInit(): void {
        const stored = localStorage.getItem('cartItems');
        const rawItems = stored ? JSON.parse(stored) : [];
      
        const grouped: { [key: number]: OrderItem } = {};
      
        for (const item of rawItems) {
          if (grouped[item.id]) {
            grouped[item.id].quantity += 1;
          } else {
            grouped[item.id] = { ...item, quantity: 1 };
          }
        }
      
        this.orderItems = Object.values(grouped);
      }

    get totalPrice(): number {
        return this.orderItems.reduce((total, item) => total + item.price, 0);
    }

    get itemCount(): number {
      return this.orderItems.reduce((total, item) => total + item.quantity, 0);
    }

    onContinueToCheckout(): void {
        console.log('Continue to checkout clicked');
    }
}
