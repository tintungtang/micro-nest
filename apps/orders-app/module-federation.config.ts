import { ModuleFederationConfig } from '@nx/webpack';

const config: ModuleFederationConfig = {
  name: 'orders-app',
  exposes: {
    './Routes': 'apps/orders-app/src/app/remote-entry/entry.routes.ts',
    './OrderButton': './src/app/components/order-button.component.ts',
    './OrderList': './src/app/components/order-list.component.ts',
  },
};

export default config;
