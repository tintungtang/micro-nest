import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-order-button',
    standalone: true,
    imports: [CommonModule, RouterModule],
    template: `
        <button 
            class="order-button"
            [routerLink]="['/orders']"
            type="button">
            View Orders
        </button>
    `,
    styles: [`
        .order-button {
            padding: 8px 16px;
            background-color: #007bff;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 14px;
        }
        
        .order-button:hover {
            background-color: #0056b3;
        }
    `]
})
export class OrderButtonComponent {}