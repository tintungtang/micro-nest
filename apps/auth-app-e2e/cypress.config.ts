import { nxE2EPreset } from '@nx/cypress/plugins/cypress-preset';

import { defineConfig } from 'cypress';

export default defineConfig({
    e2e: {
        ...nxE2EPreset(__filename, {
            cypressDir: 'src',
            webServerCommands: {
                default: 'nx run auth-app:serve:development',
                production: 'nx run auth-app:serve:production',
            },
            ciWebServerCommand: 'nx run auth-app:serve-static',
        }),
        baseUrl: 'http://localhost:4202',
        // Please ensure you use `cy.origin()` when navigating between domains and remove this option.
        // See https://docs.cypress.io/app/references/migration-guide#Changes-to-cyorigin
        injectDocumentDomain: true,
    },
});
