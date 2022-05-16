import { useAppDispatch, useAppSelector } from '../../../hooks/storeHooks';
import { getBoards } from '../../../store/slices/boardListSlice';
import { Card, CardMedia, Grid } from '@mui/material';
import { useEffect } from 'react';

import './main.scss';

export const Main = () => {
  const { token } = useAppSelector((state) => state.signinSignup);
  const { boardList } = useAppSelector((state) => state.boardList);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getBoards({ token }));
  }, [dispatch, token]);

  return (
    <>
      <Grid className="main_container" container spacing={2}>
        {boardList.map((item, index) => (
          <Grid className="main_item-wrapper" item key={index} xl={3} lg={3} md={4} sm={6} xs={12}>
            <Card className="main_item">
              <CardMedia
                className="main_item__image"
                component="img"
                image="https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1776&q=80"
                alt="card photo"
              />
              <h2 className="main_item__title">{item.title}</h2>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};
