import { Component, Input } from '@angular/core';
import { MfeBadgeComponent, MfeBadgeVariant } from 'shared-ui';

@Component({
    selector: 'ng-mf-shared-badge',
    template: `
        <mfe-ui-badge [variant]="variant">
            <ng-content></ng-content>
        </mfe-ui-badge>`,
    standalone: true,
    imports: [MfeBadgeComponent]
})
export class SharedBadgeComponent {
    @Input() variant: MfeBadgeVariant = 'neutral';
}
