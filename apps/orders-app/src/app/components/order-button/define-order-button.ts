import { bootstrapApplication } from '@angular/platform-browser';
import { createCustomElement } from '@angular/elements';
import { OrderButtonComponent } from './order-button.component';
import { importProvidersFrom, NgZone } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

console.log('🔃 Running define-order-button.ts');

bootstrapApplication(OrderButtonComponent, {
  providers: [importProvidersFrom(BrowserModule)],
}).then(appRef => {
  const injector = appRef.injector;
  const zone = injector.get(NgZone);

  zone.runOutsideAngular(() => {
    const element = createCustomElement(OrderButtonComponent, { injector });

    if (!customElements.get('mfe-order-button')) {
      customElements.define('mfe-order-button', element);
      console.log('✅ mfe-order-button defined');
    }
  });
});