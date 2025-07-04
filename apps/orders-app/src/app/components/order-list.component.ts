import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface OrderItem {
  name: string;
  description: string;
  price: string;
}

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'mfe-order-list',
  template: `
    <div class="order-md-last">
      <h4 class="d-flex justify-content-between align-items-center mb-3">
        <span class="text-primary">Your cart</span>
        <span class="badge bg-primary rounded-pill">{{ orders.length }}</span>
      </h4>
      <ul class="list-group mb-3">
        <li 
          class="list-group-item d-flex justify-content-between lh-sm"
          *ngFor="let order of orders"
        >
          <div>
            <h6 class="my-0">{{ order.name }}</h6>
            <small class="text-body-secondary">{{ order.description }}</small>
          </div>
          <span class="text-body-secondary">{{ order.price }}</span>
        </li>
        <li class="list-group-item d-flex justify-content-between">
          <span>Total (USD)</span>
          <strong>{{ total }}</strong>
        </li>
      </ul>

      <button class="w-100 btn btn-primary btn-lg" type="submit">Continue to checkout</button>
    </div>
  `,
  styles: [`
    .badge {
      font-size: 0.75em;
    }
    .text-primary {
      color: #0d6efd !important;
    }
    .bg-primary {
      background-color: #0d6efd !important;
    }
    .text-body-secondary {
      color: #6c757d !important;
    }
  `]
})
export class OrderListComponent {
  orders: OrderItem[] = [
    {
      name: 'Growers cider',
      description: 'Brief description',
      price: '$12'
    },
    {
      name: 'Fresh grapes',
      description: 'Brief description',
      price: '$8'
    },
    {
      name: 'Heinz tomato ketchup',
      description: 'Brief description',
      price: '$5'
    }
  ];

  get total(): string {
    const sum = this.orders.reduce((acc, order) => {
      return acc + parseInt(order.price.replace('$', ''));
    }, 0);
    return `$${sum}`;
  }
} 