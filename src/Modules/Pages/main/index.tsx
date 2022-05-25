import { useAppDispatch, useAppSelector } from '../../../hooks/storeHooks';
import { getBoards } from '../../../store/slices/boardListSlice';
import { Grid, Backdrop, CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Paths } from '../../../constants';
import { deleteBoard } from '../../../store/slices/boardListSlice';
import { ShuffleArray } from '../../../utils/shuffle-array';
import { MainCardItem } from './components/mainCardItem';
import { ConfirmationalModal } from '../../../components/confirmationalModal';
import { useTranslation } from 'react-i18next';

import './main.scss';

export const Main = () => {
  const { token } = useAppSelector((state) => state.signinSignup);
  const { boardList, loading } = useAppSelector((state) => state.boardList);
  const { currentCardId } = useAppSelector((state) => state.confirmationalModal);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [images, setImages] = useState<string[]>([]);
  const { t: translate } = useTranslation();

  useEffect(() => {
    if (!token) {
      navigate(Paths.home);
    }
  }, [token, navigate]);

  useEffect(() => {
    setImages(
      ShuffleArray(
        Array(20)
          .fill('1')
          .map((_, index) => `./assets/image/main-page/${index + 1}.jpg`)
      )
    );
  }, []);

  useEffect(() => {
    dispatch(getBoards({ token }));
  }, [dispatch, token]);

  return (
    <>
      <Grid className="main_container" container spacing={2}>
        <Backdrop sx={{ zIndex: '100' }} open={loading} invisible>
          <CircularProgress size={60} />
        </Backdrop>
        {boardList.map((item, index) => (
          <MainCardItem item={item} imageUrl={images[index]} key={index} />
        ))}
      </Grid>
      <ConfirmationalModal
        action={() => {
          dispatch(deleteBoard({ boardId: currentCardId, token })).then(() =>
            dispatch(getBoards({ token }))
          );
        }}
        text={translate('confirmational-message')}
      />
    </>
  );
};
