/**
 * @fileoverview Main application component for the basic Fusion Framework template.
 *
 * Sets up React Query, routing, and provides the foundation for a context-aware
 * Fusion Framework application with navigation and EDS components.
 *
 */

import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import { Router } from './Router';

/**
 * React Query client with 5-minute stale time for context-aware applications.
 *
 * @see {@link https://tanstack.com/query/latest} for React Query documentation
 */
const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 1000 * 60 * 5, // 5 minutes stale time
		},
	},
});

/**
 * Main application component with React Query and routing setup.
 *
 * This component sets up all necessary providers for a context-aware Fusion
 * Framework application. It includes React Query for data fetching and the
 * Router for navigation.
 *
 * @returns JSX element containing the application with all necessary providers
 *
 * @see {@link ./Router.tsx} for routing configuration
 * @see {@link ./config.ts} for Fusion Framework configuration
 *
 * @component
 */
export const App = () => {
	return (
		<QueryClientProvider client={queryClient}>
			<Router />
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	);
};

export default App;
