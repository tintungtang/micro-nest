import { Component, Input } from '@angular/core';

@Component({
    standalone: true,
    selector: 'mfe-storefront-section',
    template: '<section class="py-5">\n' +
        '  <div class="container-lg">\n' +
        '    <h2 class="section-title mb-4">{{ title }}</h2>' +
            '<ng-content></ng-content>' +
        '</div> ' +
        '</section>'
})
export class MfeStorefrontSectionComponent {
    @Input() public title = 'Section';
}
