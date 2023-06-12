import { Table } from '@tanstack/react-table';
import { Person } from '../../interfaces/person';
import {
  AiFillFastBackward,
  AiFillBackward,
  AiFillFastForward,
  AiFillForward
} from 'react-icons/ai';
import limitNumberInput from '../../utils/limitNumberInput';

interface TablePaginationProps {
  table: Table<Person>;
}

const TablePagination: React.FC<TablePaginationProps> = ({ table }) => {
  const handlePageInput = (value: string): void => {
    const page = value ? +value - 1 : 0;
    table.setPageIndex(page);
  };

  return (
    <div className="flex items-center justify-center gap-12 px-12 py-2 rounded-lg w-max bg-gray-50 bg-opacity-40">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <button
            className="w-8 h-8"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <AiFillFastBackward />
          </button>
          <button
            className="w-8 h-8"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <AiFillBackward />
          </button>
          <button
            className="w-8 h-8"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <AiFillForward />
          </button>
          <button
            className="w-8 h-8"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <AiFillFastForward />
          </button>
        </div>
        <div className="flex items-center min-w-[140px] gap-2">
          <span>Page:</span>
          <strong>
            {table.getPageCount() !== 0
              ? table.getState().pagination.pageIndex + 1
              : 0}{' '}
            of {table.getPageCount()}
          </strong>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <span>Go to page:</span>
        <input
          type="number"
          className="w-32"
          min="1"
          max={table.getPageCount().toString()}
          value={table.getState().pagination.pageIndex + 1}
          onChange={e => {
            handlePageInput(
              limitNumberInput(e.target.value, 1, table.getPageCount())
            );
          }}
        />
      </div>
      <select
        value={table.getState().pagination.pageSize}
        onChange={e => table.setPageSize(+e.target.value)}
      >
        {[10, 20, 30, 40, 50].map(pageSize => (
          <option
            className="bg-none"
            key={pageSize}
            value={pageSize}
          >
            Show {pageSize}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TablePagination;
