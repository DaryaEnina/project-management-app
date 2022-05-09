import { Stack } from '@mui/material';
import Task from '../Task/Task';
import './Column.scss';
import { ColumnInterface } from './columnInterface';

/* interface ColumnProps {} */

const Column = (column: ColumnInterface) => {
  return (
    <div className="Column" data-testid="Column">
      {column.title}
      <Stack direction={{ xs: 'column', sm: 'column' }} spacing={{ xs: 1, sm: 2, md: 4 }}>
        <Task />
      </Stack>
    </div>
  );
};

export default Column;
