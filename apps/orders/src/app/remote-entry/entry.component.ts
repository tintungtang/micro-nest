import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderListComponent } from '../components/order-list.component';

@Component({
    standalone: true,
    imports: [CommonModule, OrderListComponent],
    selector: 'mfe-order-entry',
    template: `
      <div class="container mt-4">
        <h2>Order Management</h2>
        <mfe-order-list></mfe-order-list>
      </div>
    `,
})
export class RemoteEntryComponent {}
