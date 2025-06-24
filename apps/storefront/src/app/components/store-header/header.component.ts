import {
    AfterViewInit,
    Component,
    CUSTOM_ELEMENTS_SCHEMA,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderButtonComponent } from 'orders-app/OrderButton';

@Component({
    selector: 'mfe-storefront-dashboard-header',
    standalone: true,
    imports: [CommonModule, OrderButtonComponent],
    templateUrl: './header.component.html',
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HeaderComponent implements AfterViewInit {
    async ngAfterViewInit(): Promise<void> {
        await import('cart/CartButton');
    }
}
