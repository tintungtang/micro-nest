import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'mfe-ui-card',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="mfe-card">
            <div class="mfe-card-header" *ngIf="title">
                <h5 class="mfe-card-title">{{ title }}</h5>
                <p class="mfe-card-subtitle" *ngIf="subtitle">{{ subtitle }}</p>
            </div>
            <div class="mfe-card-body">
                <ng-content></ng-content>
            </div>
        </div>
    `,
    styles: [
        `
            .mfe-card {
                background: #fff;
                border: 1px solid #e2e8f0;
                border-radius: 0.5rem;
                box-shadow: 0 1px 2px rgba(15, 23, 42, 0.06);
            }
            .mfe-card-header {
                padding: 1rem 1.25rem 0;
            }
            .mfe-card-title {
                margin: 0;
                font-size: 1.05rem;
                font-weight: 700;
                color: #1e293b;
            }
            .mfe-card-subtitle {
                margin: 0.25rem 0 0;
                font-size: 0.85rem;
                color: #64748b;
            }
            .mfe-card-body {
                padding: 1rem 1.25rem 1.25rem;
            }
        `,
    ],
})
export class MfeCardComponent {
    @Input() title = '';
    @Input() subtitle = '';
}
