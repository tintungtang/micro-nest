import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderListComponent } from '../components/order-list/order-list.component';

@Component({
  standalone: true,
  imports: [CommonModule, OrderListComponent],
  selector: 'app-orders-app-entry',
  template: `<mfe-order-order-list></mfe-order-order-list>`,
})
export class RemoteEntryComponent {}