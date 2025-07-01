import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderListComponent } from '../order-list/order-list.component';

@Component({
    selector: 'mfe-order-order-button',
    standalone: true,
    imports: [CommonModule, OrderListComponent],
    templateUrl: './order-button.component.html',
    styleUrl: './order-button.component.css',
})
export class OrderButtonComponent {
    showOrders = false;

    toggleModal() {
        this.showOrders = !this.showOrders;
    }

    closeModal(event: Event) {
        event.stopPropagation();
        this.showOrders = false;
    }
}
