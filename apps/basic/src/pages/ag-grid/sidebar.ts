/**
 * @fileoverview AG Grid sidebar configuration for tool panels.
 *
 * Configures the columns and filters panels that appear in the grid sidebar.
 * Extracted so the page component stays focused on composition.
 */

import type { SideBarDef } from '@equinor/fusion-framework-react-ag-grid/community';

/**
 * Sidebar definition with column-visibility and filter tool panels.
 *
 * The sidebar is collapsed by default (`defaultToolPanel: ''`). Users can
 * expand it to toggle column visibility or apply advanced filters.
 */
export const sideBarDef: SideBarDef = {
  toolPanels: [
    {
      id: 'columns',
      labelDefault: 'Columns',
      labelKey: 'columns',
      iconKey: 'columns',
      toolPanel: 'agColumnsToolPanel',
      toolPanelParams: {
        suppressRowGroups: false,
        suppressValues: true,
        suppressPivots: true,
        suppressPivotMode: true,
        suppressColumnFilter: true,
        suppressColumnSelectAll: true,
        suppressColumnExpandAll: true,
      },
    },
    {
      id: 'filters',
      labelDefault: 'Filters',
      labelKey: 'filters',
      iconKey: 'filter',
      toolPanel: 'agFiltersToolPanel',
      toolPanelParams: {
        suppressExpandAll: true,
        suppressFilterSearch: false,
      },
    },
  ],
  defaultToolPanel: '',
};
