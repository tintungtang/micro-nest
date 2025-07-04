import { Component, Input } from '@angular/core';
import { MfeButtonComponent } from 'shared-ui';

@Component({
    selector: 'shared-button',
    template: `
        <mfe-ui-button></mfe-ui-button>`,
    standalone: true,
    imports: [ MfeButtonComponent ]
})
export class SharedButtonComponent {
  @Input() disabled = false;
}
