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
import { useTranslation } from 'react-i18next';

interface ModalProps {
  isOpen: boolean;
  onClose: ReactEventHandler;
}

const ModalNewBoard = ({ isOpen, onClose }: ModalProps) => {
  const token = useAppSelector((state) => state.signinSignup.token);
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(true);
  const [createdTitle, setCreatedTitle] = useState('');
  const [createdDescription, setCreatedDescription] = useState('');
  const { enqueueSnackbar } = useSnackbar();
  const { t: translate } = useTranslation();

  const onSubmit = (event: React.FormEvent, submitData: Board) => {
    event.preventDefault();
    setOpen(false);
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
        <span>{translate('Create New Board')}</span>
      </DialogTitle>
      <form
        className="modal"
        onSubmit={(event) =>
          onSubmit(event, { title: createdTitle, columns: [], description: createdDescription })
        }
      >
        <DialogContent>
          <DialogContentText>
            {translate('To create the new board, please enter the title here.')}
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label={translate(`Board's Title`)}
            type="text"
            fullWidth
            variant="standard"
            required
            value={createdTitle}
            onChange={handleInput}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label={translate(`Board's Description`)}
            type="text"
            fullWidth
            required
            variant="standard"
            value={createdDescription}
            onChange={handleDescriptionInput}
          />
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={onClose}>
            {translate('cancel')}
          </Button>
          <Button variant="outlined" type="submit">
            {translate('Create New Board')}
          </Button>
        </DialogActions>
      </form>
    </Dialog>,
    document.body
  );
};

export default ModalNewBoard;
