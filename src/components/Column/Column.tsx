import { Button, Fab, Paper, Stack } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../hooks/storeHooks';
import Task from '../Task/Task';
import './Column.scss';
import {
  updateColumn,
  deleteColumn,
  getCurrentBoard,
  complete,
} from '../../store/slices/currentBoardSlice';
import { ChangeEvent, useState } from 'react';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import { ConfirmationalModal } from '../confirmationalModal';
import { setOpen, setCurrentCardId } from '../../../src/store/slices/confirmationalModalSlice';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { useTranslation } from 'react-i18next';
import ModalNewBoard from '../ModalNewBoard/ModalNewBoard';

const Column = (columns: ColumnInterface) => {
  const dispatch = useAppDispatch();
  const { currentBoard } = useAppSelector((state) => state.currentBoard);
  const { token } = useAppSelector((state) => state.signinSignup);
  const column = currentBoard?.columns?.filter((column) => column.id === columns.id)[0];
  const { t: translate } = useTranslation();

  const [editMode, setMode] = useState(false);
  const [currentTitle, setCurrentTitle] = useState(column?.title);
  const [previousTitle, setPreviousTitle] = useState(column?.title);
  const [open, setModalOpen] = useState(false);

  const onSubmit = (event: React.FormEvent, submitData: ColumnInterface) => {
    event.preventDefault();
    setMode(false);
    currentBoard.id &&
      dispatch(
        updateColumn({
          boardId: currentBoard.id,
          columnId: column?.id,
          title: submitData.title,
          order: column?.order,
          token: token,
        })
      )
        .then(() => dispatch(getCurrentBoard({ boardId: currentBoard.id || '', token })))
        .then(() => dispatch(complete()));
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
      sx={{ width: '272px', order: `${column?.order}`, height: '51vh', backgroundColor: '#B3DCFD' }}
    >
      <ModalNewBoard
        isOpen={open}
        onClose={() => setModalOpen(false)}
        item="task"
        columnId={column?.id}
      />
      <form
        onSubmit={(event) => onSubmit(event, { title: currentTitle || '' })}
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
            onBlur={() => setMode(false)}
            onChange={handleInput}
          />
        </div>
      </form>
      <div className="column__buttons-container button-container">
        <Button variant="contained" onClick={() => setModalOpen(true)}>
          {translate('Add task')}
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            column?.id && dispatch(setCurrentCardId(column?.id));
            dispatch(setOpen(true));
          }}
        >
          {translate('Delete column')}
        </Button>
      </div>
      <div className="column__tasks-container" data-testid="Column" onClick={() => setMode(false)}>
        {column?.id && currentBoard.id && (
          <Droppable droppableId={column?.id} key={column.id} type="tasks" direction="vertical">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef} style={{ display: 'flex' }}>
                <Stack direction={{ xs: 'column', sm: 'column' }} spacing={{ xs: 1, sm: 2, md: 4 }}>
                  {column?.tasks?.map((task: TaskInterface, index) => {
                    return (
                      <Draggable key={index} draggableId={task.id} index={index}>
                        {(provided) => {
                          return (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <Task
                                key={task.id}
                                title={task.title}
                                order={task.order}
                                description={task.description}
                                id={task.id}
                              />
                            </div>
                          );
                        }}
                      </Draggable>
                    );
                  })}
                </Stack>
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        )}
      </div>
      <ConfirmationalModal
        action={() => {
          currentBoard.id &&
            column?.id &&
            dispatch(deleteColumn({ boardId: currentBoard.id, columnId: column?.id, token: token }))
              .then(() => dispatch(getCurrentBoard({ boardId: currentBoard.id || '', token })))
              .then(() => dispatch(complete()));
        }}
        text="Do you want to delete this column?"
      />
    </Paper>
  );
};

export default Column;
