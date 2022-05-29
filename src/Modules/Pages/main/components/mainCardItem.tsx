import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  Skeleton,
  Tooltip,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Paths } from '../../../../constants';
import { useAppDispatch, useAppSelector } from '../../../../hooks/storeHooks';
import { complete, getCurrentBoard } from '../../../../store/slices/currentBoardSlice';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { setOpen, setCurrentCardId } from '../../../../store/slices/confirmationalModalSlice';
import { useState } from 'react';

interface Board {
  title: string;
  id: string;
  columns?: ColumnInterface[];
}

interface MainCardItemProps {
  item: Board;
  imageUrl: string;
}

export const MainCardItem = ({ item, imageUrl }: MainCardItemProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { token } = useAppSelector((state) => state.signinSignup);
  const [imgLoading, setImgLoading] = useState<boolean>(true);

  const openBoard = (boardId: string) => {
    dispatch(getCurrentBoard({ boardId, token })).then(() => dispatch(complete()));
    navigate(Paths.board);
  };

  return (
    <Grid className="main_item-wrapper" item xl={3} lg={3} md={4} sm={6} xs={12}>
      <Card className="main_item" onClick={() => openBoard(item.id)}>
        {imgLoading ? <Skeleton animation="wave" height="100%" variant="rectangular" /> : null}
        <CardMedia
          className="main_item__image"
          component="img"
          image={imageUrl}
          alt="card photo"
          onLoad={() => setImgLoading(false)}
        />

        <CardContent className="main_item__title">
          <Tooltip title={item.title} arrow>
            <Typography component="div" variant="h5">
              {item.title.length > 20 ? `${item.title.slice(0, 20)}...` : item.title}
            </Typography>
          </Tooltip>
        </CardContent>
        <IconButton
          className="main_delete-btn"
          aria-label="DeleteForeverIcon"
          color="error"
          onClick={(e) => {
            e.stopPropagation();
            dispatch(setCurrentCardId(item.id));
            dispatch(setOpen(true));
          }}
        >
          <DeleteForeverIcon />
        </IconButton>
      </Card>
    </Grid>
  );
};
