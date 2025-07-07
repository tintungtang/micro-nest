import {
    AfterViewInit,
    Component,
    OnDestroy,
    ViewChild,
    ViewContainerRef,
    Injector,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderButtonComponent } from 'orders/OrderButton';
import { Router } from '@angular/router';

@Component({
    selector: 'mfe-storefront-dashboard-header',
    standalone: true,
    imports: [CommonModule, OrderButtonComponent],
    templateUrl: './header.component.html',
})
export class HeaderComponent implements AfterViewInit, OnDestroy {
    private navigationHandler?: (event: Event) => void;

    // Reference to the placeholder in the template
    @ViewChild('orderButtonContainer', { read: ViewContainerRef })
    container!: ViewContainerRef;

    constructor(private router: Router, private injector: Injector) {}

    async ngAfterViewInit(): Promise<void> {
        // Dynamically import the remote OrderButtonComponent
        const remoteModule = await import('orders/OrderButton');
        const OrderButtonComponent = remoteModule.OrderButtonComponent;

        // Inject the component dynamically into the template
        this.container.createComponent(OrderButtonComponent, {
            injector: this.injector,
        });

        // Setup navigation event handler
        this.setupNavigationHandler();
    }

    ngOnDestroy(): void {
        if (this.navigationHandler) {
            window.removeEventListener(
                'mfe-order:navigate',
                this.navigationHandler
            );
        }
    }

    private setupNavigationHandler(): void {
        this.navigationHandler = (event: Event) => {
            const customEvent = event as CustomEvent;
            const path = customEvent.detail?.path;
            if (path) {
                console.log('Navigating to:', path);
                this.router.navigateByUrl(path);
            }
        };

        window.addEventListener('mfe-order:navigate', this.navigationHandler);
    }
}
