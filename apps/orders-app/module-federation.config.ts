import { ModuleFederationConfig } from '@nx/webpack';

const config: ModuleFederationConfig = {
    name: 'orders-app',
    exposes: {
        './OrderButton':
            'apps/orders-app/src/app/components/order-button/define-order-button.ts',
        './Routes': 'apps/orders-app/src/app/remote-entry/entry.routes.ts',
    },
};

export default config;
