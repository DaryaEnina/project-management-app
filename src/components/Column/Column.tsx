import { Button, Fab, Paper, Stack } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../hooks/storeHooks';
import { createTask } from '../../store/slices/boardsListSlice';
import Task from '../Task/Task';
import './Column.scss';

const Column = (column: ColumnInterface) => {
  const dispatch = useAppDispatch();
  const currentBoard = useAppSelector((state) => state.currentBoard);

  let editMode = true;
  const handleInput = () => {
    editMode = true;
  };
  return (
    <Paper
      elevation={12}
      sx={{ width: '272px', order: `${column.order}`, height: '53vh', backgroundColor: '#B3DCFD' }}
    >
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
        <Button
          variant="contained"
          //TODO: fix appearing only after check another board
          onClick={() => dispatch(createTask({ boardId: currentBoard.id, columnId: column.id }))}
        >
          Add task
        </Button>
        <Button variant="contained" /* onClick={() => console.log(column.id)} */>
          Delete column
        </Button>
      </div>
      <div className="column__tasks-container" data-testid="Column">
        <Stack direction={{ xs: 'column', sm: 'column' }} spacing={{ xs: 1, sm: 2, md: 4 }}>
          {column.tasks?.map((task: TaskInterface) => (
            <Task key={task.id} title={task.title} order={task.order} id={task.id} />
          ))}
        </Stack>
      </div>
    </Paper>
  );
};

export default Column;
