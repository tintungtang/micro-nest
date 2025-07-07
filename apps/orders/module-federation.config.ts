import { ModuleFederationConfig } from '@nx/module-federation';

const config: ModuleFederationConfig = {
    name: 'orders',
    exposes: {
        './Routes': 'apps/orders/src/app/remote-entry/entry.routes.ts',
        './OrderButton': 'apps/orders/src/app/components/order-button.component.ts',
    },
};

/**
 * Nx requires a default export of the config to allow correct resolution of the module federation graph.
 **/
export default config;
