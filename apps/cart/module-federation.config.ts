import { ModuleFederationConfig } from '@nx/webpack';

const config: ModuleFederationConfig = {
    name: 'cart',

    exposes: {
        './Module': './src/remote-entry.ts',
        './CartComponent': './src/app/components/cart.component.tsx',
        './CartButton': './src/app/components/cart-button.component.tsx',
    },
};

export default config;
