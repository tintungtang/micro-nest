import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MfeButtonComponent } from 'shared-ui';

@Component({
    selector: 'ng-mf-shared-button',
    template: `
        <mfe-ui-button [variant]="variant" [disabled]="disabled" (clicked)="clicked.emit($event)">
            <ng-content></ng-content>
        </mfe-ui-button>`,
    standalone: true,
    imports: [MfeButtonComponent]
})
export class SharedButtonComponent {
    @Input() variant: 'primary' | 'secondary' | 'danger' = 'primary';
    @Input() disabled = false;
    @Output() clicked = new EventEmitter<Event>();
}
