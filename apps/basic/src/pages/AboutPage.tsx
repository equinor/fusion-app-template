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
				<Typography variant="body_short">
					The app demonstrates key features including:
				</Typography>
				<List>
					<ListItem>
						<Typography variant="body_short">
							<strong>Context Management:</strong> Switch between different
							contexts (projects, assets, etc.) and see context-specific content
						</Typography>
					</ListItem>
					<ListItem>
						<Typography variant="body_short">
							<strong>Navigation:</strong> Sidebar navigation with context-aware
							menu items that adapt based on the selected context
						</Typography>
					</ListItem>
					<ListItem>
						<Typography variant="body_short">
							<strong>Related Context:</strong> Demonstrates React Query usage
							for data fetching, caching, and state management - promoting its
							adoption for better data handling
						</Typography>
					</ListItem>
					<ListItem>
						<Typography variant="body_short">
							<strong>Design System Integration:</strong> Consistent UI
							components following Equinor Design System guidelines
						</Typography>
					</ListItem>
					<ListItem>
						<Typography variant="body_short">
							<strong>TypeScript Support:</strong> Full type safety and
							IntelliSense for better development experience
						</Typography>
					</ListItem>
				</List>

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

				<Typography variant="h3">Development Workflow</Typography>
				<Typography variant="body_short">
					Here's how to work with this template:
				</Typography>
				<List>
					<ListItem>
						<Typography variant="body_short">
							<strong>Start development:</strong> Run <code>pnpm dev</code> to
							start the development server
						</Typography>
					</ListItem>
					<ListItem>
						<Typography variant="body_short">
							<strong>Context switching:</strong> Use the context selector to
							test different contexts
						</Typography>
					</ListItem>
					<ListItem>
						<Typography variant="body_short">
							<strong>Styling:</strong> Use EDS tokens and styled-components for
							consistent styling
						</Typography>
					</ListItem>
					<ListItem>
						<Typography variant="body_short">
							<strong>TypeScript:</strong> Leverage full type safety with proper
							interfaces and types
						</Typography>
					</ListItem>
					<ListItem>
						<Typography variant="body_short">
							<strong>Testing:</strong> Add tests in <code>src/__tests__/</code>{' '}
							directory
						</Typography>
					</ListItem>
				</List>

				<Typography variant="h3">Essential Packages</Typography>
				<Typography variant="body_short">
					This basic app template uses several key packages to provide a solid
					foundation:
				</Typography>
				<List>
					<ListItem>
						<Typography variant="body_short">
							<strong>@equinor/fusion-framework-react-app:</strong> Core Fusion
							Framework for React applications, providing app configuration and
							context management
						</Typography>
					</ListItem>
					<ListItem>
						<Typography variant="body_short">
							<strong>@equinor/fusion-framework-react-module-context:</strong>{' '}
							Context management module for handling different contexts and
							their data
						</Typography>
					</ListItem>
					<ListItem>
						<Typography variant="body_short">
							<strong>@equinor/fusion-framework-module-navigation:</strong>{' '}
							Navigation module providing routing and navigation capabilities
						</Typography>
					</ListItem>
					<ListItem>
						<Typography variant="body_short">
							<strong>@equinor/eds-core-react:</strong> Equinor Design System
							components for consistent UI elements and styling
						</Typography>
					</ListItem>
					<ListItem>
						<Typography variant="body_short">
							<strong>react-router-dom:</strong> Client-side routing for
							single-page application navigation
						</Typography>
					</ListItem>
					<ListItem>
						<Typography variant="body_short">
							<strong>styled-components:</strong> CSS-in-JS styling library for
							component-based styling
						</Typography>
					</ListItem>
					<ListItem>
						<Typography variant="body_short">
							<strong>TypeScript:</strong> Type-safe JavaScript for better
							development experience and fewer runtime errors
						</Typography>
					</ListItem>
					<ListItem>
						<Typography variant="body_short">
							<strong>React Query:</strong> Data fetching and caching library
							for efficient server state management and synchronization
						</Typography>
					</ListItem>
				</List>

				<Typography variant="h3">Resources & Next Steps</Typography>
				<Typography variant="body_short">
					Helpful resources to continue your development:
				</Typography>
				<List>
					<ListItem>
						<Typography variant="body_short">
							<strong>Fusion Framework:</strong> Check the documentation for
							advanced features
						</Typography>
					</ListItem>
					<ListItem>
						<Typography variant="body_short">
							<strong>EDS Components:</strong> Explore the full component
							library at design.eds.equinor.com
						</Typography>
					</ListItem>
					<ListItem>
						<Typography variant="body_short">
							<strong>Context Management:</strong> Learn about context-specific
							features and data handling
						</Typography>
					</ListItem>
					<ListItem>
						<Typography variant="body_short">
							<strong>Styling Guide:</strong> Use EDS tokens for consistent
							theming and spacing
						</Typography>
					</ListItem>
					<ListItem>
						<Typography variant="body_short">
							<strong>TypeScript:</strong> Leverage the full type system for
							better development experience
						</Typography>
					</ListItem>
				</List>
			</ContentContainer>
			<Button variant="outlined" href="./">
				Go to Home
			</Button>
		</AppPageContainer>
	);
};
