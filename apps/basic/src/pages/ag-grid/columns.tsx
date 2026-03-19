/**
 * @fileoverview AG Grid column definitions for the employee demo.
 *
 * Each column specifies its own filter type, value formatter, and optional
 * cell renderer. Extracting columns into a standalone module keeps the page
 * component focused on layout and data wiring.
 */

import type {
  ColDef,
  ICellRendererParams,
} from '@equinor/fusion-framework-react-ag-grid/community';

import type { Employee } from './types';
import { StatusBadge } from './StatusBadge';

/**
 * Column definitions for the employee AG Grid demo.
 *
 * @returns An array of column definitions typed to {@link Employee}
 */
export const createColumnDefs = (): ColDef<Employee>[] => [
  {
    headerName: 'Name',
    field: 'name',
    filter: 'agTextColumnFilter',
  },
  {
    headerName: 'Department',
    field: 'department',
    width: 150,
    filter: 'agSetColumnFilter',
  },
  {
    headerName: 'Salary',
    field: 'salary',
    width: 120,
    type: 'numericColumn',
    valueFormatter: (params) => `$${params.value?.toLocaleString()}`,
    filter: 'agNumberColumnFilter',
  },
  {
    headerName: 'Start Date',
    field: 'startDate',
    width: 130,
    valueFormatter: (params) => new Date(params.value).toLocaleDateString(),
    filter: 'agDateColumnFilter',
  },
  {
    headerName: 'Status',
    field: 'active',
    width: 100,
    cellRenderer: (params: ICellRendererParams) => (
      <StatusBadge $active={params.value}>
        {params.value ? 'Active' : 'Inactive'}
      </StatusBadge>
    ),
    filter: 'agSetColumnFilter',
  },
];
