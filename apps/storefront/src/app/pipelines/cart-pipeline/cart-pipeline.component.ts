import { AfterContentInit, Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

/**
 * Bridges a non-Angular remote into the router: loads the remote module
 * (which registers a custom element as a side effect) and mounts the element.
 * Route data: { elementName: string, loadElement: () => Promise<unknown> }
 */
@Component({
    template: '<div #remoteContainer></div>',
    standalone: true
})
export class CartPipelineComponent implements AfterContentInit {
    @ViewChild('remoteContainer', { read: ElementRef, static: true }) remoteContainer!: ElementRef;
    constructor(private route: ActivatedRoute) {}
    async ngAfterContentInit(): Promise<void> {
        const elementName = this.route.snapshot.data['elementName'];
        const loader = this.route.snapshot.data['loadElement'];
        await loader();
        const element = document.createElement(elementName);
        this.remoteContainer.nativeElement.appendChild(element);
    }
}
