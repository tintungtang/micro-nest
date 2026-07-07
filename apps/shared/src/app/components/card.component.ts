import { Component, Input } from '@angular/core';
import { MfeCardComponent } from 'shared-ui';

@Component({
    selector: 'ng-mf-shared-card',
    template: `
        <mfe-ui-card [title]="title" [subtitle]="subtitle">
            <ng-content></ng-content>
        </mfe-ui-card>`,
    standalone: true,
    imports: [MfeCardComponent]
})
export class SharedCardComponent {
    @Input() title = '';
    @Input() subtitle = '';
}
