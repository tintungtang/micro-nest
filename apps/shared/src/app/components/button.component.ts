import { Component, Input } from '@angular/core';

@Component({
  standalone: true,
  selector: 'shared-button',
  template: `<button type="button" [disabled]="disabled">A share component <ng-content></ng-content></button>`,
})
export class SharedButtonComponent {
  @Input() disabled = false;
}
