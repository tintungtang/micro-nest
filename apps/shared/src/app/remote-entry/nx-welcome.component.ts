import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'ng-mf-nx-welcome',
    imports: [CommonModule],
    template: `
    <div class="p-4">
      <p class="text-gray-700">Shared micro-frontend styled with TailAdmin.</p>
    </div>
  `
})
export class NxWelcomeComponent {}

