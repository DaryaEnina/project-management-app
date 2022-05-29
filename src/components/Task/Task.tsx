import { Box, Card, CardContent, IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import React, { useState } from 'react';
import './Task.scss';
import ModalNewBoard from '../ModalNewBoard/ModalNewBoard';
import { ConfirmationalModal } from '../confirmationalModal';
import { setCurrentCardId, setOpen } from '../../../src/store/slices/confirmationalModalSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/storeHooks';
import { complete, deleteTask, getCurrentBoard } from '../../store/slices/currentBoardSlice';

const Task = (task: TaskInterface) => {
  const [open, setModalOpen] = useState(false);
  const { currentBoard } = useAppSelector((state) => state.currentBoard);
  const { token } = useAppSelector((state) => state.signinSignup);
  const dispatch = useAppDispatch();
  const columnId = currentBoard.columns?.filter((column) =>
    column.tasks?.filter((taskInside) => taskInside.id === task.id)
  )[0].id;

  return (
    <div className="task" data-testid="Task">
      <ModalNewBoard
        isOpen={open}
        onClose={() => setModalOpen(false)}
        item="task"
        columnId={columnId}
        taskId={task.id}
        taskOrder={task.order}
        editMode={true}
        placeholderTitle={task.title}
        placeholderDescription={task.description}
      />
      <Card sx={{ display: 'flex' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', maxWidth: '150px' }}>
          <CardContent sx={{ flex: '1 0 auto' }}>
            <div>
              <Typography component="span" variant="h5" className="task__description">
                {task.title}
              </Typography>
            </div>
            <div>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                component="span"
                className="task__description"
              >
                {task.description}
              </Typography>
            </div>
          </CardContent>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
          <IconButton
            aria-label="delete task"
            onClick={() => {
              dispatch(setCurrentCardId(task.id));
              dispatch(setOpen(true));
            }}
          >
            <DeleteIcon />
          </IconButton>
          <IconButton aria-label="edit task" onClick={() => setModalOpen(true)}>
            <EditIcon />
          </IconButton>
        </Box>
      </Card>
      <ConfirmationalModal
        action={() => {
          currentBoard.id &&
            task.columnId &&
            dispatch(
              deleteTask({
                boardId: currentBoard.id,
                columnId: task.columnId,
                token: token,
                taskId: task.id,
              })
            )
              .then(() => dispatch(getCurrentBoard({ boardId: currentBoard.id || '', token })))
              .then(() => dispatch(complete()));
        }}
        text="Do you want to delete this task?"
      />
    </div>
  );
};

export default Task;
