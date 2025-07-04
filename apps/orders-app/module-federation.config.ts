import { ModuleFederationConfig } from '@nx/webpack';

const config: ModuleFederationConfig = {
    name: 'orders-app',
    exposes: {
        './Routes': './src/app/routes/orders.routes.ts',
        './OrderButton': './src/app/components/order-button.component.ts'
    },
};

export default config;
