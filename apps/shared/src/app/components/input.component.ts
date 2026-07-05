import { Component, Input } from '@angular/core';

@Component({
  standalone: true,
  selector: 'ng-mf-shared-input',
  template: `<input [type]="type" [placeholder]="placeholder" />`,
})
export class SharedInputComponent {
  @Input() type = 'text';
  @Input() placeholder = '';
}
