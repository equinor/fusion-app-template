/**
 * @fileoverview Application configuration for the bare Fusion Framework template.
 *
 * This file contains the main configuration function that sets up modules, services,
 * and other application-specific settings. It serves as the central configuration
 * point for developers to customize their Fusion Framework application.
 *
 * ## Template Purpose
 *
 * This configuration file demonstrates how to properly set up a Fusion Framework
 * application with the necessary modules and services. It provides a clean starting
 * point for developers to build upon.
 *
 * ## Key Configuration Areas
 *
 * - **HTTP Client**: Configure API endpoints and request handling
 * - **Feature Flags**: Enable/disable features based on environment
 * - **Navigation**: Set up routing and navigation
 *
 * @author Fusion Framework Team
 * @since 1.0.0
 */

import type { AppModuleInitiator } from '@equinor/fusion-framework-react-app';

/**
 * Application configuration function for the Fusion Framework.
 *
 * This function is called during app initialization and allows you to configure
 * modules, services, and other app-specific settings. It's the main entry point
 * for customizing your Fusion Framework application.
 *
 * ## Template Customization
 *
 * This template provides a minimal configuration. For production applications,
 * you should:
 *
 * 1. **Add Required Modules**: Configure modules your app needs
 * 2. **Set Environment Variables**: Use environment-specific configuration
 * 3. **Add Error Handling**: Implement proper error handling and logging
 * 4. **Configure Services**: Set up external service integrations
 * 5. **Add Monitoring**: Configure logging and monitoring services
 *
 * @param configurator - The app configurator instance for setting up modules and services.
 * @returns Promise that resolves when configuration is complete. The configuration
 *   process is asynchronous to allow for dynamic configuration loading if needed.
 *
 * @see {@link https://equinor.github.io/fusion-framework/modules/} for available modules
 * @see {@link ../App.tsx} for the main app component
 * @see {@link ../index.tsx} for application bootstrap
 * @see {@link https://equinor.github.io/fusion-framework/} for complete documentation
 *
 * @since 1.0.0
 */
export const configure: AppModuleInitiator = async () => {
  // TODO: Add your app configuration here
  //
  // This is a minimal template configuration. For production applications,
  // you should configure the modules and services your app requires.
  //
  // Common configurations include:
  // - HTTP client setup for API calls
  // - Feature flags for environment-specific features
  // - Navigation configuration for routing
  // - Logging and monitoring setup
  //
  // Note: Authentication is handled by the Fusion Portal
  // No additional authentication configuration is needed
  //
  // Example configurations:
  //
  // HTTP Client:
  // configurator.configureHttpClient({
  //   baseUri: process.env.API_BASE_URL,
  //   defaultHeaders: {
  //     'Content-Type': 'application/json'
  //   }
  // });
};
