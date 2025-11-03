/**
 * @fileoverview Main application component for the bare Fusion Framework template.
 *
 * This file contains the primary React component that serves as the entry point
 * for developers building custom applications with the Fusion Framework. It
 * demonstrates the basic structure and provides essential guidance for
 * application development.
 *
 * ## Template Purpose
 *
 * This component is designed to be a minimal starting point for developers
 * creating Fusion Framework applications. It provides:
 * - Clean component structure following React best practices
 * - Integration with Fusion Framework's module system
 * - Developer guidance and resource links
 * - TypeScript support with proper type definitions
 *
 * ## Development Workflow
 *
 * 1. **Customize Content**: Replace the welcome content with your application's UI
 * 2. **Add Components**: Create additional components in the `src/components/` directory
 * 3. **Configure Modules**: Set up required modules in `config.ts`
 * 4. **Implement Routing**: Add navigation and page routing as needed
 * 5. **Add Business Logic**: Implement your application's core functionality
 *
 * @author Fusion Framework Team
 * @since 1.0.0
 */

/**
 * Main application component for the bare Fusion Framework template.
 *
 * This component serves as the primary entry point for developers building
 * custom applications using the Fusion Framework. It demonstrates the basic
 * structure and provides essential guidance for application development.
 *
 * ## Template Purpose
 *
 * This is a minimal template designed to give developers a clean starting point
 * for creating Fusion Framework applications. It includes:
 * - Basic component structure
 * - Welcome page with developer resources
 * - Integration with Fusion Framework's module system
 * - TypeScript support with proper type definitions
 *
 * ## Development Workflow
 *
 * 1. **Customize Content**: Replace the welcome content with your application's UI
 * 2. **Add Components**: Create additional components in the `src/components/` directory
 * 3. **Configure Modules**: Set up required modules in `config.ts`
 * 4. **Implement Routing**: Add navigation and page routing as needed
 * 5. **Add Business Logic**: Implement your application's core functionality
 *
 * ## Integration with Fusion Framework
 *
 * This component is automatically wrapped by the Fusion Framework's `makeComponent`
 * function, which provides:
 * - Module context and providers
 * - Authentication context (handled by Fusion Portal)
 * - Service discovery and configuration
 * - Event handling capabilities
 *
 * @example
 * ```tsx
 * // The App component is automatically rendered by the Fusion Framework
 * // when the application is initialized. No manual rendering is required.
 *
 * // To customize, simply modify the JSX content:
 * export const App = () => (
 *   <div>
 *     <h1>My Custom Application</h1>
 *     <MyCustomComponent />
 *   </div>
 * );
 * ```
 *
 * @returns JSX element containing the application's main UI
 *
 * @see {@link https://equinor.github.io/fusion-framework/modules/} for available modules
 * @see {@link ../config.ts} for app configuration
 * @see {@link ../index.tsx} for application bootstrap
 *
 * @component
 * @since 1.0.0
 */
export const App = () => (
  <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
    <h2>Welcome to Fusion Framework</h2>
    <p>
      This is a bare template for building applications with Fusion Framework.
    </p>

    <h3>Getting Started</h3>
    <p>
      Start by exploring the available modules and customizing this component.
    </p>

    <h3>Resources</h3>
    <p>
      <a
        href="https://equinor.github.io/fusion-framework/modules/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Fusion Framework Modules
      </a>
    </p>

    <h3>Next Steps</h3>
    <ul>
      <li>Update this component with your app's content</li>
      <li>Configure your app in the Fusion Portal</li>
      <li>Set up authentication and routing</li>
      <li>Deploy your application</li>
    </ul>
  </div>
);
