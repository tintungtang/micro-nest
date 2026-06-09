import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MfeButtonComponent } from 'shared-ui';

@Component({
    imports: [
        CommonModule,
        MfeButtonComponent
    ],
    selector: 'ng-mf-shared-entry',
    template: `<mfe-ui-button></mfe-ui-button>`
})
export class RemoteEntryComponent {}
