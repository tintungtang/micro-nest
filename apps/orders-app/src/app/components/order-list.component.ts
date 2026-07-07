import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MfeBadgeComponent, MfeHeaderComponent } from 'shared-ui';
import { getOrders, MFE_EVENTS, Order } from 'hub';

@Component({
  standalone: true,
  imports: [CommonModule, RouterLink, MfeBadgeComponent, MfeHeaderComponent],
  selector: 'mfe-order-list',
  template: `
    <section class="container py-4">
      <mfe-ui-header
        title="Your orders"
        subtitle="Orders placed from the checkout appear here"
      ></mfe-ui-header>

      <p *ngIf="orders.length === 0" class="text-muted">
        You have no orders yet. Add products to your cart and check out to create one.
      </p>

      <div class="list-group" *ngIf="orders.length > 0">
        <a
          *ngFor="let order of orders"
          [routerLink]="[order.id]"
          class="list-group-item list-group-item-action d-flex justify-content-between align-items-center gap-3 py-3"
        >
          <div>
            <h6 class="my-0">{{ order.id }}</h6>
            <small class="text-body-secondary">
              {{ order.placedAt | date: 'medium' }} &middot; {{ itemCount(order) }} item(s)
            </small>
          </div>
          <div class="d-flex align-items-center gap-3">
            <mfe-ui-badge [variant]="badgeVariant(order)">{{ order.status }}</mfe-ui-badge>
            <strong>\${{ order.total.toFixed(2) }}</strong>
          </div>
        </a>
      </div>
    </section>
  `
})
export class OrderListComponent implements OnInit, OnDestroy {
  orders: Order[] = [];
  private readonly refresh = () => (this.orders = getOrders());

  ngOnInit(): void {
    this.refresh();
    window.addEventListener(MFE_EVENTS.ordersChanged, this.refresh);
  }

  ngOnDestroy(): void {
    window.removeEventListener(MFE_EVENTS.ordersChanged, this.refresh);
  }

  itemCount(order: Order): number {
    return order.items.reduce((sum, item) => sum + item.quantity, 0);
  }

  badgeVariant(order: Order): 'success' | 'info' | 'warning' | 'danger' {
    switch (order.status) {
      case 'Delivered':
        return 'success';
      case 'Shipped':
        return 'info';
      case 'Cancelled':
        return 'danger';
      default:
        return 'warning';
    }
  }
}
