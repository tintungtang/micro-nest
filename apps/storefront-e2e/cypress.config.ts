import { nxE2EPreset } from '@nx/cypress/plugins/cypress-preset';

import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    ...nxE2EPreset(__filename, {
      cypressDir: 'src',
      webServerCommands: {
        default: 'nx run storefront:serve:development',
        production: 'nx run storefront:serve:production',
      },
      ciWebServerCommand: 'nx run storefront:serve-static',
    }),
    baseUrl: 'http://localhost:4200',
  },
});
