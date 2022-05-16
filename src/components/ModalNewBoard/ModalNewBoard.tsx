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

interface ModalProps {
  message: string;
  isOpen: boolean;
  onClose: ReactEventHandler;
}

const ModalNewBoard = ({ message, isOpen, onClose }: ModalProps) => {
  if (!isOpen) return null;
  return ReactDOM.createPortal(
    <div className="modal">
      <Dialog open={isOpen} onClose={onClose}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We will send updates
            occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        {/* <DialogActions>
          <Button onClick={dispatch(createBoard({ token: token }))} >Cancel</Button>
          <Button onClick={onClose}>Subscribe</Button>
        </DialogActions> */}
      </Dialog>
    </div>,
    document.body
  );
};

export default ModalNewBoard;
