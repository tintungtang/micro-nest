import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CART_COUNT_EVENT, getCartCount } from 'hub';

@Component({
  selector: 'mfe-cart-button',
  standalone: true,
  imports: [CommonModule],
  template: `<span class="badge bg-primary rounded-pill">{{ count }}</span>`
})
export class CartButtonComponent implements OnInit, OnDestroy {
  count = 0;
  private handler = (event: Event) => {
    const detail = (event as CustomEvent).detail;
    if (detail && typeof detail.count === 'number') {
      this.count = detail.count;
    }
  };
  ngOnInit(): void {
    this.count = getCartCount();
    window.addEventListener(CART_COUNT_EVENT, this.handler);
  }
  ngOnDestroy(): void {
    window.removeEventListener(CART_COUNT_EVENT, this.handler);
  }
}
