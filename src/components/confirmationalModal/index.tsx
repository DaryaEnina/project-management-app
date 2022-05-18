import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../hooks/storeHooks';
import { setOpen } from '../../store/slices/confirmationalModalSlice';

export const ConfirmationalModal = () => {
  const { token } = useAppSelector((state) => state.signinSignup);
  const { isOpen } = useAppSelector((state) => state.confirmationalModal);
  const dispatch = useAppDispatch();

  return (
    <Dialog
      open={isOpen}
      onClose={() => dispatch(setOpen(false))}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Let Google help apps determine location. This means sending anonymous location data to
          Google, even when no apps are running.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => dispatch(setOpen(false))}>Disagree</Button>
        <Button onClick={() => dispatch(setOpen(false))} autoFocus>
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
};
