import { AfterViewInit, Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { loadRemoteModule } from '@nx/react/mf';

@Component({
    selector: 'mfe-storefront-dashboard-header',
    imports: [CommonModule],
    standalone: true,
    templateUrl: './header.component.html',
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HeaderComponent implements AfterViewInit {
    async ngAfterViewInit(): Promise<void> {
        await import('orders-app/OrderButton');
        await loadRemoteModule('cart', './CartButton');
    }
}
