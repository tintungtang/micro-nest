import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export type ButtonVariant = 'primary' | 'outline';
export type ButtonSize = 'small' | 'medium' | 'large';

@Component({
    selector: 'app-order-button',
    standalone: true,
    imports: [CommonModule],
    template: `
        <button 
            [class]="getButtonClasses()"
            [disabled]="disabled"
            (click)="onOrderClick()"
            type="button">
            <svg *ngIf="!disabled" 
                 class="me-1" 
                 width="16" 
                 height="16" 
                 viewBox="0 0 24 24" 
                 fill="none" 
                 xmlns="http://www.w3.org/2000/svg">
                <path 
                    d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.7 15.3C4.3 15.7 4.6 16.5 5.1 16.5H17M17 13V17C17 17.6 17.4 18 18 18S19 17.6 19 17V13M9 19.5C9.8 19.5 10.5 20.2 10.5 21S9.8 22.5 9 22.5 7.5 21.8 7.5 21 8.2 19.5 9 19.5ZM20 19.5C20.8 19.5 21.5 20.2 21.5 21S20.8 22.5 20 22.5 18.5 21.8 18.5 21 19.2 19.5 20 19.5Z" 
                    stroke="currentColor" 
                    stroke-width="2" 
                    stroke-linecap="round" 
                    stroke-linejoin="round"
                    fill="none">
                </path>
            </svg>
            <span *ngIf="disabled" class="spinner-border spinner-border-sm me-2" aria-label="Loading">
            </span>
            {{ buttonText }}
            <span *ngIf="orderCount > 0" class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {{ orderCount }}
                <span class="visually-hidden">orders in cart</span>
            </span>
        </button>
    `,
    styles: [`
        .btn {
            position: relative;
            display: inline-block;
            font-weight: 400;
            line-height: 1.5;
            color: #212529;
            text-align: center;
            text-decoration: none;
            vertical-align: middle;
            cursor: pointer;
            user-select: none;
            background-color: transparent;
            border: 1px solid transparent;
            border-radius: 0.375rem;
            transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
        }
        .btn:hover {
            text-decoration: none;
        }
        .btn:focus {
            outline: 0;
            box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
        }
        .btn:disabled {
            pointer-events: none;
            opacity: 0.65;
        }
        .btn-primary {
            color: #fff;
            background-color: #0d6efd;
            border-color: #0d6efd;
        }
        .btn-primary:hover {
            color: #fff;
            background-color: #0b5ed7;
            border-color: #0a58ca;
        }
        .btn-primary:focus {
            color: #fff;
            background-color: #0b5ed7;
            border-color: #0a58ca;
            box-shadow: 0 0 0 0.25rem rgba(49, 132, 253, 0.5);
        }
        .btn-outline {
            color: #0d6efd;
            border-color: #0d6efd;
            background-color: transparent;
        }
        .btn-outline:hover {
            color: #fff;
            background-color: #0d6efd;
            border-color: #0d6efd;
        }
        .btn-outline:focus {
            color: #fff;
            background-color: #0d6efd;
            border-color: #0d6efd;
            box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.5);
        }
        .btn-small {
            padding: 0.25rem 0.5rem;
            font-size: 0.875rem;
            border-radius: 0.25rem;
        }
        .btn-medium {
            padding: 0.375rem 0.75rem;
            font-size: 1rem;
        }
        .btn-large {
            padding: 0.5rem 1rem;
            font-size: 1.125rem;
            border-radius: 0.5rem;
        }
        .position-absolute {
            position: absolute !important;
        }
        .top-0 {
            top: 0 !important;
        }
        .start-100 {
            left: 100% !important;
        }
        .translate-middle {
            transform: translate(-50%, -50%) !important;
        }
        .badge {
            display: inline-block;
            padding: 0.35em 0.65em;
            font-size: 0.75em;
            font-weight: 700;
            line-height: 1;
            color: #fff;
            text-align: center;
            white-space: nowrap;
            vertical-align: baseline;
            border-radius: 0.375rem;
        }
        .rounded-pill {
            border-radius: 50rem !important;
        }
        .bg-danger {
            background-color: #dc3545 !important;
        }
        .visually-hidden {
            position: absolute !important;
            width: 1px !important;
            height: 1px !important;
            padding: 0 !important;
            margin: -1px !important;
            overflow: hidden !important;
            clip: rect(0, 0, 0, 0) !important;
            white-space: nowrap !important;
            border: 0 !important;
        }
        .me-1 {
            margin-right: 0.25rem !important;
        }
        .me-2 {
            margin-right: 0.5rem !important;
        }
        .spinner-border {
            display: inline-block;
            width: 2rem;
            height: 2rem;
            vertical-align: -0.125em;
            border: 0.25em solid currentColor;
            border-right-color: transparent;
            border-radius: 50%;
            animation: spinner-border 0.75s linear infinite;
        }
        .spinner-border-sm {
            width: 1rem;
            height: 1rem;
            border-width: 0.2em;
        }
        @keyframes spinner-border {
            to {
                transform: rotate(360deg);
            }
        }
    `]
})
export class OrderButtonComponent {
    @Input() buttonText = 'Add to Order';
    @Input() orderCount = 0;
    @Input() variant: ButtonVariant = 'primary';
    @Input() size: ButtonSize = 'medium';
    @Input() disabled = false;
    @Input() productId?: string;
    @Input() productName?: string;
    @Input() price?: number;
    
    @Output() orderClick = new EventEmitter<{ productId?: string; productName?: string; price?: number }>();

    onOrderClick(): void {
        if (!this.disabled) {
            // Add to localStorage for order management
            this.addToOrders();
            
            // Emit event
            this.orderClick.emit({
                productId: this.productId,
                productName: this.productName,
                price: this.price
            });
        }
    }

    private addToOrders(): void {
        try {
            const existingOrders = JSON.parse(localStorage.getItem('orders') ?? '[]');
            
            const orderItem = {
                id: Date.now().toString(),
                productId: this.productId ?? 'default',
                productName: this.productName ?? 'Product',
                price: this.price ?? 0,
                quantity: 1,
                timestamp: new Date().toISOString()
            };
            
            const updatedOrders = [...existingOrders, orderItem];
            localStorage.setItem('orders', JSON.stringify(updatedOrders));
            
            // Dispatch custom event
            window.dispatchEvent(new CustomEvent('orderAdded', { 
                detail: { orderItem, totalOrders: updatedOrders.length } 
            }));
            
            console.log('Order added successfully:', orderItem);
        } catch (error) {
            console.error('Error adding order:', error);
        }
    }

    getButtonClasses(): string {
        const baseClasses = 'btn';
        const variantClass = this.variant === 'outline' ? 'btn-outline' : 'btn-primary';
        const sizeClass = `btn-${this.size}`;
        
        return `${baseClasses} ${variantClass} ${sizeClass}`;
    }
}
