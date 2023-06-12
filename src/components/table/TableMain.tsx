import { Table, flexRender } from '@tanstack/react-table';
import React from 'react';
import { Person } from '../../interfaces/person';
import TableHeaderFilter from './TableHeaderFilter';
import classNames from 'classnames';
import { AiFillCaretUp, AiFillPushpin, AiOutlineClose } from 'react-icons/ai';
import { motion } from 'framer-motion';

interface TableMainProps {
  table: Table<Person>;
}

const TableMain: React.FC<TableMainProps> = ({ table }) => {
  return (
    <table className="w-full rounded-lg bg-gray-50 bg-opacity-40 backdrop-blur">
      <thead>
        {table.getHeaderGroups().map(headerGroups => (
          <tr key={headerGroups.id}>
            {headerGroups.headers.map(header => (
              <th
                key={header.id}
                colSpan={header.colSpan}
                className="px-3 py-4 align-top border-b-2 border-r-2 border-white border-opacity-40 last-of-type:border-r-0"
              >
                <div className="flex flex-col items-center justify-start w-full gap-2">
                  {header.isPlaceholder ? null : (
                    <div className="flex items-center justify-between w-full">
                      <div
                        className={classNames(
                          'flex items-center justify-center gap-2 w-full',
                          {
                            'cursor-pointer select-none hover:text-yellow-100 transition-all':
                              header.column.getCanSort()
                          }
                        )}
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        <span>
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                        </span>
                        {header.column.getCanSort() && (
                          <motion.span
                            animate={header.column.getIsSorted() || 'default'}
                            variants={{
                              asc: { rotate: 0, opacity: 1 },
                              desc: { rotate: 180, opacity: 1 },
                              default: { rotate: -90, opacity: 1 }
                            }}
                            initial={{ opacity: 0 }}
                            exit={{ opacity: 0 }}
                          >
                            <AiFillCaretUp />
                          </motion.span>
                        )}
                      </div>
                      {header.column.getCanPin() &&
                        header.column.getIsPinned() !== 'left' && (
                          <button
                            className="bg-transparent bg-none hover:bg-yellow-100"
                            onClick={() => header.column.pin('left')}
                          >
                            <AiFillPushpin />
                          </button>
                        )}
                      {header.column.getCanPin() &&
                        header.column.getIsPinned() && (
                          <button
                            className="bg-transparent bg-none hover:bg-yellow-100"
                            onClick={() => header.column.pin(false)}
                          >
                            <AiOutlineClose />
                          </button>
                        )}
                    </div>
                  )}
                  {header.column.getCanFilter() ? (
                    <TableHeaderFilter
                      table={table}
                      column={header.column}
                    />
                  ) : null}
                </div>
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map(row => (
          <tr
            key={row.id}
            className="w-full transition-all hover:bg-gray-50 hover:bg-opacity-50"
          >
            {row.getVisibleCells().map(cell => (
              <td
                key={cell.id}
                className="px-3 py-2"
              >
                <div className="flex items-center justify-center">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </div>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableMain;
