import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export type MfeBadgeVariant = 'success' | 'info' | 'warning' | 'danger' | 'neutral';

@Component({
    selector: 'mfe-ui-badge',
    standalone: true,
    imports: [CommonModule],
    template: `
        <span class="mfe-badge" [ngClass]="'mfe-badge-' + variant">
            <ng-content></ng-content>
        </span>
    `,
    styles: [
        `
            .mfe-badge {
                display: inline-flex;
                align-items: center;
                padding: 0.25em 0.7em;
                border-radius: 50rem;
                font-size: 0.75rem;
                font-weight: 700;
                line-height: 1;
                white-space: nowrap;
            }
            .mfe-badge-success {
                background: #d1fae5;
                color: #065f46;
            }
            .mfe-badge-info {
                background: #dbeafe;
                color: #1e40af;
            }
            .mfe-badge-warning {
                background: #fef3c7;
                color: #92400e;
            }
            .mfe-badge-danger {
                background: #fee2e2;
                color: #991b1b;
            }
            .mfe-badge-neutral {
                background: #e2e8f0;
                color: #334155;
            }
        `,
    ],
})
export class MfeBadgeComponent {
    @Input() variant: MfeBadgeVariant = 'neutral';
}
