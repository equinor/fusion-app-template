/**
 * @fileoverview Context detail side sheet component for the basic Fusion Framework template.
 *
 * Displays context details in a side sheet with structured key-value layout
 * and a collapsible raw JSON section for debugging.
 */

import type { RelatedContextSchema } from '@/api/related-context/models';
import { Typography } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import type { ContextItem } from '@equinor/fusion-framework-react-module-context';
import { SideSheet } from '@equinor/fusion-react-side-sheet';
import { useState } from 'react';
import styled from 'styled-components';

/** Props for the {@link ContextDetailSideSheet} component. */
interface ContextDetailSideSheetProps {
  /** The context data to display */
  readonly context: ContextItem | RelatedContextSchema | null;
  /** Whether the side sheet is open */
  readonly isOpen: boolean;
  /** Callback when the side sheet is closed */
  readonly onClose: () => void;
}

const Styled = {
  /** Grid of labelled key-value rows. */
  DetailList: styled.dl`
    display: grid;
    grid-template-columns: auto 1fr;
    gap: ${tokens.spacings.comfortable.small} ${tokens.spacings.comfortable.medium};
    margin: 0;
    padding: ${tokens.spacings.comfortable.medium} 0;
  `,
  /** Label column in the detail list. */
  DetailLabel: styled(Typography).attrs({ variant: 'body_short_bold' })`
    color: ${tokens.colors.text.static_icons__tertiary.hex};
  `,
  /** Value column in the detail list. */
  DetailValue: styled(Typography).attrs({ variant: 'body_short' })`
    word-break: break-word;
  `,
  /** Collapsible raw JSON section for debugging. */
  JsonBlock: styled.pre`
    font-size: ${tokens.typography.paragraph.caption.fontSize};
    background: ${tokens.colors.ui.background__light.hex};
    padding: ${tokens.spacings.comfortable.medium};
    border-radius: 4px;
    overflow-x: auto;
    white-space: pre-wrap;
    word-break: break-all;
    margin: 0;
  `,
  /** Toggle button for the JSON section. */
  JsonToggle: styled.button`
    all: unset;
    cursor: pointer;
    color: ${tokens.colors.interactive.primary__resting.hex};
    font-size: ${tokens.typography.paragraph.body_short.fontSize};
    padding: ${tokens.spacings.comfortable.small} 0;
    &:hover {
      text-decoration: underline;
    }
  `,
};

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
 * Shows structured context information (ID, title, type) in a key-value layout
 * with an expandable raw JSON section for debugging.
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
  const [showJson, setShowJson] = useState(false);

  // Don't render if no context data or side sheet is closed
  if (!context || !isOpen) return null;

  const subtitle = getContextSubtitle(context);

  return (
    <SideSheet isOpen={isOpen} onClose={onClose}>
      <SideSheet.Title title={String(context.title ?? context.id)} />
      <SideSheet.SubTitle subTitle={subtitle} />

      <SideSheet.Content>
        {/* Structured key-value detail list */}
        <Styled.DetailList>
          <Styled.DetailLabel as="dt">ID</Styled.DetailLabel>
          <Styled.DetailValue as="dd">{context.id}</Styled.DetailValue>

          <Styled.DetailLabel as="dt">Title</Styled.DetailLabel>
          <Styled.DetailValue as="dd">
            {context.title || 'No title'}
          </Styled.DetailValue>

          <Styled.DetailLabel as="dt">Type</Styled.DetailLabel>
          <Styled.DetailValue as="dd">{subtitle}</Styled.DetailValue>
        </Styled.DetailList>

        {/* Expandable raw JSON for debugging */}
        <Styled.JsonToggle
          onClick={() => setShowJson((prev) => !prev)}
          aria-expanded={showJson}
        >
          {showJson ? 'Hide' : 'Show'} raw JSON
        </Styled.JsonToggle>
        {showJson && (
          <Styled.JsonBlock>
            {JSON.stringify(context, null, 2)}
          </Styled.JsonBlock>
        )}
      </SideSheet.Content>
    </SideSheet>
  );
};
