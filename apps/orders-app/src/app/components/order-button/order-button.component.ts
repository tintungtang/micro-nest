import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderListComponent } from '../order-list/order-list.component';
import { Router } from '@angular/router';

@Component({
    selector: 'mfe-order-order-button',
    standalone: true,
    imports: [CommonModule, OrderListComponent],
    templateUrl: './order-button.component.html',
    styleUrl: './order-button.component.css',
})
export class OrderButtonComponent {
    constructor(private router: Router) { }

    goToOrders() {
        console.log('🔁 Trying to navigate to /pages/orders-app...');
        this.router.navigateByUrl('/pages/orders-app').then(result => {
            console.log('✅ Navigation result:', result);
        }).catch(error => {
            console.error('❌ Navigation error:', error);
        });
    }
}