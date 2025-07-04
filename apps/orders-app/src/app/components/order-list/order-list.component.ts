import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'mfe-order-order-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent {
  cartItems = [
    { name: 'Growers cider', description: 'Brief description', price: 12 },
    { name: 'Fresh grapes', description: 'Brief description', price: 8 },
    { name: 'Heinz tomato ketchup', description: 'Brief description', price: 5 },
  ];

  get total(): number {
    return this.cartItems.reduce((sum, item) => sum + item.price, 0);
  }
}