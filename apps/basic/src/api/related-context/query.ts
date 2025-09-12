/**
 * @fileoverview Query factory for related context API calls.
 *
 * Creates query functions for fetching related context data using
 * Fusion Framework HTTP client with proper endpoint construction.
 *
 */

import type { IHttpClient } from '@equinor/fusion-framework-react-app/http';
import { relatedContextResponseSelector } from './selectors';

/**
 * Creates a query function for fetching related contexts.
 *
 * @param httpClient - The Fusion Framework HTTP client instance
 * @returns Function that fetches related contexts for a given context ID
 *
 */
export const createRelatedContextQuery = (httpClient: IHttpClient) => {
	// Return a function that can be called to fetch related contexts
	return (contextId: string, filter?: string) => {
		// Construct the API endpoint with optional filter parameter
		// This follows the Fusion Framework API pattern for context relations
		const endpoint = `/contexts/${contextId}/relations${filter ? `?$filter=${encodeURIComponent(filter)}` : ''}`;

		// Make the HTTP request using the Fusion Framework HTTP client
		// The selector transforms the raw API response into our application types
		return httpClient.json(endpoint, {
			selector: relatedContextResponseSelector,
		});
	};
};
