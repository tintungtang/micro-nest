import { Component, Input } from '@angular/core';
import { MfeHeaderComponent } from 'shared-ui';

@Component({
    selector: 'ng-mf-shared-header',
    template: `
        <mfe-ui-header [title]="title" [subtitle]="subtitle">
            <ng-content></ng-content>
        </mfe-ui-header>`,
    standalone: true,
    imports: [MfeHeaderComponent]
})
export class SharedHeaderComponent {
    @Input() title = '';
    @Input() subtitle = '';
}
