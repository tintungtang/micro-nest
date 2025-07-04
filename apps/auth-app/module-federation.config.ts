import { ModuleFederationConfig } from '@nx/module-federation';

const config: ModuleFederationConfig = {
  name: 'auth-app',
  exposes: {
    './Routes': 'apps/auth-app/src/app/remote-entry/entry.routes.ts',
  },
};

export default config;
