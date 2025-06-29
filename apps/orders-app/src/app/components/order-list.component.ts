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
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent {
  
  // Static order data as required
  orderItems: OrderItem[] = [
    {
      id: 1,
      name: 'Growers cider',
      description: 'Fresh apple cider from local growers',
      price: 12
    },
    {
      id: 2,
      name: 'Fresh grapes',
      description: 'Organic red grapes',
      price: 8
    },
    {
      id: 3,
      name: 'Heinz tomato ketchup',
      description: 'Classic tomato ketchup',
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
    // This will be implemented later when integrating with the storefront
  }
} 