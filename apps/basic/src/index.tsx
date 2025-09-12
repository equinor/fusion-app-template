/**
 * @fileoverview Application bootstrap and entry point for the basic Fusion Framework template.
 *
 * Contains the main application initialization logic and demonstrates how to integrate
 * a React application with the Fusion Framework's module system, including context
 * management and navigation.
 *
 */

import { createRoot } from 'react-dom/client';

import {
	makeComponent,
	type ComponentRenderArgs,
} from '@equinor/fusion-framework-react-app';

import configure from './config';

import App from './App';

/**
 * Creates a Fusion Framework app component with context and navigation support.
 *
 * Wraps the base App component with the module system, providing access to
 * services, context, and configuration for a context-aware application.
 *
 * @param args - Component render arguments from the Fusion Framework
 * @returns A configured React component ready for rendering
 *
 * @see {@link ./config.ts} for app configuration
 * @see {@link ./App.tsx} for the main app component
 */
const createApp = (args: ComponentRenderArgs) =>
	makeComponent(<App />, args, configure);

/**
 * Main application bootstrap function.
 *
 * Entry point for the Fusion Framework application. Handles React root creation,
 * app initialization, and provides cleanup functionality. Called by the Fusion
 * Portal when the micro-frontend is loaded.
 *
 * @param el - The HTML element where the app will be rendered
 * @param args - Component render arguments containing context and configuration
 * @returns Cleanup function to unmount the app when needed
 *
 * @see {@link ./config.ts} for app configuration
 * @see {@link ./App.tsx} for the main app component
 */
export default function (el: HTMLElement, args: ComponentRenderArgs) {
	// Create a React 18 root for the app
	// This enables concurrent features and better performance
	const root = createRoot(el);

	// Create the app component with Fusion Framework integration
	// This includes all necessary providers and context for context-aware apps
	const App = createApp(args);

	// Render the app on the React root
	// The app will be mounted and ready for user interaction
	root.render(<App />);

	// Return cleanup function for proper unmounting
	// This is called when the app needs to be removed from the DOM
	return () => root.unmount();
}
