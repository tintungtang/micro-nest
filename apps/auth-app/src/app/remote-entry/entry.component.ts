import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NxWelcomeComponent } from './nx-welcome.component';

@Component({
    imports: [CommonModule, NxWelcomeComponent],
    selector: 'mfe-auth-entry',
    template: `<mfe-auth-nx-welcome></mfe-auth-nx-welcome>`
})
export class RemoteEntryComponent {}
