import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'mfe-ui-button',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './mfe-button.component.html',
    styleUrl: './mfe-button.component.css',
})
export class MfeButtonComponent {
    @Input() variant: 'primary' | 'secondary' | 'danger' = 'primary';
    @Input() disabled = false;
    @Input() type: 'button' | 'submit' = 'button';
    @Output() clicked = new EventEmitter<Event>();
}
