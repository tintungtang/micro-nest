import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NxWelcomeComponent } from './nx-welcome.component';

@Component({
    standalone: true,
    imports: [CommonModule, NxWelcomeComponent],
    selector: 'mfe-order-orders-app-entry',
    template: `<mfe-order-nx-welcome></mfe-order-nx-welcome>`,
})
export class RemoteEntryComponent {}
