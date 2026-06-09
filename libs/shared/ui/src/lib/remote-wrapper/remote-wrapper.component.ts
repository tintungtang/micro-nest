import { Component, Input, OnChanges, SimpleChanges, Type, ViewContainerRef } from '@angular/core';

declare const __webpack_init_sharing__: (scope: string) => Promise<void>;

type RemoteContainer = {
    init: (shareScope: unknown) => Promise<void>;
    get: (module: string) => Promise<() => Record<string, Type<unknown>> | Type<unknown>>;
};

type ShareScopeWindow = Window & {
    __webpack_share_scopes__?: {
        default: unknown;
    };
};

@Component({
    selector: 'mfe-ui-remote-wrapper',
    standalone: true,
    template: ''
})
export class RemoteWrapperComponent implements OnChanges {
    @Input() remoteName!: string;
    @Input() remoteUrl!: string;
    @Input() exposedModule!: string;
    @Input() fallback!: () => Promise<Type<unknown>>;

    constructor(private viewContainerRef: ViewContainerRef) {
    }

    async ngOnChanges(changes: SimpleChanges) {
        if (changes['remoteName'] || changes['remoteUrl'] || changes['exposedModule']) {
            this.viewContainerRef.clear();
            await this.load();
        }
    }

    private async load() {
        try {
            await this.loadRemoteEntry();
            const remoteWindow = window as unknown as Record<string, RemoteContainer | undefined>;
            const container = remoteWindow[this.remoteName];
            if (!container) throw new Error(`Remote ${this.remoteName} not found`);
            await __webpack_init_sharing__('default');
            await container.init((window as ShareScopeWindow).__webpack_share_scopes__?.default);
            const factory = await container.get(this.exposedModule);
            const Module = factory();
            const remoteModule = Module as Record<string, Type<unknown>>;
            const component = remoteModule['default'] || remoteModule[Object.keys(remoteModule)[0]] || Module as Type<unknown>;
            this.viewContainerRef.createComponent(component);
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
            const remoteWindow = window as unknown as Record<string, RemoteContainer | undefined>;
            if (remoteWindow[this.remoteName]) {
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
