/**
 * @fileoverview Application routing configuration for the basic Fusion Framework template.
 *
 * Contains the routing configuration and router component that handles navigation
 * in a context-aware Fusion Framework application with React Router integration.
 *
 */

import { RouterProvider, type RouteObject } from 'react-router-dom';

import { useRouter } from '@equinor/fusion-framework-react-app/navigation';

import { AppContainer } from '@/components/AppContainer';

import { HomePage } from '@/pages/HomePage';
import { GettingStartedPage } from '@/pages/GettingStartedPage';
import { AGGridPage } from '@/pages/AGGrid';
import { ContextLandingPage } from '@/pages/context/ContextLandingPage';
import { RelatedContextPage } from '@/pages/context/RelatedContextPage';

/**
 * Application routes configuration with context-aware routing.
 *
 * Defines all routes as an array of route objects including context-aware routes
 * that work with the Fusion Framework's context system. The `:contextId` parameter
 * enables context-specific navigation and data access.
 *
 * @see {@link https://reactrouter.com/} for React Router documentation
 * @see {@link https://equinor.github.io/fusion-framework/modules/navigation/} for Fusion navigation
 */
export const routes: RouteObject[] = [
  {
    id: 'root',
    path: '/',
    element: <AppContainer />,
    children: [
      {
        id: 'home',
        index: true,
        element: <HomePage />,
      },
      {
        id: 'getting-started',
        path: 'getting-started',
        element: <GettingStartedPage />,
      },
      {
        id: 'ag-grid',
        path: 'ag-grid',
        element: <AGGridPage />,
      },
      {
        id: 'context',
        path: ':contextId',
        children: [
          {
            id: 'context-home',
            index: true,
            element: <ContextLandingPage />,
          },
          {
            id: 'context-related',
            path: 'related',
            element: <RelatedContextPage />,
          },
        ],
      },
    ],
  },
];

/**
 * Application router component with Fusion Framework integration.
 *
 * Creates and provides the React Router instance using createBrowserRouter with
 * object-based route configuration, integrating it with Fusion Framework's
 * navigation module for context-aware navigation.
 *
 * @returns JSX element containing the router provider with all routes
 *
 * @see {@link ./routes} for route configuration
 * @see {@link https://reactrouter.com/} for React Router documentation
 * @see {@link https://equinor.github.io/fusion-framework/modules/navigation/} for Fusion navigation
 *
 * @component
 */
export const Router = () => {
  // Create router instance using Fusion Framework's navigation module
  // This provides context-aware navigation and integration with other modules
  // @ts-expect-error - fix fusion-framework-react-app types
  const router = useRouter(routes);

  // Provide the router to all child components
  // This enables navigation throughout the application
  // @ts-expect-error - fix fusion-framework-react-app types
  return <RouterProvider router={router} />;
};
