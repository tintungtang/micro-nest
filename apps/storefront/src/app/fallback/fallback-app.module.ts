import { Input, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MfeStorefrontSectionComponent } from '../components/section/section.component';

@Component({
    selector: 'mfe-storefront-fallback',
    template: `<mfe-storefront-section>{{name || 'App'}} is currently unavailable. Please try again later.</mfe-storefront-section>`,
    imports: [CommonModule, MfeStorefrontSectionComponent]
})
export class FallbackAppComponent {
    @Input() name = 'App';
}

@NgModule({
  imports: [FallbackAppComponent],
  exports: [FallbackAppComponent],
})
export class FallbackAppModule {}
