import { ModuleFederationConfig } from '@nx/webpack';

const config: ModuleFederationConfig = {
    name: 'storefront',
    remotes: [
        ['auth-app', 'http://localhost:4202/remoteEntry.mjs'],
        ['product-app', 'http://localhost:4203/remoteEntry.mjs'],
        ['cart', 'http://localhost:4204/remoteEntry.js'],
        ['shared', 'http://localhost:4205/remoteEntry.mjs'],
        'orders-app',
    ],
};

export default config;
