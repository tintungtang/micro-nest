import { Component } from '@angular/core';

@Component({
    selector: 'mfe-ui-button',
    standalone: true,
    templateUrl: './mfe-button.component.html',
    styleUrl: './mfe-button.component.css',
})
export class MfeButtonComponent {
    constructor() {
        console.log('MfeButtonComponent');
    }
}
