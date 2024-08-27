const path = require('path');

export default {
  build: {
    lib: {
      entry: [
        path.resolve(__dirname, 'entry-points/entry-udex-hero-banner.js'),
        path.resolve(__dirname, 'entry-points/entry-udex-media-player.js'),
        path.resolve(__dirname, 'entry-points/entry-udex-rating-indicator.js'),
      ],
      formats: ['esm'],
    },
    outDir: './aemedge/dist',
  },
};
