import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nx-welcome',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h1 class="text-2xl font-semibold">Welcome to Storefront</h1>
  `,
})
export class NxWelcomeComponent {}

