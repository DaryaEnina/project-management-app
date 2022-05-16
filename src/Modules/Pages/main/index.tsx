import { useAppDispatch, useAppSelector } from '../../../hooks/storeHooks';
import { getBoards } from '../../../store/slices/boardListSlice';
import { Paper, Grid } from '@mui/material';
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
          <Grid item key={index}>
            <Paper elevation={3}>{item.title}</Paper>
          </Grid>
        ))}
      </Grid>
    </>
  );
};
