import { useAppDispatch, useAppSelector } from '../../../hooks/storeHooks';
import { getBoards } from '../../../store/slices/boardListSlice';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Grid,
  IconButton,
  Backdrop,
  CircularProgress,
} from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useEffect } from 'react';
import { getCurrentBoard } from '../../../store/slices/currentBoardSlice';
import { useNavigate } from 'react-router-dom';
import { Paths } from '../../../constants';
import { deleteBoard } from '../../../store/slices/boardListSlice';
import { setOpen, setCurrentCardId } from '../../../store/slices/confirmationalModalSlice';

import './main.scss';
import { ConfirmationalModal } from '../../../components/confirmationalModal';

export const Main = () => {
  const { token } = useAppSelector((state) => state.signinSignup);
  const { boardList, loading } = useAppSelector((state) => state.boardList);
  const { currentCardId } = useAppSelector((state) => state.confirmationalModal);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getBoards({ token }));
  }, [dispatch, token]);

  const openBoard = (boardId: string) => {
    dispatch(getCurrentBoard({ boardId, token }));
    navigate(Paths.board);
  };

  return (
    <>
      <Grid className="main_container" container spacing={2}>
        <Backdrop sx={{ zIndex: '100' }} open={loading} invisible>
          <CircularProgress size={60} />
        </Backdrop>
        {boardList.map((item, index) => (
          <Grid className="main_item-wrapper" item key={index} xl={3} lg={3} md={4} sm={6} xs={12}>
            <Card className="main_item" onClick={() => openBoard(item.id)}>
              <CardMedia
                className="main_item__image"
                component="img"
                image="https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1776&q=80"
                alt="card photo"
              />
              <CardContent className="main_item__title">
                <Typography component="div" variant="h5">
                  {item.title}
                </Typography>
              </CardContent>
            </Card>
            <IconButton
              className="main_delete-btn"
              aria-label="DeleteForeverIcon"
              color="error"
              onClick={() => {
                dispatch(setCurrentCardId(item.id));
                dispatch(setOpen(true));
              }}
            >
              <DeleteForeverIcon />
            </IconButton>
          </Grid>
        ))}
      </Grid>
      <ConfirmationalModal
        action={() => {
          dispatch(deleteBoard({ boardId: currentCardId, token })).then(() =>
            dispatch(getBoards({ token }))
          );
        }}
        text="Do you want to delete this board?"
      />
    </>
  );
};
