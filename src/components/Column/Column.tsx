import { Button, Fab, Paper, Stack } from '@mui/material';
import Task from '../Task/Task';
import './Column.scss';

const Column = (column: ColumnInterface) => {
  let editMode = true;
  const handleInput = () => {
    editMode = true;
    console.log('handlelel');
  };
  return (
    <Paper elevation={12} sx={{ width: '272px', order: `${column.order}`, height: '53vh' }}>
      <div className="column__title-container title-container">
        <form onSubmit={() => handleInput}>
          <div className="title-container__buttons" hidden={editMode}>
            <Fab variant="extended" size="small" color="primary" aria-label="add" hidden={editMode}>
              Submit
            </Fab>
            <Fab variant="extended" size="small" color="primary" aria-label="add">
              Cancel
            </Fab>
          </div>
          <input
            type="text"
            id="filled-size-small"
            defaultValue={column.title}
            /* variant="standard"
            size="small"
            sx={{ width: '100%' }} */
            onChange={() => handleInput}
          />
        </form>
      </div>
      <div className="column__buttons-container button-container">
        <Button variant="outlined" /* onClick={() => console.log(column.id)} */>Add task</Button>
        <Button variant="outlined" /* onClick={() => console.log(column.id)} */>
          Delete column
        </Button>
      </div>
      <div className="column__tasks-container" data-testid="Column">
        <Stack direction={{ xs: 'column', sm: 'column' }} spacing={{ xs: 1, sm: 2, md: 4 }}>
          <Task />
        </Stack>
      </div>
    </Paper>
  );
};

export default Column;
