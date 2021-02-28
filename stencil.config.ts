import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';
import { inlineSvg } from './src/svg-inline';

export const config: Config = {
  namespace: 'design-system-hiweb',

  plugins: [
    sass({
      injectGlobalPaths: ['src/scss/main.scss'],
    }),
    inlineSvg(),
  ],

  
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements-bundle',
    },
    {
      type: 'docs-readme',
    },
    {
      type: 'www',
      serviceWorker: null, // disable service workers
    },
  ],
};
