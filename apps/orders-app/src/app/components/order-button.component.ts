import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'mfe-order-button',
  template: `
    <a
      class="p-2 mx-1 position-relative"
      (click)="navigateToOrders()"
      style="cursor: pointer; text-decoration: none;"
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M7 4h14v2l-1 9H8l-1-9H5V4H3V2h4l1 2zM9 7v7h10V7H9zm3 9a2 2 0 1 1 0 4 2 2 0 0 1 0-4zm6 0a2 2 0 1 1 0 4 2 2 0 0 1 0-4z"/>
      </svg>
      <span 
        *ngIf="count > 0"
        class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
      >
        {{ count }}
        <span class="visually-hidden">items in cart</span>
      </span>
    </a>
  `,
  styles: [`
    .position-relative {
      position: relative;
    }
    .position-absolute {
      position: absolute;
    }
    .top-0 {
      top: 0;
    }
    .start-100 {
      left: 100%;
    }
    .translate-middle {
      transform: translate(-50%, -50%);
    }
    .badge {
      padding: 0.35em 0.65em;
      font-size: 0.75em;
      font-weight: 700;
      line-height: 1;
      text-align: center;
      white-space: nowrap;
      vertical-align: baseline;
      border-radius: 0.375rem;
    }
    .rounded-pill {
      border-radius: 50rem;
    }
    .bg-danger {
      background-color: #dc3545;
      color: white;
    }
    .visually-hidden {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border: 0;
    }
  `]
})
export class OrderButtonComponent implements OnInit, OnDestroy {
  count = 0;
  private readonly CART_KEY = 'CART_ITEMS';
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
    console.log('Navigate to orders page');
    // In a real app, you would use Angular Router here
    // For now, just redirect to the orders page
    window.location.href = '/orders';
  }
} 