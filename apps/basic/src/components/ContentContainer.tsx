/**
 * @fileoverview Flexible content container component for the basic Fusion Framework template.
 *
 * Provides consistent layout with configurable direction for different content arrangements.
 *
 */

import styled from 'styled-components';

import { tokens } from '@equinor/eds-tokens';

// Styled container with configurable flex direction
const Styled = {
  // Flexible container that can arrange content in row or column
  // Useful for creating different layout patterns within pages
  Container: styled.div<{ direction: 'row' | 'column' }>(({ direction }) => ({
    display: 'flex',
    flexDirection: direction,
    gap: tokens.spacings.comfortable.medium,
    // Align items based on direction for better visual alignment
    alignItems: direction === 'row' ? 'flex-start' : 'stretch',
  })),
};

interface ContentContainerProps {
  children: React.ReactNode;
  direction?: 'row' | 'column';
}

/**
 * Flexible content container with configurable direction.
 *
 * Provides consistent layout with configurable flex direction for different
 * content arrangements (row or column).
 *
 * @param props - The component props
 * @param props.children - The content to be arranged
 * @param props.direction - The flex direction ('row' or 'column'), defaults to 'column'
 * @returns JSX element containing the arranged content
 *
 * @component
 */
export const ContentContainer = ({
  children,
  direction = 'column', // Default to column layout for most use cases
}: ContentContainerProps) => {
  // Render content with the specified direction
  // Use 'row' for side-by-side layouts, 'column' for stacked layouts
  return <Styled.Container direction={direction}>{children}</Styled.Container>;
};

export default ContentContainer;
