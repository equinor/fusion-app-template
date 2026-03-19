/**
 * @fileoverview Application routing configuration for the basic Fusion Framework template.
 *
 * Uses @equinor/fusion-framework-react-router for seamless integration with the
 * Fusion Framework navigation module and automatic lazy-loading of route components.
 *
 */

import { Router } from '@equinor/fusion-framework-react-router';

import routes from './routes';

/**
 * Application router component with Fusion Framework integration.
 *
 * Uses the Fusion React Router which automatically connects to the
 * navigation module for history and basename, and provides lazy-loaded
 * route components via the route DSL.
 *
 * @returns JSX element containing the router with all routes
 *
 * @see {@link ./routes.ts} for route configuration
 *
 * @component
 */
export default function AppRouter() {
  return <Router routes={routes} />;
}
