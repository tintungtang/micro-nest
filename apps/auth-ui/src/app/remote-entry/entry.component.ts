import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NxWelcomeComponent } from './nx-welcome.component';

@Component({
  standalone: true,
  imports: [CommonModule, NxWelcomeComponent],
  selector: 'mfe-auth-ui-entry',
  template: `<mfe-auth-nx-welcome></mfe-auth-nx-welcome>`,
})
export class RemoteEntryComponent {}
