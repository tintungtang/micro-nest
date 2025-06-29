import { AfterViewInit, Component, CUSTOM_ELEMENTS_SCHEMA, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
    selector: 'mfe-storefront-dashboard-header',
    standalone: true,
    imports: [ CommonModule ],
    templateUrl: './header.component.html',
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class HeaderComponent implements AfterViewInit, OnDestroy {
    private navigationHandler?: EventListener;

    constructor(private router: Router) {}

    async ngAfterViewInit(): Promise<void> {
        await import('orders-app/OrderButton');
        this.setupNavigationHandler();
    }

    ngOnDestroy(): void {
        if (this.navigationHandler) {
            window.removeEventListener('mfe-order:navigate', this.navigationHandler);
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
