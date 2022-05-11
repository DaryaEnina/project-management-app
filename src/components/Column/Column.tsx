import { Button, Paper, Stack } from '@mui/material';
import Task from '../Task/Task';
import './Column.scss';
import { ColumnInterface } from './columnInterface';

const Column = (column: ColumnInterface) => {
  return (
    <Paper elevation={12} sx={{ width: '272px', order: `${column.order}` }}>
      <div className="Column" data-testid="Column">
        <p>{column.title}</p>
        <Button /* onClick={() => console.log(column.id)} */>Add new task</Button>
        <Stack direction={{ xs: 'column', sm: 'column' }} spacing={{ xs: 1, sm: 2, md: 4 }}>
          <Task />
        </Stack>
      </div>
    </Paper>
  );
};

export default Column;
