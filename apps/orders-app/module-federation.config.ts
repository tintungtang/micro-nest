import { ModuleFederationConfig } from '@nx/webpack';

const config: ModuleFederationConfig = {
    name: 'orders-app',
    exposes: {
        './Routes': 'apps/orders-app/src/app/remote-entry/entry.routes.ts',
    },
};

export default config;
