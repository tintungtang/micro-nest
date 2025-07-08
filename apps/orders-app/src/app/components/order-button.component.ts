import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'mfe-order-button',
  templateUrl: './order-button.component.html',
  styleUrls: ['./order-button.component.css'],
})
export class OrderButtonComponent implements OnInit, OnDestroy {
  count = 0;
  private readonly CART_KEY = 'cartItems';
  private eventHandler: ((e: CustomEvent) => void) | null = null;

  ngOnInit(): void {
    const stored = JSON.parse(localStorage.getItem(this.CART_KEY) || '[]');
    this.count = stored.length;

    this.eventHandler = (e: CustomEvent) => {
      const items = JSON.parse(localStorage.getItem(this.CART_KEY) || '[]');
      items.push(e.detail);
      localStorage.setItem(this.CART_KEY, JSON.stringify(items));
      this.count = items.length;
    };

    window.addEventListener('cart:add', this.eventHandler as EventListener);
  }

  ngOnDestroy(): void {
    if (this.eventHandler) {
      window.removeEventListener('cart:add', this.eventHandler as EventListener);
    }
  }

  navigateToOrders(): void {
    window.location.href = '/orders';
  }
}
