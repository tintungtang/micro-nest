import {
  AfterViewInit,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  Injector,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { loadRemoteModule } from '@angular-architects/module-federation';

@Component({
  selector: 'mfe-storefront-dashboard-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HeaderComponent implements AfterViewInit {
  @ViewChild('orderButtonContainer', { read: ViewContainerRef })
  viewContainerRef!: ViewContainerRef;

  async ngAfterViewInit(): Promise<void> {
    const module = await loadRemoteModule({
      type: 'module',
      remoteEntry: 'http://localhost:4206/remoteEntry.mjs',
      exposedModule: './OrderButton',
    });

    const component = module.OrderButtonComponent;
    this.viewContainerRef.createComponent(component);
  }
}
