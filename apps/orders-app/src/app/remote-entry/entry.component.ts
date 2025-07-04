import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NxWelcomeComponent } from './nx-welcome.component';
import { OrderListComponent } from '../order-list/order-list.component';

@Component({
    standalone: true,
    imports: [CommonModule, NxWelcomeComponent, OrderListComponent],
    selector: 'app-orders-app-entry',
    template: `<app-order-list></app-order-list>`,
})
export class RemoteEntryComponent {}
