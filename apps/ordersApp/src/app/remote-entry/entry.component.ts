import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderListComponent } from '../components/order-list/OrderListComponent.component';
import { RouterOutlet } from '@angular/router';

@Component({
  standalone: true,
  selector: 'mfe-order-entry',
  imports: [RouterOutlet],
  template: `<router-outlet></router-outlet>`
})
export class RemoteEntryComponent {}
