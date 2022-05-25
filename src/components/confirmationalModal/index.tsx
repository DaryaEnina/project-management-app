import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import ReactDOM from 'react-dom';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../hooks/storeHooks';
import { setOpen } from '../../store/slices/confirmationalModalSlice';

type ConfirmationalModalProps = {
  action: () => void;
  text: string;
};

export const ConfirmationalModal = ({ action, text }: ConfirmationalModalProps) => {
  const { isOpen } = useAppSelector((state) => state.confirmationalModal);
  const dispatch = useAppDispatch();
  const { t: translate } = useTranslation();

  return ReactDOM.createPortal(
    <Dialog
      open={isOpen}
      onClose={() => dispatch(setOpen(false))}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{translate('confirmation')}</DialogTitle>
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
          {translate('yes')}
        </Button>
        <Button onClick={() => dispatch(setOpen(false))} autoFocus>
          {translate('cancel')}
        </Button>
      </DialogActions>
    </Dialog>,
    document.body
  );
};
