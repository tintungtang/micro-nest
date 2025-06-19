import { Component, OnInit, Type } from '@angular/core';
import { CommonModule } from '@angular/common';
import { loadRemoteWithFallback } from 'hub';

@Component({
    selector: 'mfe-product-best-selling-section',
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
                import('../../fallback/best-selling-fallback.component').then(
                    (m) => m.BestSellingFallbackComponent,
                ),
        );

        this.component = loaded.BestSellingComponent || loaded;
    }
}
