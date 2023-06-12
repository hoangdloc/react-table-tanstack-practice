import classNames from 'classnames';
import { HTMLProps, useEffect, useRef } from 'react';

interface TableCheckboxProps extends HTMLProps<HTMLInputElement> {
  indeterminate?: boolean;
  className?: string;
}

const TableCheckbox: React.FC<TableCheckboxProps> = ({
  indeterminate,
  className,
  ...rest
}) => {
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (typeof indeterminate === 'boolean' && ref.current != null) {
      ref.current.indeterminate = !rest.checked && indeterminate;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref, indeterminate]);

  return (
    <input
      type="checkbox"
      className={classNames('checkbox rounded-sm p-2 w-4 h-4', className)}
      ref={ref}
      {...rest}
    />
  );
};

export default TableCheckbox;
