import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NxWelcomeComponent } from './nx-welcome.component';

@Component({
    standalone: true,
    imports: [CommonModule, NxWelcomeComponent],
    selector: 'mfe-order-root',
    template: `<mfe-order-root-welcome></mfe-order-root-welcome>`,
})
export class RemoteEntryComponent {}
