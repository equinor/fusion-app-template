/**
 * @fileoverview Application bootstrap and entry point for the bare Fusion Framework template.
 *
 * This file contains the main application initialization logic and serves as the
 * entry point for developers using this template. It demonstrates how to properly
 * integrate a React application with the Fusion Framework's module system.
 *
 * ## Template Structure
 *
 * This file follows the standard Fusion Framework application pattern:
 * 1. Import necessary dependencies from Fusion Framework
 * 2. Create a component factory function
 * 3. Export a bootstrap function that handles React root creation
 * 4. Provide proper cleanup functionality
 *
 * ## Key Concepts
 *
 * - **Component Factory**: The `createApp` function demonstrates how to wrap
 *   your main component with Fusion Framework's module system
 * - **Bootstrap Function**: The default export handles React 18 root creation
 *   and provides the integration point with the Fusion Portal
 * - **Cleanup**: Proper unmounting is essential for micro-frontend architecture
 *
 * @author Fusion Framework Team
 * @since 1.0.0
 */

import { createRoot } from 'react-dom/client';

import {
  makeComponent,
  type ComponentRenderArgs,
} from '@equinor/fusion-framework-react-app';

import { configure } from './config';
import { App } from './App';

/**
 * Creates a Fusion Framework app component with the provided configuration.
 *
 * This function wraps the main App component with Fusion Framework's
 * makeComponent function, which provides the necessary context and
 * module providers for the application.
 *
 * @param args - Component render arguments from the Fusion Framework
 * @returns A configured React component ready for rendering
 *
 * @see {@link https://equinor.github.io/fusion-framework/modules/} for available modules
 * @see {@link ../config.ts} for app configuration
 * @see {@link ../App.tsx} for the main app component
 * @since 1.0.0
 */
const createApp = (args: ComponentRenderArgs) =>
  makeComponent(<App />, args, configure);

/**
 * Main application bootstrap function.
 *
 * This is the entry point for the Fusion Framework application. It handles
 * the React root creation, app initialization, and provides cleanup functionality.
 * The function is called by the Fusion Framework when the app is loaded.
 *
 * @param el - The HTML element where the app will be rendered
 * @param args - Component render arguments containing context and configuration
 * @returns Cleanup function to unmount the app when needed
 *
 * @example
 * ```typescript
 * // This function is automatically called by the Fusion Framework
 * // No manual invocation is required - the Fusion Portal handles this
 * ```
 *
 * @see {@link ../config.ts} for app configuration
 * @see {@link ../App.tsx} for the main app component
 * @see {@link https://equinor.github.io/fusion-framework/} for complete documentation
 * @since 1.0.0
 */
export default function (el: HTMLElement, args: ComponentRenderArgs) {
  // Create a React 18 root for the app
  // This enables concurrent features and better performance
  const root = createRoot(el);

  // Create the app component with Fusion Framework integration
  // This includes all necessary providers and context
  const App = createApp(args);

  // Render the app on the React root
  // The app will be mounted and ready for user interaction
  root.render(<App />);

  // Return cleanup function for proper unmounting
  // This is called when the app needs to be removed from the DOM
  return () => root.unmount();
}
