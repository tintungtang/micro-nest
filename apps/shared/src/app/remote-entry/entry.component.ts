import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NxWelcomeComponent } from './nx-welcome.component';
import { MfeButtonComponent } from 'shared-ui';

@Component({
  standalone: true,
  imports: [
      CommonModule,
      NxWelcomeComponent,
      MfeButtonComponent
  ],
  selector: 'ng-mf-shared-entry',
  template: `<ng-mf-nx-welcome></ng-mf-nx-welcome>`,
})
export class RemoteEntryComponent {}
