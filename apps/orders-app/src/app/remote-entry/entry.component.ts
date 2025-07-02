import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersListComponent } from '../components/orders-list.component';

@Component({
    standalone: true,
    imports: [CommonModule, OrdersListComponent],
    selector: 'app-orders-app-entry',
    template: `
      <div class="container my-4">
        <h2 class="mb-4">Orders Management</h2>
        <mfe-order-orders-list></mfe-order-orders-list>
      </div>
    `,
})
export class RemoteEntryComponent {}
