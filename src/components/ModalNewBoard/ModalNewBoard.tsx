import React, { ChangeEvent, ReactEventHandler, useState } from 'react';
import './ModalNewBoard.scss';
import ReactDOM from 'react-dom';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../hooks/storeHooks';
import {
  createBoard,
  createColumn,
  createTask,
  getCurrentBoard,
  updateTask,
} from '../../store/slices/currentBoardSlice';
import { getBoards } from '../../store/slices/boardListSlice';
import { useSnackbar } from 'notistack';
import { useTranslation } from 'react-i18next';

interface ModalProps {
  isOpen: boolean;
  onClose: ReactEventHandler;
  item: 'column' | 'task' | 'board';
  columnId?: string;
  editMode?: boolean;
  taskOrder?: number;
  taskId?: string;
}

const ModalNewBoard = ({
  isOpen,
  onClose,
  item,
  columnId,
  editMode,
  taskOrder,
  taskId,
}: ModalProps) => {
  const { token } = useAppSelector((state) => state.signinSignup);
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(true);
  const [createdTitle, setCreatedTitle] = useState('');
  const [createdDescription, setCreatedDescription] = useState('');
  const { enqueueSnackbar } = useSnackbar();
  const { t: translate } = useTranslation();
  const { currentBoard } = useAppSelector((state) => state.currentBoard);

  const onSubmit = (event: React.FormEvent, submitData: Board) => {
    event.preventDefault();
    setOpen(false);
    switch (item) {
      case 'board':
        if (submitData.title) {
          Promise.all([
            dispatch(
              createBoard({
                token: token,
                board: { title: submitData.title, description: submitData.description },
              })
            ),
            dispatch(getBoards({ token: token })),
          ]).then(() => setOpen(true));
          enqueueSnackbar(`New Board ${submitData.title} was created and added to Main page`, {
            variant: 'success',
            autoHideDuration: 3000,
          });
        } else {
          enqueueSnackbar('Boards title should not be empty', {
            variant: 'warning',
            autoHideDuration: 3000,
          });
          setOpen(true);
        }
        break;
      case 'column':
        currentBoard.id &&
          dispatch(
            createColumn({
              token: token,
              boardId: currentBoard.id,
              column: { title: submitData.title },
            })
          );
        setOpen(true);
        break;
      case 'task':
        console.log(columnId);
        {
          currentBoard.id && taskId && editMode
            ? taskId &&
              dispatch(
                updateTask({
                  boardId: currentBoard.id,
                  columnId: columnId,
                  token: token,
                  userId: localStorage.getItem('userId') || '',
                  title: submitData.title,
                  description: submitData.description,
                  order: taskOrder,
                  taskId: taskId,
                })
              ).then(() => dispatch(getCurrentBoard({ boardId: currentBoard.id || '', token })))
            : currentBoard.id &&
              columnId &&
              dispatch(
                createTask({
                  boardId: currentBoard.id,
                  columnId: columnId,
                  token: token,
                  userId: localStorage.getItem('userId') || '',
                  title: submitData.title,
                  description: submitData.description,
                })
              );
        }
        setOpen(true);
        break;
    }
  };

  const handleInput = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setCreatedTitle(event.target.value);
    setOpen(true);
  };

  const handleDescriptionInput = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setCreatedDescription(event.target.value);
  };

  if (!isOpen || !open) return null;
  return ReactDOM.createPortal(
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>
        <span>{translate('Create')}</span>
      </DialogTitle>
      <form
        className="modal"
        onSubmit={(event) =>
          onSubmit(event, { title: createdTitle, columns: [], description: createdDescription })
        }
      >
        <DialogContent>
          <DialogContentText>
            {translate('To create or update the item, please enter the title here.')}
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label={translate(`Title`)}
            type="text"
            fullWidth
            variant="standard"
            required
            value={createdTitle}
            onChange={handleInput}
          />
          {(item === 'board' || item === 'task') && (
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label={translate(`Description`)}
              type="text"
              fullWidth
              required
              variant="standard"
              value={createdDescription}
              onChange={handleDescriptionInput}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={onClose}>
            {translate('cancel')}
          </Button>
          <Button variant="outlined" type="submit">
            {editMode ? translate('Update') : translate('Create')}
          </Button>
        </DialogActions>
      </form>
    </Dialog>,
    document.body
  );
};

export default ModalNewBoard;
