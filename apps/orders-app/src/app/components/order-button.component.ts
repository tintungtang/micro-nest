import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'mfe-order-button-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-button.component.html',
})
export class OrderButtonComponent implements OnInit, OnDestroy {
  CART_KEY = 'cartItems';
  count = 0;
  handler: (e: any) => void = () => {};

  ngOnInit() {
    const stored = JSON.parse(localStorage.getItem(this.CART_KEY) || '[]');
    this.count = stored.length;

    this.handler = (e: any) => {
      const items = JSON.parse(localStorage.getItem(this.CART_KEY) || '[]');
      items.push(e.detail);
      localStorage.setItem(this.CART_KEY, JSON.stringify(items));
      this.count = items.length;
    };

    window.addEventListener('cart:add', this.handler);
  }

  ngOnDestroy() {
    window.removeEventListener('cart:add', this.handler);
  }
}
