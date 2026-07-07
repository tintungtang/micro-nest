import { setRemoteDefinition as setAngularRemoteDefinition } from '@nx/angular/mf';
import { setRemoteDefinition as setReactRemoteDefinition } from '@nx/react/mf';

type RemoteName = 'auth-app' | 'product-app' | 'orders-app' | 'cart' | 'shared';
type RemoteManifest = Record<RemoteName, string>;

const defaultRemotes: RemoteManifest = {
    'auth-app': 'http://localhost:4202/remoteEntry.mjs',
    'product-app': 'http://localhost:4203/remoteEntry.mjs',
    'orders-app': 'http://localhost:4206/remoteEntry.mjs',
    cart: 'http://localhost:4204/remoteEntry.js',
    shared: 'http://localhost:4205/remoteEntry.mjs',
};

async function loadRemoteManifest(): Promise<RemoteManifest> {
    try {
        const response = await fetch('/module-federation.manifest.json');
        if (!response.ok) {
            return defaultRemotes;
        }

        return { ...defaultRemotes, ...(await response.json()) };
    } catch {
        return defaultRemotes;
    }
}

export async function configureRemotes(): Promise<void> {
    const remotes = await loadRemoteManifest();

    setAngularRemoteDefinition('auth-app', remotes['auth-app']);
    setAngularRemoteDefinition('product-app', remotes['product-app']);
    setAngularRemoteDefinition('orders-app', remotes['orders-app']);
    setAngularRemoteDefinition('shared', remotes.shared);
    setReactRemoteDefinition('cart', remotes.cart);
}
