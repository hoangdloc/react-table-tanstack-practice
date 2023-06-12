import { useEffect, useState } from 'react';
import { Person } from './interfaces/person';
import axiosInstance from './api/axios';
import {
  createColumnHelper,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  useReactTable,
  SortingState,
  getSortedRowModel,
  RowSelectionState,
  ColumnPinningState
} from '@tanstack/react-table';
import { TableMain, TablePagination, TableToolbar } from './components/table';
import TableCheckbox from './components/table/TableCheckbox';

const columnHelper = createColumnHelper<Person>();

const columns = [
  columnHelper.display({
    id: 'select',
    header: ({ table }) => (
      <TableCheckbox
        {...{
          checked: table.getIsAllRowsSelected(),
          indeterminate: table.getIsSomeRowsSelected(),
          onChange: table.getToggleAllRowsSelectedHandler()
        }}
      />
    ),
    cell: ({ row }) => (
      <TableCheckbox
        {...{
          checked: row.getIsSelected(),
          disabled: !row.getCanSelect(),
          indeterminate: row.getIsSomeSelected(),
          onChange: row.getToggleSelectedHandler()
        }}
      />
    ),
    enablePinning: false
  }),
  columnHelper.group({
    id: 'name',
    header: 'Name',
    columns: [
      columnHelper.accessor('firstName', {
        cell: info => info.getValue(),
        header: 'First name'
      }),
      columnHelper.accessor('lastName', {
        cell: info => info.getValue(),
        header: 'Last name'
      })
    ]
  }),
  columnHelper.group({
    id: 'info',
    header: 'Info',
    columns: [
      columnHelper.accessor('gender', {
        cell: info =>
          info.getValue().charAt(0).toUpperCase() + info.getValue().slice(1),
        header: 'Gender',
        filterFn: (row, _, value) => {
          if (value === 'default') return true;
          return row.original.gender === value;
        },
        enableSorting: false
      }),
      columnHelper.accessor('age', {
        cell: info => info.getValue(),
        header: 'Age'
      }),
      columnHelper.accessor('country', {
        cell: info => info.getValue(),
        header: 'Country'
      }),
      columnHelper.accessor('phone', {
        cell: info => info.getValue(),
        header: 'Phone number'
      })
    ]
  }),
  columnHelper.accessor('avatar', {
    cell: info => (
      <figure className="w-12 h-12 overflow-hidden rounded-full">
        <img
          className="object-cover w-full h-full"
          src={info.getValue()}
          alt="User thumbnail"
        />
      </figure>
    ),
    header: 'Thumbnail',
    enableColumnFilter: false,
    enableSorting: false
  })
];

const App: React.FC = () => {
  const [users, setUsers] = useState<Person[]>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [columnPinning, setColumnPinning] = useState<ColumnPinningState>({});

  const table = useReactTable({
    data: users,
    columns,
    state: {
      sorting,
      rowSelection,
      columnPinning
    },
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    onColumnPinningChange: setColumnPinning,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel()
  });

  useEffect(() => {
    const loadUsers = async (): Promise<void> => {
      const response = await axiosInstance.get('/');
      const data: Person[] = response.data;
      setUsers(data);
    };

    void loadUsers();
  }, []);

  return (
    <main className="flex flex-col items-center justify-center gap-12 px-4 py-8">
      <h1 className="text-3xl font-semibold">React Table Example 🚀</h1>
      <div className="w-[98%] flex flex-col items-center justify-center gap-4">
        <TableToolbar
          rowSelection={rowSelection}
          table={table}
        />
        <TableMain table={table} />
        <TablePagination table={table} />
      </div>
    </main>
  );
};

export default App;
