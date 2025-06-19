import { Component, Input } from '@angular/core';
import { MfeButtonComponent } from 'shared-ui';

@Component({
  standalone: true,
  selector: 'shared-button',
  template: `<mfe-ui-button></mfe-ui-button>`,
    imports: [MfeButtonComponent]
})
export class SharedButtonComponent {
  @Input() disabled = false;
}
