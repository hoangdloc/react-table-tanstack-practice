import { RowSelectionState, Table } from '@tanstack/react-table';
import { Person } from '../../interfaces/person';

interface TableToolbarProps {
  rowSelection: RowSelectionState;
  table: Table<Person>;
}

const TableToolbar: React.FC<TableToolbarProps> = ({ rowSelection, table }) => {
  return (
    <div className="flex items-center self-end justify-between w-full gap-4">
      <span className="text-sm underline underline-offset-4">
        {Object.keys(rowSelection).length} of{' '}
        {table.getPreFilteredRowModel().rows.length} Total Rows Selected
      </span>
      <button
        className="px-4 py-2 text-base"
        onClick={() => {
          table.resetColumnFilters();
          table.resetSorting();
          table.resetRowSelection();
          table.resetColumnPinning();
        }}
      >
        Reset All
      </button>
    </div>
  );
};

export default TableToolbar;
