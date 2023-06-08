import { useEffect, useState } from 'react';
import { Person } from './interfaces/person';
import axiosInstance from './api/axios';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable
} from '@tanstack/react-table';

const columnHelper = createColumnHelper<Person>();

const columns = [
  columnHelper.accessor('firstName', {
    cell: (info) => info.getValue(),
    header: 'First name'
  }),
  columnHelper.accessor('lastName', {
    cell: (info) => info.getValue(),
    header: 'Last name'
  }),
  columnHelper.accessor('gender', {
    cell: (info) => info.getValue(),
    header: 'Gender'
  }),
  columnHelper.accessor('age', {
    cell: (info) => info.getValue(),
    header: 'Age'
  }),
  columnHelper.accessor('phone', {
    cell: (info) => info.getValue(),
    header: 'Phone number'
  }),
  columnHelper.accessor('avatar', {
    cell: (info) => (
      <figure className="w-16 h-16 rounded-full overflow-hidden">
        <img
          className="w-full h-full object-cover"
          src={info.getValue()}
          alt="User thumbnail"
        />
      </figure>
    ),
    header: 'Thumbnail'
  })
];

const App: React.FC = () => {
  const [users, setUsers] = useState<Person[]>([]);

  const table = useReactTable({
    data: users,
    columns,
    getCoreRowModel: getCoreRowModel()
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
    <main className="py-8 px-4 flex flex-col gap-12 items-center justify-center">
      <h1 className="text-3xl font-semibold">React Table Example</h1>
      <div className="w-[90%] flex flex-col gap-4">
        <div className="py-2 px-12 bg-gray-50 bg-opacity-40 w-full rounded-lg">
          Toolbar
        </div>
        <table className="bg-gray-50 bg-opacity-40 backdrop-blur rounded-lg w-full">
          <thead>
            {table.getHeaderGroups().map((headerGroups) => (
              <tr key={headerGroups.id}>
                {headerGroups.headers.map((header) => (
                  <th
                    key={header.id}
                    className="py-6 px-12"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="hover:bg-gray-50 hover:bg-opacity-50 transition-all"
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="py-2 px-12"
                  >
                    <div className="flex items-center justify-center">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <div className="py-2 px-12 bg-gray-50 bg-opacity-40 w-full rounded-lg">
          Pagination
        </div>
      </div>
    </main>
  );
};

export default App;
