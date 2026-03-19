/**
 * @fileoverview Getting started page component for the basic Fusion Framework template.
 *
 * Provides guidance and documentation for developers using the template.
 * Includes information about the app structure, features, and next steps.
 *
 */

import { Typography, Button, List, ListItem } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';

import { AppPageContainer } from '@/components/AppPageContainer';
import { ContentContainer } from '@/components/ContentContainer';
import { Link } from '@equinor/fusion-framework-react-router';

const Styled = {
  /** Inline code span styled to match EDS typography. */
  Code: styled.code`
    font-family: 'Equinor', monospace;
    font-size: ${tokens.typography.paragraph.body_short.fontSize};
    background: ${tokens.colors.ui.background__light.hex};
    padding: 1px ${tokens.spacings.comfortable.x_small};
    border-radius: 3px;
  `,
};

/**
 * Getting started page with guidance and documentation.
 *
 * Provides comprehensive information about the Fusion Framework app template,
 * including features, structure, and next steps for developers.
 *
 * @returns JSX element containing the getting started content
 *
 * @component
 */
export const GettingStartedPage = () => {
  return (
    <AppPageContainer>
      <ContentContainer>
        {/* Main page title */}
        <Typography variant="h1">Getting Started</Typography>
        <Typography variant="body_short">
          Welcome to your Fusion Framework app! This guide will help you get up
          and running quickly.
        </Typography>

        {/* App description section */}
        <Typography variant="h3">What is this app?</Typography>
        <Typography variant="body_short">
          This is a basic React application template built with the Equinor
          Fusion Framework. It serves as a starting point for developing
          context-aware applications within the Equinor ecosystem.
        </Typography>

        <Typography variant="h3">Quick Start Steps</Typography>
        <Typography variant="body_short">
          Follow these steps to customize your app:
        </Typography>
        <List>
          <ListItem>
            <Typography variant="body_short">
              <strong>Explore the structure:</strong> Check out the pages in{' '}
              <Styled.Code>src/pages/</Styled.Code> to understand the app layout
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant="body_short">
              <strong>Add new pages:</strong> Create new components in{' '}
              <Styled.Code>src/pages/</Styled.Code> and add routes in{' '}
              <Styled.Code>src/Router.tsx</Styled.Code>
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant="body_short">
              <strong>Customize components:</strong> Modify existing components
              in <Styled.Code>src/components/</Styled.Code> or create new ones
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant="body_short">
              <strong>Update configuration:</strong> Modify app settings in{' '}
              <Styled.Code>src/config.ts</Styled.Code>
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant="body_short">
              <strong>Add context features:</strong> Use the context management
              system for context-specific functionality
            </Typography>
          </ListItem>
        </List>

        <Typography variant="h3">Documentation</Typography>
        <Typography variant="body_short">
          Read more in the following documentation sites:
        </Typography>
        <List>
          <ListItem>
            <Typography variant="body_short">
              <Typography
                link
                href="https://docs.fusion.equinor.com/docs/developer/application/getting-started/"
                target="_blank"
                rel="noreferrer"
              >
                <strong>Fusion Docs</strong>
              </Typography>
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant="body_short">
              <Typography
                link
                href="https://eds.equinor.com/"
                target="_blank"
                rel="noreferrer"
              >
                <strong>Equinor Design System (EDS)</strong>
              </Typography>
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant="body_short">
              <Typography
                link
                href="https://docs.fusion.equinor.com/docs/developer/ux-design-guidelines/"
                target="_blank"
                rel="noreferrer"
              >
                <strong>UX design guidelines</strong>
              </Typography>
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant="body_short">
              <Typography
                link
                href="https://equinor.github.io/fusion-framework/"
                target="_blank"
                rel="noreferrer"
              >
                <strong>Fusion Framework</strong>
              </Typography>
            </Typography>
          </ListItem>
        </List>
      </ContentContainer>
      <Button as={Link} variant="outlined" to="/">
        Go to Home
      </Button>
    </AppPageContainer>
  );
};

export default GettingStartedPage;
