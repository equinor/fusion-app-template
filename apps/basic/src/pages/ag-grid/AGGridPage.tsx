/**
 * @fileoverview AG Grid demo page for the basic Fusion Framework template.
 *
 * Composes the column definitions, sidebar config, and sample data imported
 * from sibling modules into a single page. This page demonstrates how to
 * wire AG Grid with Fusion Framework theming, pagination, row selection, and
 * enterprise sidebar panels.
 *
 * @see {@link ./columns.tsx} for column definitions
 * @see {@link ./sidebar.ts} for sidebar panel configuration
 * @see {@link ./data.ts} for sample employee fixture
 */

import { useMemo, useCallback } from 'react';

import { AgGridReact } from '@equinor/fusion-framework-react-ag-grid';
import type {
  ColDef,
  GridReadyEvent,
} from '@equinor/fusion-framework-react-ag-grid/community';
import { Typography } from '@equinor/eds-core-react';
import styled from 'styled-components';

import AppPageContainer from '@/components/AppPageContainer';

import { EMPLOYEES } from './data';
import { createColumnDefs } from './columns';
import { sideBarDef } from './sidebar';

const Styled = {
  /** Container that fills available viewport height for the grid. */
  AGContainer: styled.div<{ $removeHeight?: number }>`
    width: 100%;
    height: calc(
      100vh - var(--header-height, 100px)
        ${(props) => (props.$removeHeight ? ` - ${props.$removeHeight}px` : '')}
    );
    position: relative;
  `,
};

/** Shared defaults applied to every column unless overridden. */
const DEFAULT_COL_DEF: ColDef = {
  resizable: true,
  filter: true,
  filterParams: { applyMiniFilterWhileTyping: true },
  sortable: true,
  minWidth: 100,
};

/**
 * AG Grid demo page showcasing enterprise-grade data grid capabilities.
 *
 * Demonstrates column definitions with filters, value formatters, styled cell
 * renderers, sidebar tool panels, pagination, and multi-row selection using
 * Fusion Framework's AG Grid integration with EDS theming.
 *
 * @returns JSX element containing the AG Grid demo
 *
 * @component
 */
export default function AGGridPage() {
  const columnDefs = useMemo(createColumnDefs, []);

  // Auto-size columns to fill the available grid width on first render
  const onGridReady = useCallback((params: GridReadyEvent) => {
    params.api.sizeColumnsToFit();
  }, []);

  return (
    <>
      <AppPageContainer>
        <Typography variant="h1">AG-Grid</Typography>
        <Typography variant="body_short">
          AG Grid is a powerful, enterprise-grade data table component for
          Fusion applications, offering pre-configured theming and seamless
          integration to build high-performance, feature-rich grids. It handles
          large datasets with virtual scrolling, supports sorting, filtering,
          search, and Excel export, and provides responsive design,
          accessibility, and enterprise features like pivot tables and custom
          renderers, all in an intuitive interface.
        </Typography>

        <Typography variant="body_short">
          You can read more in the{' '}
          <Typography
            link
            href="https://docs.fusion.equinor.com/docs/developer/application/ag-grid"
            target="_blank"
            rel="noreferrer"
          >
            documentation
          </Typography>
          .
        </Typography>
      </AppPageContainer>

      <Styled.AGContainer $removeHeight={185}>
        <AgGridReact
          rowData={EMPLOYEES}
          columnDefs={columnDefs}
          defaultColDef={DEFAULT_COL_DEF}
          rowSelection={{ mode: 'multiRow' }}
          pagination
          paginationPageSize={50}
          sideBar={sideBarDef}
          onGridReady={onGridReady}
        />
      </Styled.AGContainer>
    </>
  );
}
