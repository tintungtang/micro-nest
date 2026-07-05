import { Component, OnInit, Type } from '@angular/core';
import { CommonModule } from '@angular/common';
import { loadRemoteModule } from '@nx/angular/mf';
import { FallbackAppComponent } from '../../../fallback/fallback-app.module';

@Component({
    selector: 'mfe-storefront-best-selling-section-wrapper',
    imports: [ CommonModule ],
    standalone: true,
    template: `
        <ng-container
            *ngIf="component"
            [ngComponentOutlet]="component"
        ></ng-container>`
})
export class BestSellingWrapperComponent implements OnInit {
    component?: Type<unknown>;

    async ngOnInit() {
        try {
            const loaded = await loadRemoteModule('product-app', './BestSellingFragment').then((m) => m);
            this.component = loaded.BestSellingComponent;
        } catch {
            this.component = FallbackAppComponent;
        }
    }
}
