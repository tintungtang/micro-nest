import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MfeButtonComponent } from 'shared-ui';
import { MfeStorefrontSectionComponent } from '../../components/section/section.component';

@Component({
    selector: 'mfe-storefront-sample',
    imports: [CommonModule, MfeButtonComponent, MfeStorefrontSectionComponent],
    templateUrl: './sample.component.html',
    styleUrl: './sample.component.css'
})
export class SampleComponent {}
