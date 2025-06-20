import { Component, Input, OnChanges, SimpleChanges, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'remote-wrapper',
  standalone: true,
  template: '',
})
export class RemoteWrapperComponent implements OnChanges {
  @Input() remoteName!: string;
  @Input() remoteUrl!: string;
  @Input() exposedModule!: string;
  @Input() fallback!: () => Promise<any>;

  constructor(private viewContainerRef: ViewContainerRef) {}

  async ngOnChanges(changes: SimpleChanges) {
    if (changes['remoteName'] || changes['remoteUrl'] || changes['exposedModule']) {
      this.viewContainerRef.clear();
      await this.load();
    }
  }

  private async load() {
    try {
      await this.loadRemoteEntry();
      const container = (window as any)[this.remoteName];
      if (!container) throw new Error(`Remote ${this.remoteName} not found`);
      await __webpack_init_sharing__('default');
      await container.init((window as any).__webpack_share_scopes__.default);
      const factory = await container.get(this.exposedModule);
      const Module = factory();
      const Component = Module.default || Module[Object.keys(Module)[0]] || Module;
      this.viewContainerRef.createComponent(Component);
    } catch (err) {
      console.error('Error loading remote component', err);
      try {
        const fallbackComp = await this.fallback();
        this.viewContainerRef.createComponent(fallbackComp);
      } catch (fallbackErr) {
        console.error('Error loading fallback component', fallbackErr);
      }
    }
  }

  private loadRemoteEntry(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      if ((window as any)[this.remoteName]) {
        resolve();
        return;
      }

      const scriptId = `remote-entry-${this.remoteName}`;
      if (document.getElementById(scriptId)) {
        (document.getElementById(scriptId) as HTMLScriptElement).onload = () => resolve();
        return;
      }

      const script = document.createElement('script');
      script.id = scriptId;
      script.src = `${this.remoteUrl.replace(/\/$/, '')}/remoteEntry.js`;
      script.type = 'text/javascript';
      script.async = true;
      script.onload = () => resolve();
      script.onerror = (err) => reject(err);
      document.body.appendChild(script);
    });
  }
}
