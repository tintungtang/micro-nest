import { ModuleFederationConfig } from '@nx/webpack';

const config: ModuleFederationConfig = {
    name: 'orders-app',
    exposes: {
        './OrderButton': 'apps/orders-app/src/app/components/order-button.component.ts',
        './Routes': 'apps/orders-app/src/app/routes/orders.routes.ts',
    }
};

export default config;
