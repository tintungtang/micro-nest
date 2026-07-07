import { ModuleFederationConfig } from '@nx/module-federation';

const config: ModuleFederationConfig = {
    name: 'shared',
    exposes: {
        './SharedButtonComponent': 'apps/shared/src/app/components/button.component.ts',
        './SharedCardComponent': 'apps/shared/src/app/components/card.component.ts',
        './SharedBadgeComponent': 'apps/shared/src/app/components/badge.component.ts',
        './SharedHeaderComponent': 'apps/shared/src/app/components/header.component.ts',
    },
};

export default config;
