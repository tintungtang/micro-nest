import { Component } from '@angular/core';

@Component({
    standalone: true,
    selector: 'mfe-order-button',
    template: `
        <a class="btn btn-outline-primary position-relative">
            <svg width="24" height="24">
                <use xlinkHref="#shopping-bag"></use>
            </svg>
            <span
                class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
            >
                2
            </span>
        </a>
    `,
    styles: [``],
})
export class OrderButtonComponent {}
