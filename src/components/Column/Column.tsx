import { Stack } from '@mui/material';
import Task from '../Task/Task';
import './Column.scss';

/* interface ColumnProps {} */

const Column = () => {
  return (
    <div className="Column" data-testid="Column">
      Column
      <Stack direction={{ xs: 'column', sm: 'column' }} spacing={{ xs: 1, sm: 2, md: 4 }}>
        <Task />
      </Stack>
    </div>
  );
};

export default Column;
