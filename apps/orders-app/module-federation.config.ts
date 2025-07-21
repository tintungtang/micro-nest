import { ModuleFederationConfig } from '@nx/webpack';

const config: ModuleFederationConfig = {
    name: 'orders-app',
    exposes: {
        './Routes': 'apps/orders-app/src/app/routes/orders.routes.ts',
        './OrderButton': 'apps/orders-app/src/app/components/order-button-element.ts'
    },
};

export default config;
