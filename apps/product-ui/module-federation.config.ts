import { ModuleFederationConfig } from '@nx/webpack';

const config: ModuleFederationConfig = {
    name: 'product-ui',
    exposes: {
        './Routes': 'apps/product-ui/src/app/remote-entry/entry.routes.ts',
        './BestSellingFragment':
            'apps/product-ui/src/app/components/best-selling.component.ts',
    },
};

export default config;
