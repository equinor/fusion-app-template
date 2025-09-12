/**
 * @fileoverview Main application container component for the basic Fusion Framework template.
 *
 * Provides the main layout with sidebar navigation and content area. Includes
 * context-aware navigation that adapts based on the current Fusion Framework context.
 *
 */

import { Link, Outlet, useMatches } from 'react-router-dom';

import styled from 'styled-components';

import { Paper, SideBar } from '@equinor/eds-core-react';
import { home, play_circle, business } from '@equinor/eds-icons';
import { tokens } from '@equinor/eds-tokens';

import { useCurrentContext } from '@equinor/fusion-framework-react-app/context';

import { useCallback } from 'react';

// Styled components for the main app layout
const Styled = {
	// Root container that holds both sidebar and main content
	Root: styled.div({
		display: 'flex',
		height: '100%',
	}),
	// Main content area with paper background and scrolling
	AppContainer: styled(Paper)({
		padding: tokens.spacings.comfortable.medium,
		width: '100%',
		overflow: 'auto',
	}),
};

/**
 * Main application container with sidebar navigation and content area.
 *
 * Provides the primary layout structure with context-aware navigation.
 * The sidebar adapts based on the current Fusion Framework context,
 * showing context-specific navigation items when available.
 *
 * @returns JSX element containing the main app layout
 *
 * @component
 */
export const AppContainer = () => {
	// Get the currently matched route to determine active navigation items
	// This helps highlight the correct menu item based on the current page
	const matchedRoutes = useMatches();
	const matchedRoute = matchedRoutes.pop();

	// Get the current Fusion Framework context (user's selected context)
	// This is used to show context-specific navigation and content
	const { currentContext } = useCurrentContext();

	// Context-specific navigation items that only appear when a context is selected
	// This demonstrates how to create dynamic navigation based on context
	const ContextItems = useCallback(() => {
		// Don't show context navigation if no context is selected
		if (!currentContext) return null;

		// Create an accordion menu for context-related pages
		// This pattern can be extended with more context-specific routes
		return (
			<SideBar.Accordion icon={business} label="Context" isExpanded>
				<SideBar.AccordionItem
					label="info"
					to={`/${currentContext.id}`}
					as={Link}
					active={matchedRoute?.id === 'context-home'}
				/>
				<SideBar.AccordionItem
					label="related"
					to={`/${currentContext.id}/related`}
					as={Link}
					active={matchedRoute?.id === 'context-related'}
				/>
			</SideBar.Accordion>
		);
	}, [currentContext, matchedRoute?.id]);

	return (
		<Styled.Root>
			{/* Main navigation sidebar - customize the links for your app */}
			<SideBar open>
				<SideBar.Content>
					{/* Sidebar toggle button for mobile/desktop */}
					<SideBar.Toggle />

					{/* Static navigation links - add your app's main pages here */}
					<SideBar.Link
						icon={home}
						label="Home"
						to={'/'}
						as={Link}
						active={matchedRoute?.id === 'home'}
					/>
					<SideBar.Link
						icon={play_circle}
						label="Getting Started"
						to="/getting-started"
						as={Link}
						active={matchedRoute?.id === 'getting-started'}
					/>

					{/* Dynamic context-specific navigation */}
					<ContextItems />
				</SideBar.Content>
			</SideBar>

			{/* Main content area where page content is rendered */}
			<Styled.AppContainer>
				<Outlet />
			</Styled.AppContainer>
		</Styled.Root>
	);
};
