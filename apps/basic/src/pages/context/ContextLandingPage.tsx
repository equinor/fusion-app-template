/**
 * @fileoverview Context landing page component for the basic Fusion Framework template.
 *
 * Displays context information and provides navigation to context-related features.
 * Shows current context details and allows viewing context information in a side sheet.
 *
 */

import { Link } from 'react-router-dom';
import { useState } from 'react';

import { Typography, Card, Button, Icon } from '@equinor/eds-core-react';
import { arrow_forward } from '@equinor/eds-icons';

import { useCurrentContext } from '@equinor/fusion-framework-react-app/context';

import { AppPageContainer } from '@/components/AppPageContainer';
import { ContentContainer } from '@/components/ContentContainer';
import { ContextDetailSideSheet } from '@/components/ContextDetailSideSheet';

/**
 * Context landing page with current context information.
 *
 * Displays the current context details and provides navigation to related
 * context features. Includes a side sheet for viewing detailed context information.
 *
 * @returns JSX element containing the context landing page content
 *
 * @component
 */
export const ContextLandingPage = () => {
	// Get the current Fusion Framework context
	const { currentContext } = useCurrentContext();

	// State for controlling the context details side sheet
	const [showDetails, setShowDetails] = useState(false);

	// Handle case where no context is selected
	if (!currentContext) {
		return <div>No context found</div>;
	}

	return (
		<AppPageContainer>
			<Typography variant="h1">Context Management</Typography>
			<Typography variant="body_short">
				Manage and explore context information within the Fusion Framework.
			</Typography>

			<Card>
				<Card.Header>
					<Typography variant="h3">Current Context</Typography>
				</Card.Header>
				<Card.Content>
					<ContentContainer direction="column">
						<div>
							<Typography variant="body_short_bold">Context ID:</Typography>
							<Typography variant="body_short">{currentContext.id}</Typography>
						</div>
						<div>
							<Typography variant="body_short_bold">Title:</Typography>
							<Typography variant="body_short">
								{currentContext.title || 'No title'}
							</Typography>
						</div>
						<div>
							<Typography variant="body_short_bold">Type:</Typography>
							<Typography variant="body_short">
								{currentContext.type?.id || 'Unknown'}
							</Typography>
						</div>
					</ContentContainer>
				</Card.Content>
				<Card.Actions>
					<Button to="related" as={Link}>
						View Related Contexts
						<Icon data={arrow_forward} />
					</Button>
					<Button variant="outlined" onClick={() => setShowDetails(true)}>
						Show Context Details
					</Button>
				</Card.Actions>
			</Card>
			<ContextDetailSideSheet
				context={currentContext}
				isOpen={showDetails}
				onClose={() => setShowDetails(false)}
			/>
		</AppPageContainer>
	);
};
