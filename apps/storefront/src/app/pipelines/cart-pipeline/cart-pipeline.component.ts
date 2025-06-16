import { AfterContentInit, Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
    template: '<div #cartContainer></div>',
    standalone: true
})
export class CartPipelineComponent implements AfterContentInit {
    @ViewChild('cartContainer', { read: ElementRef, static: true }) cartContainer!: ElementRef;
    constructor(private route: ActivatedRoute) {}
    async ngAfterContentInit(): Promise<void> {
        const elementName = this.route.snapshot.data['elementName'];
        const loader = this.route.snapshot.data['loadChildren'];
        await loader();
        const element = document.createElement(elementName);
        this.cartContainer.nativeElement.appendChild(element);
    }
}
