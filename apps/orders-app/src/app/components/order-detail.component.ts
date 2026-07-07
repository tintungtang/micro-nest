import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MfeBadgeComponent, MfeCardComponent, MfeHeaderComponent } from 'shared-ui';
import { getOrder, Order } from 'hub';

@Component({
  standalone: true,
  imports: [CommonModule, RouterLink, MfeBadgeComponent, MfeCardComponent, MfeHeaderComponent],
  selector: 'mfe-order-detail',
  template: `
    <section class="container py-4">
      <nav class="mb-3">
        <a routerLink="../" class="text-decoration-none">&larr; Back to orders</a>
      </nav>

      <ng-container *ngIf="order; else notFound">
        <mfe-ui-header
          [title]="'Order ' + order.id"
          [subtitle]="'Placed ' + (order.placedAt | date: 'medium')"
        >
          <mfe-ui-badge [variant]="badgeVariant()">{{ order.status }}</mfe-ui-badge>
        </mfe-ui-header>

        <mfe-ui-card title="Items">
          <table class="table align-middle mb-0">
            <thead>
              <tr>
                <th>Product</th>
                <th class="text-center">Qty</th>
                <th class="text-end">Price</th>
                <th class="text-end">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let item of order.items">
                <td>{{ item.name }}</td>
                <td class="text-center">{{ item.quantity }}</td>
                <td class="text-end">\${{ item.price.toFixed(2) }}</td>
                <td class="text-end">\${{ (item.price * item.quantity).toFixed(2) }}</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <th colspan="3" class="text-end">Total (USD)</th>
                <th class="text-end">\${{ order.total.toFixed(2) }}</th>
              </tr>
            </tfoot>
          </table>
        </mfe-ui-card>
      </ng-container>

      <ng-template #notFound>
        <mfe-ui-card title="Order not found">
          <p class="mb-0">This order does not exist (or was placed in another browser).</p>
        </mfe-ui-card>
      </ng-template>
    </section>
  `
})
export class OrderDetailComponent implements OnInit {
  order?: Order;

  constructor(private readonly route: ActivatedRoute) {}

  ngOnInit(): void {
    // URL state: the order id travels in the route (/orders/:id).
    const id = this.route.snapshot.paramMap.get('id') ?? '';
    this.order = getOrder(id);
  }

  badgeVariant(): 'success' | 'info' | 'warning' | 'danger' {
    switch (this.order?.status) {
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
