/// <reference types='vitest' />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { nxCopyAssetsPlugin } from '@nx/vite/plugins/nx-copy-assets.plugin';
import EnvironmentPlugin from 'vite-plugin-environment';
import packageJson from './package.json';

// const DJANGO_URL = 'http://10.18.200.128:8070/';
// const FASTAPI_URL = 'http://10.18.200.128:8090/';

const DJANGO_URL = 'http://10.12.1.32:9080/';
const FASTAPI_URL = 'http://10.12.1.32:9070/';

// const FASTAPI_URL = 'http://10.12.1.32:9070/';
// const DJANGO_URL = 'http://10.18.200.115:8070/';

export default defineConfig({
  root: __dirname,
  cacheDir: './node_modules/.vite/org',
  server: {
    port: 4200,
    host: 'localhost',
    proxy: {
      '/api/get_chart_of_processor_result_for_dataset/': {
        target: FASTAPI_URL,
        changeOrigin: true
      },
      '/api': {
        target: DJANGO_URL,
        changeOrigin: true
      }
    }
  },
  preview: {
    port: 4300,
    host: 'localhost'
  },
  plugins: [
    react(),
    nxViteTsPaths(),
    nxCopyAssetsPlugin(['*.md']),
    EnvironmentPlugin({
      PLASMA_VERSION_APP: packageJson.version
    })
  ],
  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [ nxViteTsPaths() ],
  // },
  build: {
    outDir: './dist/org',
    emptyOutDir: true,
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true
    }
  },
  test: {
    watch: false,
    globals: true,
    environment: 'jsdom',
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    reporters: ['default'],
    coverage: {
      reportsDirectory: './coverage/org',
      provider: 'v8'
    }
  }
});
