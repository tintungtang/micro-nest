import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'mfe-storefront-hero-section',
    imports: [ CommonModule ],
    templateUrl: './hero.component.html',
    standalone: true,
    styleUrls: [ './hero.component.scss' ]
})
export class HeroComponent {}
