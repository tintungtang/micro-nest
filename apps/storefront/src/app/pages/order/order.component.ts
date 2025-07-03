import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderListComponent } from 'orders-app/OrderList';
import { MfeStorefrontSectionComponent } from '../../components/section/section.component';

@Component({
  selector: 'mfe-storefront-order',
  standalone: true,
  imports: [CommonModule, OrderListComponent, MfeStorefrontSectionComponent],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css',
})
export class OrderComponent {}
