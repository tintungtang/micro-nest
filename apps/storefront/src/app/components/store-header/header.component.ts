import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartButtonComponent } from './cart-button.component';
import { initializeCartCount } from 'hub';

@Component({
  selector: 'mfe-storefront-dashboard-header',
  standalone: true,
  imports: [CommonModule, CartButtonComponent],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  ngOnInit(): void {
    initializeCartCount();
  }
}
