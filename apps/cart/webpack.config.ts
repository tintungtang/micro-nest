import { composePlugins, withNx } from '@nx/webpack';
import { withReact } from '@nx/react';
import { withModuleFederation } from '@nx/module-federation/webpack';


import baseConfig from './module-federation.config';

const config = {
    ...baseConfig,
};
// Nx plugins for webpack to build config object from Nx options and context.
export default composePlugins(
    withNx(),
    withReact() as any,
    withModuleFederation(config, { dts: false })
);
