/**
 * @fileoverview Route definitions for the basic Fusion Framework template.
 *
 * Uses the Fusion React Router DSL to declare the application route tree.
 * Each file reference is automatically lazy-loaded and code-split at build time
 * by the Fusion Vite plugin.
 *
 * Route structure:
 * - `/`                   — Home (index)
 * - `/getting-started`    — Getting started guide
 * - `/ag-grid`            — AG Grid demo
 * - `/:contextId`         — Context landing page
 * - `/:contextId/related` — Related contexts
 */

import {
  layout,
  index,
  route,
  prefix,
} from '@equinor/fusion-framework-react-router/routes';

/**
 * Application route tree wrapped in a shared layout component.
 *
 * The `AppContainer` layout renders the sidebar navigation and an `<Outlet />`
 * for child routes. Context routes are grouped under a `:contextId` prefix so
 * the Fusion context system can resolve the active context from the URL.
 */
export const routes = layout('./components/AppContainer.tsx', [
  index('./pages/HomePage.tsx'),
  route('getting-started', './pages/GettingStartedPage.tsx'),
  route('ag-grid', './pages/ag-grid/AGGridPage.tsx'),
  prefix(':contextId', [
    index('./pages/context/ContextLandingPage.tsx'),
    route('related', './pages/context/RelatedContextPage.tsx'),
  ]),
]);

export default routes;
