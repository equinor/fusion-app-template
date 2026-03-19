/**
 * @fileoverview Styled status badge for AG Grid active/inactive cells.
 */

import styled from 'styled-components';
import { tokens } from '@equinor/eds-tokens';

/**
 * Inline badge that renders "Active" or "Inactive" with EDS semantic colors.
 *
 * Uses `success__resting` for active and `danger__resting` for inactive,
 * ensuring consistent color semantics across the application.
 *
 * @example
 * ```tsx
 * <StatusBadge $active={params.value}>
 *   {params.value ? 'Active' : 'Inactive'}
 * </StatusBadge>
 * ```
 */
export const StatusBadge = styled.span<{ $active: boolean }>`
  color: ${(props) =>
    props.$active
      ? tokens.colors.interactive.success__resting.hex
      : tokens.colors.interactive.danger__resting.hex};
  font-weight: ${tokens.typography.paragraph.body_short_bold.fontWeight};
`;
