import { ModuleFederationConfig } from '@nx/module-federation';

const config: ModuleFederationConfig = {
    name: 'ordersApp',
    exposes: {
        './Routes': 'apps/ordersApp/src/app/remote-entry/entry.routes.ts',
        './OrderButton': 'apps/ordersApp/src/app/components/cart-button/CartButton.component.ts',
    },
};

/**
 * Nx requires a default export of the config to allow correct resolution of the module federation graph.
 **/
export default config;
