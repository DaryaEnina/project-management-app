import { Button, Fab, Paper, Stack } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../hooks/storeHooks';
import { createTask } from '../../store/slices/currentBoardSlice';
import Task from '../Task/Task';
import './Column.scss';
import { updateColumn } from '../../store/slices/currentBoardSlice';
import { ChangeEvent, useState } from 'react';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';

const Column = (column: ColumnInterface) => {
  const dispatch = useAppDispatch();
  const currentBoard = useAppSelector((state) => state.currentBoard);
  const token = useAppSelector((state) => state.signinSignup.token);

  const [editMode, setMode] = useState(false);
  const [currentTitle, setCurrentTitle] = useState(column.title);
  const [previousTitle, setPreviousTitle] = useState(column.title);

  const onSubmit = (event: React.FormEvent, submitData: ColumnInterface) => {
    event.preventDefault();
    setMode(false);
    dispatch(
      updateColumn({
        boardId: currentBoard.id,
        columnId: column.id,
        title: submitData.title,
        order: column.order,
        token: token,
      })
    );
    setCurrentTitle(submitData.title);
    setPreviousTitle(submitData.title);
  };

  const onCancel = () => {
    setMode(false);
    setCurrentTitle(previousTitle);
  };

  const handleInput = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setMode(true);
    setCurrentTitle(event.target.value);
  };

  return (
    <Paper
      elevation={12}
      sx={{ width: '272px', order: `${column.order}`, height: '53vh', backgroundColor: '#B3DCFD' }}
    >
      <form
        onSubmit={(event) => onSubmit(event, { title: currentTitle })}
        className="column__title-container title-container"
      >
        <div className="title-container__buttons" hidden={!editMode}>
          <Fab
            variant="extended"
            size="small"
            color="success"
            aria-label="update column's title"
            type="submit"
          >
            <DoneIcon />
          </Fab>
          <Fab variant="extended" size="small" color="error" aria-label="add" onClick={onCancel}>
            <CloseIcon />
          </Fab>
        </div>
        <div>
          <input
            className="title-container__title"
            type="text"
            value={currentTitle}
            onFocus={() => setMode(true)}
            onChange={handleInput}
          />
        </div>
      </form>
      <div className="column__buttons-container button-container">
        <Button
          variant="contained"
          //TODO: fix appearing only after check another board
          onClick={() =>
            dispatch(createTask({ boardId: currentBoard.id, columnId: column.id, token: token }))
          }
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
