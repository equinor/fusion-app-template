/**
 * @fileoverview Application configuration for the basic Fusion Framework template.
 *
 * Sets up modules, services, and application-specific settings for a context-aware
 * Fusion Framework application with navigation capabilities.
 *
 */

import type { AppModuleInitiator } from '@equinor/fusion-framework-react-app';

import { enableContext } from '@equinor/fusion-framework-react-app/context';
import { enableNavigation } from '@equinor/fusion-framework-module-navigation';

/**
 * Application configuration function for context-aware Fusion Framework app.
 *
 * Configures context management, navigation, and service clients for the application.
 * This is the main entry point for customizing your Fusion Framework application.
 *
 * @param configurator - The app configurator instance for setting up modules and services
 * @param env - Environment configuration containing basename and environment settings
 * @returns Promise that resolves when configuration is complete
 *
 * @see {@link https://equinor.github.io/fusion-framework/modules/} for available modules
 * @see {@link ./App.tsx} for the main app component
 * @see {@link ./index.tsx} for application bootstrap
 *
 */
export const configure: AppModuleInitiator = async (configurator, { env }) => {
	// Enable the context module with the orgchart context type
	// This allows the app to work with user and organization context data
	enableContext(configurator, async (builder) => {
		// Set the context types that this application supports
		// 'orgchart' provides access to organizational structure data
		builder.setContextType(['orgchart']);
	});

	// Specify that the app should use the navigation module
	// This enables routing and navigation capabilities with the provided basename
	enableNavigation(configurator, env.basename);

	// Use the framework service clients for the context and people services
	// These provide access to external APIs for context and user data
	configurator.useFrameworkServiceClient('context');
};

export default configure;
