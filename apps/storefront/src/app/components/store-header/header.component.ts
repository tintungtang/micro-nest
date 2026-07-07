import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit, Type } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { loadRemoteModule } from '@nx/angular/mf';
import { loadRemoteModule as loadReactRemoteModule } from '@nx/react/mf';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'mfe-storefront-dashboard-header',
    imports: [CommonModule, RouterLink, RouterLinkActive],
    standalone: true,
    templateUrl: './header.component.html',
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HeaderComponent implements OnInit {
    /** Angular remote component, rendered through ngComponentOutlet. */
    orderButton?: Type<unknown>;
    /** Set once the React remote registered the <mfe-cart-button> element. */
    cartButtonReady = false;

    constructor(
        readonly auth: AuthService,
        private readonly router: Router
    ) {}

    async ngOnInit(): Promise<void> {
        try {
            const { OrderButtonComponent } = await loadRemoteModule('orders-app', './OrderButton');
            this.orderButton = OrderButtonComponent;
        } catch (error) {
            console.warn('orders-app OrderButton unavailable', error);
        }

        try {
            // Side effect: registers the <mfe-cart-button> custom element.
            await loadReactRemoteModule('cart', './CartButton');
            this.cartButtonReady = true;
        } catch (error) {
            console.warn('cart CartButton unavailable', error);
        }
    }

    search(term: string): void {
        // URL state: the query lands in /pages/products?q=... and the
        // products MFE reads it from the route.
        this.router.navigate(['/pages/products'], {
            queryParams: { q: term.trim() || null },
        });
    }

    signOut(): void {
        this.auth.signOut();
        this.router.navigate(['/pages/dashboard']);
    }
}
