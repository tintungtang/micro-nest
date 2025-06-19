import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'lib-shared-styles',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './shared-styles.component.html',
    styleUrl: './shared-styles.component.scss',
})
export class SharedStylesComponent {}
