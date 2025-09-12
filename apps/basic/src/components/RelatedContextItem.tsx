/**
 * @fileoverview Related context item component for the basic Fusion Framework template.
 *
 * Displays a single related context item in a card format with type and status indicators.
 *
 */

import { Card, Typography, Chip, Button } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';
import type { RelatedContext } from '@/api/related-context/types';

// Styled components for the related context item
const Styled = {
	// Row layout for card content with consistent spacing
	CardContentRow: styled.div({
		display: 'flex',
		alignItems: 'center',
		gap: tokens.spacings.comfortable.small,
	}),
};

interface RelatedContextItemProps {
	context: RelatedContext;
	onClick?: (relatedContent: RelatedContext) => void;
	onShowDetails?: (relatedContent: RelatedContext) => void;
}

/**
 * Component for displaying a single related context item.
 *
 * Shows context information in a card format with type and status indicators.
 * Includes click handlers for navigation and detail viewing.
 *
 * @param props - The component props
 * @param props.context - The related context data to display
 * @param props.onClick - Optional callback when the context is clicked
 * @param props.onShowDetails - Optional callback to show context details
 * @returns JSX element containing the context item card
 *
 * @component
 */
export const RelatedContextItem = ({
	context: relatedContent,
	onClick,
	onShowDetails,
}: RelatedContextItemProps) => {
	// Handle setting this context as the current context
	// This typically updates the Fusion Framework context state
	const handleClick = () => {
		onClick?.(relatedContent);
	};

	// Handle showing detailed information about this context
	// This typically opens a side sheet or modal with more details
	const handleShowDetails = () => {
		onShowDetails?.(relatedContent);
	};

	return (
		<Card>
			{/* Card header with title and status indicator */}
			<Card.Header>
				<Card.HeaderTitle>{relatedContent.title}</Card.HeaderTitle>
				{/* Status chip showing if the context is active or inactive */}
				<Chip variant={relatedContent.isActive ? 'active' : 'error'}>
					{relatedContent.isActive ? 'Active' : 'Inactive'}
				</Chip>
			</Card.Header>

			{/* Card content with context details */}
			<Card.Content>
				{/* Context type information */}
				<Styled.CardContentRow>
					<Typography group="table" variant="cell_header">
						type:
					</Typography>
					<Typography group="table" variant="cell_text">
						{relatedContent.type}
					</Typography>
				</Styled.CardContentRow>

				{/* Display name with additional context information */}
				<Styled.CardContentRow>
					<Typography group="table" variant="cell_header">
						display name:
					</Typography>
					<Typography group="table" variant="cell_text">
						{relatedContent.displayName}
					</Typography>
				</Styled.CardContentRow>
			</Card.Content>

			{/* Action buttons for context interaction */}
			<Card.Actions>
				{/* Primary action: set this context as current */}
				<Button onClick={handleClick}>Set as current context</Button>

				{/* Secondary action: view detailed information */}
				<Button variant="outlined" onClick={handleShowDetails}>
					Show Details
				</Button>
			</Card.Actions>
		</Card>
	);
};

export default RelatedContextItem;
