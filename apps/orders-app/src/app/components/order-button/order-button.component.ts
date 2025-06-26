import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'mfe-order-order-button',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './order-button.component.html',
    styleUrl: './order-button.component.css',
})
export class OrderButtonComponent {
    handleClick() {
        alert('You clicked OrderButton!');
    }
}
