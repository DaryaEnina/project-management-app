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
import { createBoard } from '../../store/slices/currentBoardSlice';
import { getBoards } from '../../store/slices/boardListSlice';
import { useSnackbar } from 'notistack';

interface ModalProps {
  isOpen: boolean;
  onClose: ReactEventHandler;
}

const ModalNewBoard = ({ isOpen, onClose }: ModalProps) => {
  const token = useAppSelector((state) => state.signinSignup.token);
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(true);
  const [createdTitle, setCreatedTitle] = useState('');
  const { enqueueSnackbar } = useSnackbar();

  const onSubmit = (event: React.FormEvent, submitData: Board) => {
    event.preventDefault();
    setOpen(false);
    if (submitData.title) {
      Promise.all([
        dispatch(createBoard({ token: token, board: { title: submitData.title } })),
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
  };

  const handleInput = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setCreatedTitle(event.target.value);
    setOpen(true);
  };

  if (!isOpen || !open) return null;
  return ReactDOM.createPortal(
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Create New Board</DialogTitle>
      <form
        className="modal"
        onSubmit={(event) => onSubmit(event, { title: createdTitle, columns: [] })}
      >
        <DialogContent>
          <DialogContentText>
            To create the new board, please enter the title here.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Boards Title"
            type="text"
            fullWidth
            variant="standard"
            value={createdTitle}
            onChange={handleInput}
          />
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="outlined" type="submit">
            Create new board
          </Button>
        </DialogActions>
      </form>
    </Dialog>,
    document.body
  );
};

export default ModalNewBoard;
