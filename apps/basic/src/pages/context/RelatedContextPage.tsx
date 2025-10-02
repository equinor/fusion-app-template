/**
 * @fileoverview Related context page component for the basic Fusion Framework template.
 *
 * Displays related contexts and their relationships using data from the API.
 * Shows a list of related context items with the ability to view details.
 *
 */

import { Typography } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';
import { useRelatedContext } from '@/api/related-context';
import { RelatedContextItem } from '@/components/RelatedContextItem';
import { useCurrentContext } from '@equinor/fusion-framework-react-app/context';
import { useState } from 'react';

import { AppPageContainer } from '@/components/AppPageContainer';
import { ContextDetailSideSheet } from '@/components/ContextDetailSideSheet';
import type { RelatedContextSchema } from '@/api/related-context/models';

// Styled component for the related contexts grid layout
const Styled = {
  // Grid container for displaying related context items
  // Uses a 2-column responsive grid with consistent spacing
  RelatedContextsGrid: styled.div({
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: tokens.spacings.comfortable.medium,
  }),
};

/**
 * Related context page with data fetching and display.
 *
 * Fetches and displays related contexts for the current context using React Query.
 * Includes loading states, error handling, and detail viewing capabilities.
 *
 * @returns JSX element containing the related context page content
 *
 * @component
 */
export const RelatedContextPage = () => {
  // Get current context and context setter from Fusion Framework
  const { currentContext, setCurrentContext } = useCurrentContext();

  // Fetch related contexts using React Query hook
  // This demonstrates data fetching with proper loading and error states
  const { data, isLoading, error } = useRelatedContext(currentContext?.id);

  // State for the selected context in the detail side sheet
  const [selectedContext, setSelectedContext] =
    useState<RelatedContextSchema | null>(null);

  // Handle loading state
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Handle error state
  if (error) {
    return <div>Error: {(error as Error).message}</div>;
  }

  // Handle no data state
  if (!data) {
    return <div>No data</div>;
  }

  return (
    <AppPageContainer>
      {/* Page header */}
      <Typography variant="h2">Related Contexts</Typography>

      {/* Side sheet for showing detailed context information */}
      <ContextDetailSideSheet
        context={selectedContext}
        isOpen={!!selectedContext}
        onClose={() => setSelectedContext(null)}
      />

      {/* Grid layout for related context items */}
      <Styled.RelatedContextsGrid>
        {/* Render each related context as a card */}
        {data.map((context) => (
          <RelatedContextItem
            key={context.id}
            context={context}
            // Handle setting this context as the current context
            onClick={(context) => {
              setCurrentContext(context.id);
            }}
            // Handle showing detailed information about this context
            onShowDetails={(context) => {
              setSelectedContext(context.$_raw);
            }}
          />
        ))}
      </Styled.RelatedContextsGrid>
    </AppPageContainer>
  );
};
