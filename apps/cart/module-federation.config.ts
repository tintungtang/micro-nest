import { ModuleFederationConfig } from '@nx/webpack';

const config: ModuleFederationConfig = {
    name: 'cart',

    exposes: {
        './CartButton': './src/app/components/cart-button.component.tsx',
    },
};

export default config;
