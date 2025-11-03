/**
 * @fileoverview Getting started page component for the basic Fusion Framework template.
 *
 * Provides guidance and documentation for developers using the template.
 * Includes information about the app structure, features, and next steps.
 *
 */

import { Typography, Button, List, ListItem } from '@equinor/eds-core-react';

import { AppPageContainer } from '@/components/AppPageContainer';
import { ContentContainer } from '@/components/ContentContainer';
import { Link } from 'react-router';

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
              <code>src/pages/</code> to understand the app layout
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant="body_short">
              <strong>Add new pages:</strong> Create new components in{' '}
              <code>src/pages/</code> and add routes in{' '}
              <code>src/Router.tsx</code>
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant="body_short">
              <strong>Customize components:</strong> Modify existing components
              in <code>src/components/</code> or create new ones
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant="body_short">
              <strong>Update configuration:</strong> Modify app settings in{' '}
              <code>src/config.ts</code>
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
                href="https://fusion-docs.fusion-dev.net/docs/developer/getting-started/"
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
                href="https://fusion-docs.fusion-dev.net/docs/developer/ux-design-guidelines/"
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
