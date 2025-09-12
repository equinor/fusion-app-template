/**
 * @fileoverview Context detail side sheet component for the basic Fusion Framework template.
 *
 * Displays context details in a side sheet with JSON representation of context data.
 *
 */

import type { RelatedContextSchema } from '@/api/related-context/models';
import type { ContextItem } from '@equinor/fusion-framework-react-module-context';
import { SideSheet } from '@equinor/fusion-react-side-sheet';

interface ContextDetailSideSheetProps {
	// The context data to display
	readonly context: ContextItem | RelatedContextSchema | null;
	// Whether the side sheet is open
	readonly isOpen: boolean;
	// Callback when the side sheet is closed
	readonly onClose: () => void;
}

/**
 * Extracts the subtitle from a context object based on its type.
 *
 * @param context - The context object to extract subtitle from
 * @returns The subtitle string for the context
 */
const getContextSubtitle = (
	context: ContextItem | RelatedContextSchema,
): string => {
	// RelatedContextSchema has type as object with id property
	if (
		'type' in context &&
		typeof context.type === 'object' &&
		context.type !== null
	) {
		const relatedContext = context as RelatedContextSchema;
		return relatedContext.type?.id || 'Unknown';
	}

	// ContextItem has type as string
	if ('type' in context && typeof context.type === 'string') {
		return context.type;
	}

	return 'Unknown';
};

/**
 * Side sheet component that displays context details.
 *
 * Shows context information in a side sheet with title, subtitle, and JSON content.
 *
 * @param props - The component props
 * @param props.context - The context data to display
 * @param props.isOpen - Whether the side sheet is open
 * @param props.onClose - Callback when the side sheet is closed
 * @returns JSX element or null if no context or not open
 *
 * @component
 */
export const ContextDetailSideSheet = (props: ContextDetailSideSheetProps) => {
	const { context, isOpen, onClose } = props;

	// Don't render if no context data or side sheet is closed
	// This prevents unnecessary rendering and improves performance
	if (!context || !isOpen) return null;

	// Extract subtitle using the external utility function
	const subtitle = getContextSubtitle(context);

	return (
		<SideSheet isOpen={isOpen} onClose={onClose}>
			{/* Display context title - fallback to ID if title is not available */}
			<SideSheet.Title title={String(context.title ?? context.id)} />

			{/* Display context type information */}
			<SideSheet.SubTitle subTitle={subtitle} />

			{/* Show full context data as formatted JSON for debugging/inspection */}
			{/* In a real app, you might want to create a more user-friendly display */}
			<SideSheet.Content>
				<pre>{JSON.stringify(context, null, 2)}</pre>
			</SideSheet.Content>
		</SideSheet>
	);
};
