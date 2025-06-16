import { ModuleFederationConfig } from '@nx/webpack';

const config: ModuleFederationConfig = {
  name: 'shared',
  exposes: {
    './ButtonComponent': 'apps/shared/src/app/components/button.component.ts',
    './InputComponent': 'apps/shared/src/app/components/input.component.ts',
  },
};

export default config;
