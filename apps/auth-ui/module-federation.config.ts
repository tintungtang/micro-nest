import { ModuleFederationConfig } from '@nx/webpack';

const config: ModuleFederationConfig = {
  name: 'auth-ui',
  exposes: {
    './Routes': 'apps/auth-ui/src/app/remote-entry/entry.routes.ts',
  },
};

export default config;
