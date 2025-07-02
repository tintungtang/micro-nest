import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface OrderItem {
  id: number;
  name: string;
  description: string;
  price: number;
}

@Component({
    selector: 'mfe-order-orders-list',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './orders-list.component.html',
    styleUrl: './orders-list.component.css',
})
export class OrdersListComponent {
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

  get totalItems(): number {
    return this.orderItems.length;
  }

  get totalPrice(): number {
    return this.orderItems.reduce((total, item) => total + item.price, 0);
  }

  onCheckout(): void {
    console.log('Proceeding to checkout with items:', this.orderItems);
    // Add checkout logic here
  }
}
