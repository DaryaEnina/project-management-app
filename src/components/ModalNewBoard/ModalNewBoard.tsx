import React, { ReactEventHandler } from 'react';
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

interface ModalProps {
  isOpen: boolean;
  onClose: ReactEventHandler;
}

const ModalNewBoard = ({ isOpen, onClose }: ModalProps) => {
  const token = useAppSelector((state) => state.signinSignup.token);
  const dispatch = useAppDispatch();
  if (!isOpen) return null;
  return ReactDOM.createPortal(
    <div className="modal">
      <Dialog open={isOpen} onClose={onClose}>
        <DialogTitle>Create New Board</DialogTitle>
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
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => dispatch(createBoard({ token: token, board: { title: 'NewTitle' } }))}
          >
            Cancel
          </Button>
          <Button onClick={onClose}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </div>,
    document.body
  );
};

export default ModalNewBoard;
