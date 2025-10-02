/**
 * @fileoverview Home page component for the basic Fusion Framework template.
 *
 * Displays the main landing page with context-aware content and navigation.
 * Shows different content based on whether a context is selected or not.
 *
 */

import { Link } from 'react-router-dom';

import { Typography } from '@equinor/eds-core-react';

import { useCurrentContext } from '@equinor/fusion-framework-react-app/context';

import { AppPageContainer } from '@/components/AppPageContainer';
import { ContentContainer } from '@/components/ContentContainer';

// Page header component - customize this for your app's branding
const PageHeader = () => (
  <Typography variant="h1">Welcome to Basic App</Typography>
);

/**
 * Home page component with context-aware content.
 *
 * Displays different content based on whether a context is selected.
 * Shows context information and navigation options when context is available.
 *
 * @returns JSX element containing the home page content
 *
 * @component
 */
export const HomePage = () => {
  // Get the current Fusion Framework context
  // This will be null if no context is selected in the portal
  const { currentContext } = useCurrentContext();

  // Show different content based on whether a context is selected
  if (!currentContext) {
    // No context selected - show instructions for getting started
    return (
      <AppPageContainer>
        <PageHeader />
        <ContentContainer>
          <Typography variant="h3">No Context Selected</Typography>
          <Typography variant="body_short">
            Please select a context from the context selector to explore the app
            features.
          </Typography>
        </ContentContainer>
      </AppPageContainer>
    );
  }

  // Context is selected - show context information and navigation
  return (
    <AppPageContainer>
      <PageHeader />
      <ContentContainer>
        {/* Display current context with navigation link */}
        <Typography variant="body_short">
          You are currently in the context of{' '}
          <Link to={`/${currentContext.id}`}>{currentContext.title}</Link>.
        </Typography>
      </ContentContainer>
    </AppPageContainer>
  );
};
