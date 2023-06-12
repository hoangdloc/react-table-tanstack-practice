import { Column, Table } from '@tanstack/react-table';
import { Person } from '../../interfaces/person';

interface TableHeaderFilterProps {
  table: Table<Person>;
  column: Column<Person, unknown>;
}

const TableHeaderFilter: React.FC<TableHeaderFilterProps> = ({
  table,
  column
}) => {
  const firstValue = table
    .getPreFilteredRowModel()
    .flatRows[0]?.getValue(column.id);
  const columnFilterValue = column.getFilterValue();

  if (column.columnDef.header === 'Gender') {
    return (
      <select
        className="px-3 py-1 bg-white border border-white rounded focus:border-opacity-50 focus:bg-opacity-50 border-opacity-20 bg-opacity-20 focus:outline-yellow-500"
        value={(columnFilterValue ?? '') as string}
        onChange={e => column.setFilterValue(e.target.value)}
      >
        {['default', 'male', 'female'].map(option => (
          <option
            className="bg-none"
            value={option}
            key={option}
          >
            {option.charAt(0).toUpperCase() + option.slice(1)}
          </option>
        ))}
      </select>
    );
  }

  if (typeof firstValue === 'number') {
    return (
      <div className="flex items-center justify-center gap-2">
        <input
          type="number"
          placeholder="Min"
          value={(columnFilterValue as [number, number])?.[0] ?? ''}
          onChange={e =>
            column.setFilterValue((old: [number, number]) => [
              e.target.value,
              old?.[1]
            ])
          }
          className="w-20"
        />
        <input
          type="number"
          placeholder="Max"
          value={(columnFilterValue as [number, number])?.[1] ?? ''}
          onChange={e =>
            column.setFilterValue((old: [number, number]) => [
              old?.[0],
              e.target.value
            ])
          }
          className="w-20"
        />
      </div>
    );
  }

  return (
    <input
      type="text"
      placeholder="Search..."
      value={(columnFilterValue ?? '') as string}
      onChange={e => column.setFilterValue(e.target.value)}
      className="w-36"
    />
  );
};

export default TableHeaderFilter;
