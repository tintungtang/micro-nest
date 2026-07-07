import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

/** Reusable page/section header with a title, subtitle and an actions slot. */
@Component({
    selector: 'mfe-ui-header',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="mfe-header">
            <div>
                <h2 class="mfe-header-title">{{ title }}</h2>
                <p class="mfe-header-subtitle" *ngIf="subtitle">{{ subtitle }}</p>
            </div>
            <div class="mfe-header-actions">
                <ng-content></ng-content>
            </div>
        </div>
    `,
    styles: [
        `
            .mfe-header {
                display: flex;
                align-items: flex-end;
                justify-content: space-between;
                gap: 1rem;
                flex-wrap: wrap;
                padding: 1.5rem 0 1rem;
                border-bottom: 1px solid #e2e8f0;
                margin-bottom: 1.5rem;
            }
            .mfe-header-title {
                margin: 0;
                font-size: 1.6rem;
                font-weight: 800;
                color: #1e293b;
            }
            .mfe-header-subtitle {
                margin: 0.25rem 0 0;
                color: #64748b;
            }
            .mfe-header-actions {
                display: flex;
                gap: 0.5rem;
            }
        `,
    ],
})
export class MfeHeaderComponent {
    @Input() title = '';
    @Input() subtitle = '';
}
