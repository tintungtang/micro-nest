import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'storefront-dashboard',
  imports: [CommonModule],
  template: `
    <h1 class="title">Dashboard</h1>
    <p>Welcome to the dashboard page. This is a placeholder for TailAdmin dashboard.</p>
  `,
})
export class DashboardComponent {}
