import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface OrderItem {
    id: string;
    productId: string;
    productName: string;
    price: number;
    quantity: number;
    timestamp: string;
}

@Component({
  selector: 'mfe-storefront-popular-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './popular-products.component.html',
})
export class PopularProductsComponent {
    
    addToOrder(productId: string, productName: string, price: number) {
        try {
            // Get existing orders from localStorage
            const existingOrders: OrderItem[] = JSON.parse(localStorage.getItem('orders') ?? '[]');
            
            // Create new order item
            const orderItem: OrderItem = {
                id: Date.now().toString(),
                productId,
                productName,
                price,
                quantity: 1,
                timestamp: new Date().toISOString()
            };
            
            // Add to orders
            const updatedOrders = [...existingOrders, orderItem];
            localStorage.setItem('orders', JSON.stringify(updatedOrders));
            
            // Dispatch custom event to notify header component
            window.dispatchEvent(new CustomEvent('orderAdded', { 
                detail: { orderItem, totalOrders: updatedOrders.length } 
            }));
            
            console.log('Order added successfully:', orderItem);
            
            // Show user feedback
            alert(`Added "${productName}" to your order!`);
            
        } catch (error) {
            console.error('Error adding order:', error);
            alert('Error adding item to order');
        }
    }
}
