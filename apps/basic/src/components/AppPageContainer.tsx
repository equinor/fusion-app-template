/**
 * @fileoverview Standardized page container component for the basic Fusion Framework template.
 *
 * Provides consistent layout and spacing for all pages in the application.
 *
 */

import styled from 'styled-components';

import { tokens } from '@equinor/eds-tokens';

// Styled container for consistent page layout
const Styled = {
	// Page container with consistent spacing and max width
	// Adjust maxWidth and padding to match your design system
	Container: styled.div({
		display: 'flex',
		flexDirection: 'column',
		gap: tokens.spacings.comfortable.medium,
		maxWidth: '800px', // Customize this for your content width needs
		padding: tokens.spacings.comfortable.medium,
	}),
};

interface AppPageContainerProps {
	children: React.ReactNode;
}

/**
 * Standardized page container with consistent layout and spacing.
 *
 * Wraps page content with standardized styling and spacing using EDS tokens.
 *
 * @param props - The component props
 * @param props.children - The content to be wrapped
 * @returns JSX element containing the wrapped content
 *
 * @component
 */
export const AppPageContainer = ({ children }: AppPageContainerProps) => {
	// Wrap page content with consistent styling and spacing
	// This ensures all pages have the same layout structure
	return <Styled.Container>{children}</Styled.Container>;
};

export default AppPageContainer;
