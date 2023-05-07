import { defineConfig } from 'cypress';
import webpackPreprocessor from "@cypress/webpack-preprocessor";

export default defineConfig({
	watchForFileChanges: false,
	screenshotOnRunFailure: false,
	video: false,

	e2e: {
		baseUrl: 'http://localhost:3000',
		specPattern: 'cypress/e2e/*_spec.{ts,tsx}',
		supportFile: false,
		//@ts-ignore
		setupNodeEvents(on, config: Cypress.PluginConfigOptions) {
			const options = { webpackOptions: require('./webpack.config.js') };
			on('file:preprocessor', webpackPreprocessor(options));
		}
	},
});
