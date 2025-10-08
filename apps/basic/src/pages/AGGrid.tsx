import { useState, useMemo, useCallback } from 'react';
import { AgGridReact } from '@equinor/fusion-framework-react-ag-grid';
import type {
  ColDef,
  GridReadyEvent,
  ICellRendererParams,
  SideBarDef,
} from '@equinor/fusion-framework-react-ag-grid/community';
import styled from 'styled-components';
import { Typography } from '@equinor/eds-core-react';
import AppPageContainer from '@/components/AppPageContainer';

interface Employee {
  id: number;
  name: string;
  department: string;
  salary: number;
  startDate: string;
  active: boolean;
}

const Styled = {
  AGContainer: styled.div<{ $removeHeight?: number }>`
    width: 100%;
    height: calc(
      100vh - var(--header-height, 100px)
        ${(props) => (props.$removeHeight ? ` - ${props.$removeHeight}px` : '')}
    );
    position: relative;
  `,
};

export const AGGridPage: React.FC = () => {
  // Your app data - could come from API, state management, etc.
  const [employees] = useState<Employee[]>([
    {
      id: 1,
      name: 'John Doe',
      department: 'Engineering',
      salary: 75000,
      startDate: '2022-01-15',
      active: true,
    },
    {
      id: 2,
      name: 'Jane Smith',
      department: 'Design',
      salary: 68000,
      startDate: '2021-08-22',
      active: true,
    },
    {
      id: 3,
      name: 'Bob Johnson',
      department: 'Product',
      salary: 82000,
      startDate: '2020-03-10',
      active: false,
    },
  ]);

  // Define your table columns
  const columnDefs = useMemo<ColDef<Employee>[]>(() => {
    return [
      {
        headerName: 'Name',
        field: 'name',
        flex: 1, // Takes available space
        filter: 'agTextColumnFilter', // Built-in text filter
        pinned: 'left', // Keep visible when scrolling
      },
      {
        headerName: 'Department',
        field: 'department',
        width: 150,
        filter: 'agSetColumnFilter', // Dropdown filter
      },
      {
        headerName: 'Salary',
        field: 'salary',
        width: 120,
        type: 'numericColumn', // Right-aligned, numeric sorting
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
          <span
            style={{
              color: params.value ? 'green' : 'red',
              fontWeight: 'bold',
            }}
          >
            {params.value ? 'Active' : 'Inactive'}
          </span>
        ),
        filter: 'agSetColumnFilter',
      },
    ];
  }, []);

  // Default settings for all columns
  const defaultColDef = useMemo<ColDef>(() => {
    return {
      resizable: true,
      filter: true,
      filterParams: {
        applyMiniFilterWhileTyping: true,
      },
      sortable: true,
      minWidth: 100,
      cellSelection: true,
    };
  }, []);

  const sideBar: SideBarDef = {
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

  // Handle grid ready event
  const onGridReady = useCallback((params: GridReadyEvent) => {
    // Auto-size columns to fit content
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
          <a
            href="https://fusion-docs.fusion-dev.net/docs/developer/application/ag-grid"
            target="_blank"
            rel="noreferrer"
          >
            docs.
          </a>
        </Typography>

        <Typography variant="body_short" />
      </AppPageContainer>

      <Styled.AGContainer $removeHeight={185}>
        <AgGridReact
          rowData={employees}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          rowSelection={{
            mode: 'multiRow',
            enableClickSelection: true,
          }}
          pagination={true}
          paginationPageSize={20}
          sideBar={sideBar}
          onGridReady={onGridReady}
        />
      </Styled.AGContainer>
    </>
  );
};

export default AGGridPage;
