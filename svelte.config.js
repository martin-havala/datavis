import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/kit/vite';
const dev = process.env.NODE_ENV === 'development';

/** @type {import('@sveltejs/kit').Config} */
const config = {
    // Consult https://kit.svelte.dev/docs/integrations#preprocessors
    // for more information about preprocessors
    preprocess: vitePreprocess(),

    kit: {
        // adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
        // If your environment is not supported or you settled on a specific environment, switch out the adapter.
        // See https://kit.svelte.dev/docs/adapters for more information about adapters.
        adapter: adapter({
            // default options are shown
            pages: 'docs',
            assets: 'docs',
            precompress: false,
            fallback: 'index.html',
            path: '',
        }),
        paths: {
            base: dev ? '' : '/datavis',
            assets: 'https://martin-havala.github.io/datavis',
        },
        files: {
            assets: 'public',
        },
        // If you are not using a .nojekyll file, change your appDir to something not starting with an underscore.
        // For example, instead of '_app', use 'app_', 'internal', etc.
        appDir: 'app',
        prerender: {},
    },
};

export default config;
