import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ng-mf-nx-welcome',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="p-4">
      <div class="max-w-md mx-auto bg-white rounded shadow">
        <div class="p-6">
          <h1 class="text-2xl font-semibold mb-2">Auth</h1>
          <p>Welcome to the Auth UI styled with TailAdmin.</p>
        </div>
      </div>
    </div>
  `,
})
export class NxWelcomeComponent {}

