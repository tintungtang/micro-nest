import { ModuleFederationConfig } from '@nx/module-federation';

const config: ModuleFederationConfig = {
    name: 'shared',
    exposes: {
        './SharedButtonComponent': 'apps/shared/src/app/components/button.component.ts',
    },
};

export default config;
