/**
 * @fileoverview Data selectors for related context API responses.
 *
 * Provides selectors for transforming API response data into application
 * value objects with proper type handling and display name generation.
 *
 */

import { jsonSelector } from '@equinor/fusion-framework-module-http/selectors';
import {
  isEquinorTaskValueSchema,
  isOrganizationalUnitValueSchema,
  isOrgChartValueSchema,
  type RelatedContextSchema,
  type RelatedContextsResponse,
} from './models';
import type { RelatedContext } from './types';

// Generate a user-friendly display name based on the context type
const relatedContextDisplayNameSelector = (
  item: RelatedContextSchema,
): string => {
  // Handle different context types with appropriate display formatting
  if (isOrganizationalUnitValueSchema(item)) {
    // Show department information for organizational units
    return `${item.type.id}: (${item.value.department})`;
  }
  if (isEquinorTaskValueSchema(item)) {
    // Show task name and department for Equinor tasks
    return `${item.value.taskName} (${item.value.orgUnitDepartment})`;
  }
  if (isOrgChartValueSchema(item)) {
    // Show title and state for org chart items
    return `${item.title} (${item.value.state})`;
  }
  // Fallback for unknown types
  return '';
};

// Transform API schema into application value object
const relatedContextSelector = (item: RelatedContextSchema): RelatedContext => {
  return {
    // Extract basic properties from the API response
    id: item.id,
    title: item.title,
    type: item.type.id,
    isActive: item.isActive,

    // Generate user-friendly display name
    displayName: relatedContextDisplayNameSelector(item),

    // Keep raw data for advanced use cases
    $_raw: item,
  } satisfies RelatedContext;
};

// Main selector that processes the entire API response
export const relatedContextResponseSelector = async (
  response: Response,
): Promise<RelatedContext[]> => {
  // Parse the JSON response using Fusion Framework's JSON selector
  const jsonResponse = (await jsonSelector(
    response,
  )) as RelatedContextsResponse;

  // Transform each item in the response using our selector
  return jsonResponse.map(relatedContextSelector);
};

export default relatedContextSelector;
