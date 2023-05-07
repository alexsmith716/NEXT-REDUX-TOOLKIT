import { defineConfig } from 'cypress';
import nodeEvents from './cypress/plugins/index';

export default defineConfig({
	watchForFileChanges: false,
	screenshotOnRunFailure: false,
	video: false,

	e2e: {
		baseUrl: 'http://localhost:3000',
		specPattern: 'cypress/e2e/nodeEvents/*_spec.{ts,tsx}',
		supportFile: false,
		setupNodeEvents: nodeEvents,
	},
});
