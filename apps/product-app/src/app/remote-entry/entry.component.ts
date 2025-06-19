import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NxWelcomeComponent } from './nx-welcome.component';

@Component({
    standalone: true,
    imports: [CommonModule, NxWelcomeComponent],
    selector: 'mfe-product-entry',
    template: `<mfe-product-nx-welcome></mfe-product-nx-welcome>`,
})
export class RemoteEntryComponent {}
