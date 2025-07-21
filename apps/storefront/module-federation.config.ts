import { ModuleFederationConfig } from '@nx/webpack';

const config: ModuleFederationConfig = {
    name: 'storefront',
    remotes: [
        ['auth-app', 'http://localhost:4202/remoteEntry.mjs'],
        ['product-app', 'http://localhost:4203/remoteEntry.mjs'],
        ['orders-app', 'http://localhost:4204/remoteEntry.mjs'], // Replaces cart
        ['shared', 'http://localhost:4205/remoteEntry.mjs']
    ],
};

export default config;
