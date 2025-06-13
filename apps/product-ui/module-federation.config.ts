import { ModuleFederationConfig } from '@nx/webpack';

const config: ModuleFederationConfig = {
    name: 'product-ui',
    exposes: {
        './Routes': 'apps/product-ui/src/app/remote-entry/entry.routes.ts',
    },
};

export default config;
