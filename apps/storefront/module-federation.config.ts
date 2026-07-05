import { ModuleFederationConfig } from '@nx/module-federation';

const config: ModuleFederationConfig = {
    name: 'storefront',
    remotes: [
        ['auth-app', process.env.AUTH_APP_REMOTE_URL ?? 'http://localhost:4202/remoteEntry.mjs'],
        ['product-app', process.env.PRODUCT_APP_REMOTE_URL ?? 'http://localhost:4203/remoteEntry.mjs'],
        ['cart', process.env.CART_REMOTE_URL ?? 'http://localhost:4204/remoteEntry.js'],
        ['orders-app', process.env.ORDERS_APP_REMOTE_URL ?? 'http://localhost:4206/remoteEntry.mjs'],
        ['shared', process.env.SHARED_REMOTE_URL ?? 'http://localhost:4205/remoteEntry.mjs']
    ],
};

export default config;
