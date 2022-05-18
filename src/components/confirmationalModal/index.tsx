import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import ReactDOM from 'react-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/storeHooks';
import { setOpen } from '../../store/slices/confirmationalModalSlice';

type ConfirmationalModalProps = {
  action: () => void;
  text: string;
};

export const ConfirmationalModal = ({ action, text }: ConfirmationalModalProps) => {
  const { isOpen } = useAppSelector((state) => state.confirmationalModal);
  const dispatch = useAppDispatch();

  return ReactDOM.createPortal(
    <Dialog
      open={isOpen}
      onClose={() => dispatch(setOpen(false))}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{'Confirmation'}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">{text}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            action();
            dispatch(setOpen(false));
          }}
        >
          Yes
        </Button>
        <Button onClick={() => dispatch(setOpen(false))} autoFocus>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>,
    document.body
  );
};
