import { Component, Input } from '@angular/core';

@Component({
  standalone: true,
  selector: 'shared-button',
  template: `<button type="button" [disabled]="disabled" class="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50">
    A share component <ng-content></ng-content>
  </button>`,
})
export class SharedButtonComponent {
  @Input() disabled = false;
}
