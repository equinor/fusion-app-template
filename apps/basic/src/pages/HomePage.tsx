/**
 * @fileoverview Home page component for the basic Fusion Framework template.
 *
 * Displays the main landing page with context-aware content and navigation.
 * Shows different content based on whether a context is selected or not.
 *
 */

import { Link } from '@equinor/fusion-framework-react-router';
import { Icon, Typography } from '@equinor/eds-core-react';
import { useCurrentContext } from '@equinor/fusion-framework-react-app/context';
import { ContentContainer } from '@/components/ContentContainer';
import styled from 'styled-components';
import { arrow_up } from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';

const Styled = {
  SelectContextWrapper: styled.div`
    position: absolute;
    display: flex;
    align-items: center;
    font-size: 20px;
    gap: ${tokens.spacings.comfortable.small};
  `,
  CenterWrapper: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100%;
  `,
  ContentWrapper: styled.div`
    max-width: 600px;
  `,
};

// Page header component - customize this for your app's branding
const PageHeader = () => (
  <Typography variant="h1">Welcome to App Template</Typography>
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
      <>
        <Styled.SelectContextWrapper>
          <Icon data={arrow_up} size={32} />
          Please select a project/task to get started
        </Styled.SelectContextWrapper>
        <Styled.CenterWrapper>
          <PageHeader />
          <ContentContainer>
            <Styled.ContentWrapper>
              <Typography variant="body_short">
                This is an app to help your team getting started with the
                development of your new application. You can use this as a
                starting point for you and your team.
              </Typography>
            </Styled.ContentWrapper>
          </ContentContainer>
        </Styled.CenterWrapper>
      </>
    );
  }

  // Context is selected - show context information and navigation
  return (
    <Styled.CenterWrapper>
      <PageHeader />
      <ContentContainer>
        <Styled.ContentWrapper>
          {/* Display current context with navigation link */}
          <Typography variant="body_short">
            You are currently in the context of{' '}
            <Link to={`/${currentContext.id}`}>{currentContext.title}</Link>.
          </Typography>
        </Styled.ContentWrapper>
      </ContentContainer>
    </Styled.CenterWrapper>
  );
};

export default HomePage;
