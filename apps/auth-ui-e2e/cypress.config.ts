import { nxE2EPreset } from '@nx/cypress/plugins/cypress-preset';

import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    ...nxE2EPreset(__filename, {
      cypressDir: 'src',
      webServerCommands: {
        default: 'nx run auth-ui:serve:development',
        production: 'nx run auth-ui:serve:production',
      },
      ciWebServerCommand: 'nx run auth-ui:serve-static',
    }),
    baseUrl: 'http://localhost:4202',
  },
});
