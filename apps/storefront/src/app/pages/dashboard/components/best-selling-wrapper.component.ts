import { Component, OnInit, Type } from '@angular/core';
import { CommonModule } from '@angular/common';
import { loadRemoteWithFallback } from 'hub';
import { FallbackAppComponent } from '../../../fallback/fallback-app.module';
import { setRemoteDefinition } from '@nx/angular/mf';
import { loadRemoteModule } from '@nx/angular/mf';

setRemoteDefinition('product-app', 'http://localhost:4203/remoteEntry.mjs');

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
        // const loaded = await loadRemoteWithFallback<any>(
        //     'product-app',
        //     './BestSellingFragment',
        //     () =>
        //         import('../../../fallback/fallback-app.module').then(
        //             (m) => m.FallbackAppComponent,
        //         ),
        // );
        //
        // this.component = loaded.BestSellingComponent || loaded;

        const loaded = await loadRemoteModule('product-app', './BestSellingFragment').then((m) => m);
        this.component = loaded.BestSellingComponent;
    }
}
