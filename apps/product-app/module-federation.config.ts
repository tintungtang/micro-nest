import { ModuleFederationConfig } from '@nx/module-federation';

const config: ModuleFederationConfig = {
    name: 'product-app',
    exposes: {
        './Routes': 'apps/product-app/src/app/remote-entry/entry.routes.ts',
        './BestSellingFragment': 'apps/product-app/src/app/components/best-selling.component.ts',
    },
};

export default config;
