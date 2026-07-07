import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { getOrders, MFE_EVENTS, requestNavigation } from 'hub';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'mfe-order-button',
  template: `
    <a
      class="p-2 mx-1 position-relative"
      (click)="navigateToOrders()"
      title="My orders"
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
        <span class="visually-hidden">orders placed</span>
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
  private readonly refresh = () => (this.count = getOrders().length);

  ngOnInit(): void {
    this.refresh();
    window.addEventListener(MFE_EVENTS.ordersChanged, this.refresh);
  }

  ngOnDestroy(): void {
    window.removeEventListener(MFE_EVENTS.ordersChanged, this.refresh);
  }

  navigateToOrders(): void {
    // Custom event the shell listens to — keeps this remote router-agnostic.
    requestNavigation('/orders');
  }
}
