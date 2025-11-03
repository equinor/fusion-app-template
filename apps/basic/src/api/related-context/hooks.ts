/**
 * @fileoverview React Query hooks for related context data fetching.
 *
 * Provides hooks for fetching related context data using React Query
 * and Fusion Framework HTTP client with proper caching and error handling.
 *
 */

import { useCurrentContext } from '@equinor/fusion-framework-react-app/context';
import { useHttpClient } from '@equinor/fusion-framework-react-app/http';
import { useQuery, type UseQueryResult } from 'react-query';
import { createRelatedContextQuery } from './query';
import type { RelatedContext } from './types';

/**
 * Hook for fetching related contexts for a specific context ID.
 *
 * @param contextId - The context ID to fetch related contexts for
 * @param filter - Optional filter string for related contexts
 * @returns React Query result with related context data
 *
 */
export const useRelatedContext = (
  contextId?: string,
  filter?: string,
): UseQueryResult<RelatedContext[]> => {
  // Get the Fusion Framework HTTP client for the 'context' service
  const httpClient = useHttpClient('context');

  // Create the query function using the HTTP client
  const queryRelatedContexts = createRelatedContextQuery(httpClient);

  // Set up React Query with proper caching and error handling
  const query = useQuery({
    // Unique key for caching - includes contextId and filter for proper invalidation
    queryKey: ['relatedContexts', contextId, filter],
    queryFn: () => {
      // Ensure we have a context ID before making the request
      if (!contextId) {
        throw new Error('No context ID available');
      }
      // Execute the actual API call
      return queryRelatedContexts(contextId);
    },
    // Only run the query when we have a context ID
    enabled: !!contextId,
  });
  return query;
};

/**
 * Hook for fetching related contexts for the current context.
 *
 * @param filter - Optional filter string for related contexts
 * @returns React Query result with related context data for current context
 *
 */
export const useCurrentRelatedContext = (
  filter?: string,
): UseQueryResult<RelatedContext[]> => {
  // Get the current context from Fusion Framework
  const { currentContext } = useCurrentContext();

  // Use the related context hook with the current context's ID
  // This automatically updates when the current context changes
  return useRelatedContext(currentContext?.id, filter);
};

export default useCurrentRelatedContext;
