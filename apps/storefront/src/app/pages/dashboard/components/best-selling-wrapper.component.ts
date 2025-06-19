import { Component, OnInit, Type } from '@angular/core';
import { CommonModule } from '@angular/common';
import { loadRemoteWithFallback } from 'hub';
import { FallbackAppComponent } from '../../../fallback/fallback-app.module';

@Component({
    selector: 'mfe-storefront-best-selling-section-wrapper',
    standalone: true,
    imports: [CommonModule],
    template: `<ng-container
        *ngIf="component"
        [ngComponentOutlet]="component"
    ></ng-container>`,
})
export class BestSellingWrapperComponent implements OnInit {
    component?: Type<unknown>;

    async ngOnInit() {
        const loaded = await loadRemoteWithFallback<any>(
            'product-app',
            './BestSellingFragment',
            () =>
                import('../../../fallback/fallback-app.module').then(
                    (m) => m.FallbackAppComponent,
                ),
        );

        this.component = loaded.BestSellingComponent || loaded;
    }
}
