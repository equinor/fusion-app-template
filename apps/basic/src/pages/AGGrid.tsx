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
    {
      id: 4,
      name: 'Alice Brown',
      department: 'Engineering',
      salary: 78000,
      startDate: '2023-02-10',
      active: true
    },
    {
      id: 5,
      name: 'Tom Wilson',
      department: 'Marketing',
      salary: 65000,
      startDate: '2022-11-05',
      active: true
    },
    {
      id: 6,
      name: 'Emma Davis',
      department: 'Design',
      salary: 72000,
      startDate: '2021-04-18',
      active: true
    },
    {
      id: 7,
      name: 'Michael Lee',
      department: 'Product',
      salary: 85000,
      startDate: '2019-09-30',
      active: false
    },
    {
      id: 8,
      name: 'Sarah Taylor',
      department: 'Engineering',
      salary: 80000,
      startDate: '2023-06-12',
      active: true
    },
    {
      id: 9,
      name: 'David Clark',
      department: 'Sales',
      salary: 70000,
      startDate: '2022-07-25',
      active: true
    },
    {
      id: 10,
      name: 'Laura Martinez',
      department: 'Design',
      salary: 69000,
      startDate: '2020-12-01',
      active: false
    },
    {
      id: 11,
      name: 'James White',
      department: 'Engineering',
      salary: 90000,
      startDate: '2021-03-15',
      active: true
    },
    {
      id: 12,
      name: 'Emily Harris',
      department: 'Marketing',
      salary: 67000,
      startDate: '2023-01-20',
      active: true
    },
    {
      id: 13,
      name: 'Chris Evans',
      department: 'Product',
      salary: 83000,
      startDate: '2020-05-08',
      active: true
    },
    {
      id: 14,
      name: 'Olivia King',
      department: 'Sales',
      salary: 71000,
      startDate: '2022-09-14',
      active: true
    },
    {
      id: 15,
      name: 'Daniel Moore',
      department: 'Engineering',
      salary: 87000,
      startDate: '2019-11-22',
      active: false
    },
    {
      id: 16,
      name: 'Sophia Walker',
      department: 'Design',
      salary: 73000,
      startDate: '2021-10-10',
      active: true
    },
    {
      id: 17,
      name: 'Ryan Adams',
      department: 'Marketing',
      salary: 66000,
      startDate: '2023-03-05',
      active: true
    },
    {
      id: 18,
      name: 'Mia Thompson',
      department: 'Product',
      salary: 79000,
      startDate: '2020-08-17',
      active: true
    },
    {
      id: 19,
      name: 'Ethan Young',
      department: 'Sales',
      salary: 74000,
      startDate: '2022-04-30',
      active: false
    },
    {
      id: 20,
      name: 'Ava Green',
      department: 'Engineering',
      salary: 82000,
      startDate: '2021-06-28',
      active: true
    },
    {
      id: 21,
      name: 'Liam Carter',
      department: 'Engineering',
      salary: 88000,
      startDate: '2023-07-19',
      active: true
    },
    {
      id: 22,
      name: 'Isabella Wright',
      department: 'Design',
      salary: 71000,
      startDate: '2022-02-28',
      active: true
    },
    {
      id: 23,
      name: 'Noah Hill',
      department: 'Product',
      salary: 84000,
      startDate: '2020-10-05',
      active: false
    },
    {
      id: 24,
      name: 'Chloe Turner',
      department: 'Marketing',
      salary: 68000,
      startDate: '2023-04-12',
      active: true
    },
    {
      id: 25,
      name: 'Lucas Scott',
      department: 'Sales',
      salary: 72000,
      startDate: '2021-12-15',
      active: true
    },
    {
      id: 26,
      name: 'Grace Parker',
      department: 'Engineering',
      salary: 86000,
      startDate: '2020-06-22',
      active: true
    },
    {
      id: 27,
      name: 'Mason Lewis',
      department: 'Design',
      salary: 70000,
      startDate: '2022-08-09',
      active: false
    },
    {
      id: 28,
      name: 'Harper Allen',
      department: 'Product',
      salary: 81000,
      startDate: '2021-05-03',
      active: true
    },
    {
      id: 29,
      name: 'Elijah Brooks',
      department: 'Marketing',
      salary: 67000,
      startDate: '2023-09-25',
      active: true
    },
    {
      id: 30,
      name: 'Amelia Cook',
      department: 'Sales',
      salary: 75000,
      startDate: '2020-11-30',
      active: false
    },
  ]);

  // Define your table columns
  const columnDefs = useMemo<ColDef<Employee>[]>(() => {
    return [
      {
        headerName: 'Name',
        field: 'name',
        filter: 'agTextColumnFilter', // Built-in text filter
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
          }}
          pagination={true}
          paginationPageSize={50}
          sideBar={sideBar}
          onGridReady={onGridReady}
        />
      </Styled.AGContainer>
    </>
  );
};

export default AGGridPage;
