import { AfterViewInit, Component, CUSTOM_ELEMENTS_SCHEMA, ViewChild, ViewContainerRef, ComponentRef, Injector, OnDestroy } from '@angular/core';
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
    selector: 'mfe-storefront-dashboard-header',
    standalone: true,
    imports: [ CommonModule ],
    templateUrl: './header.component.html',
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class HeaderComponent implements AfterViewInit, OnDestroy {
    @ViewChild('orderButtonContainer', { read: ViewContainerRef, static: false }) orderButtonContainer!: ViewContainerRef;
    private orderButtonComponent: ComponentRef<unknown> | null = null;
    
    // Order count management
    orderCount = 0;
    
    // Event listener references for cleanup
    private readonly orderAddedListener: (event: Event) => void;
    private readonly storageListener: (event: StorageEvent) => void;

    constructor(private readonly injector: Injector) {
        // Initialize event listeners
        this.orderAddedListener = (event: Event) => {
            const customEvent = event as CustomEvent;
            if (customEvent.detail?.totalOrders) {
                this.orderCount = customEvent.detail.totalOrders;
                console.log('Order count updated via event:', this.orderCount);
                // Note: OrderButton component now handles its own count updates
            } else {
                // Fallback: reload from localStorage
                this.loadOrderCount();
            }
        };

        this.storageListener = (event: StorageEvent) => {
            if (event.key === 'orders') {
                this.loadOrderCount();
            }
        };
    }

    ngAfterViewInit() {
        this.loadOrderCount();
        this.loadOrderButton();
        this.setupOrderEventListener();
    }

    onOrderClick() {
        console.log('Order button clicked, current order count:', this.orderCount);
        // Navigate to orders page or perform order action
        // For now, we'll log the current orders and potentially navigate
        this.showOrderSummary();
    }

    private showOrderSummary() {
        try {
            const orders: OrderItem[] = JSON.parse(localStorage.getItem('orders') ?? '[]');
            console.log('Current orders:', orders);
            
            if (orders.length > 0) {
                // Calculate total price
                const totalPrice = orders.reduce((sum: number, order: OrderItem) => sum + (order.price ?? 0), 0);
                console.log(`You have ${orders.length} items in your order. Total: $${totalPrice.toFixed(2)}`);
                
                // In a real app, you would navigate to the orders page
                // Example: this.router.navigate(['/orders']);
                alert(`You have ${orders.length} items in your order. Total: $${totalPrice.toFixed(2)}`);
            } else {
                console.log('No orders found');
                alert('Your order is empty');
            }
        } catch (error) {
            console.error('Error loading orders:', error);
            alert('Error loading orders');
        }
    }

    private async loadOrderButton() {
        try {
            // Use dynamic import with module federation pattern
            const ordersModule = await import('orders-app/OrderButton');
            const OrderButtonComponent = ordersModule.OrderButtonComponent ?? ordersModule.default;
            
            console.log('OrderButton module loaded:', ordersModule);
            console.log('OrderButton component:', OrderButtonComponent);
            
            // Validate that we have a valid component
            if (!OrderButtonComponent || typeof OrderButtonComponent !== 'function') {
                throw new Error('OrderButton component is not a valid Angular component');
            }
            
            // Create the component dynamically if container is available
            if (this.orderButtonContainer) {
                this.orderButtonComponent = this.orderButtonContainer.createComponent(OrderButtonComponent, {
                    injector: this.injector
                });                    // Set inputs using type assertion for dynamic component
                    const instance = this.orderButtonComponent.instance as Record<string, unknown>;
                    if (instance) {
                        instance['buttonText'] = 'Orders';
                        // Note: orderCount is now managed automatically by OrderButton component
                        instance['variant'] = 'primary';
                        instance['size'] = 'small';                        // Subscribe to outputs if available
                        const orderClick = instance['orderClick'];
                        if (orderClick && typeof orderClick === 'object' && 'subscribe' in orderClick) {
                            (orderClick as { subscribe: (callback: (data: unknown) => void) => void }).subscribe((data: unknown) => {
                                console.log('Order clicked:', data);
                                this.onOrderClick();
                            });
                        }
                    
                    console.log('OrderButton component from orders-app created successfully');
                } else {
                    throw new Error('Failed to create component instance');
                }
            }
            
        } catch (error) {
            console.error('Failed to load OrderButton from orders-app:', error);
            // Component container will remain empty - orders-app needs to be running
        }
    }

    private loadOrderCount() {
        try {
            const orders: OrderItem[] = JSON.parse(localStorage.getItem('orders') ?? '[]');
            this.orderCount = orders.length;
            console.log('Loaded order count:', this.orderCount);
            
            // Note: OrderButton component now handles its own count updates
        } catch (error) {
            console.error('Error loading order count:', error);
            this.orderCount = 0;
        }
    }

    private setupOrderEventListener() {
        // Add event listeners using the class properties
        window.addEventListener('orderAdded', this.orderAddedListener);
        window.addEventListener('storage', this.storageListener);
    }

    ngOnDestroy() {
        // Clean up component reference
        if (this.orderButtonComponent) {
            this.orderButtonComponent.destroy();
        }
        
        // Clean up event listeners
        window.removeEventListener('orderAdded', this.orderAddedListener);
        window.removeEventListener('storage', this.storageListener);
    }
}
