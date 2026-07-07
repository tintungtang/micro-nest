import { ModuleFederationConfig } from '@nx/module-federation';

/**
 * The storefront is a dynamic host: remote URLs are resolved at runtime
 * from public/module-federation.manifest.json (see src/app/remote-config.ts),
 * so no static remotes are declared here. Declaring them both places would
 * make the Nx MF dev-server proxy every remote twice (EADDRINUSE).
 */
const config: ModuleFederationConfig = {
    name: 'storefront',
    remotes: [],
};

export default config;
