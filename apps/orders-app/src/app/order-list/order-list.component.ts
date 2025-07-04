import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Order {
  id: string;
  name: string;
  description: string;
  price: number;
}

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="order-md-last">
      <h4 class="d-flex justify-content-between align-items-center mb-3">
        <span class="text-primary">Your cart</span>
        <span class="badge bg-primary rounded-pill">{{ orders.length }}</span>
      </h4>
      <ul class="list-group mb-3">
        <li class="list-group-item d-flex justify-content-between lh-sm" *ngFor="let order of orders">
          <div>
            <h6 class="my-0">{{ order.name }}</h6>
            <small class="text-body-secondary">{{ order.description }}</small>
          </div>
          <span class="text-body-secondary">\${{ order.price }}</span>
        </li>
        <li class="list-group-item d-flex justify-content-between">
          <span>Total (USD)</span>
          <strong>\${{ getTotal() }}</strong>
        </li>
      </ul>
      
      <button class="w-100 btn btn-primary btn-lg" type="submit">Continue to checkout</button>
    </div>
  `,
  styles: []
})
export class OrderListComponent {
  orders: Order[] = [
    {
      id: '1',
      name: 'Growers cider',
      description: 'Brief description',
      price: 12
    },
    {
      id: '2',
      name: 'Fresh grapes',
      description: 'Brief description',
      price: 8
    },
    {
      id: '3',
      name: 'Heinz tomato ketchup',
      description: 'Brief description',
      price: 5
    }
  ];

  getTotal(): number {
    return this.orders.reduce((total, order) => total + order.price, 0);
  }
}