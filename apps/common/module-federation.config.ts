import { ModuleFederationConfig } from '@nx/webpack';

const config: ModuleFederationConfig = {
    name: 'common',
    exposes: {
        './Routes': 'apps/common/src/app/remote-entry/entry.routes.ts',
        './MfeButton': 'apps/common/src/app/components/mfe-button/mfe-button.ts',
    },
};

export default config;
