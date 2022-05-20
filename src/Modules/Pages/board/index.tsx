import { Box, Button, Paper, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Column from '../../../components/Column/Column';
import { useAppDispatch, useAppSelector } from '../../../hooks/storeHooks';
import { createColumn } from '../../../store/slices/currentBoardSlice';
import { Loader } from '../../Loader';
import './board.scss';

const Board = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { token } = useAppSelector((state) => state.signinSignup);
  const { currentBoard } = useAppSelector((state) => state.currentBoard);
  const columns = useAppSelector((state) => state.currentBoard.currentBoard.columns);
  const loading = useAppSelector((state) => state.currentBoard.loading);

  return loading ? (
    <Loader />
  ) : (
    <div>
      <Button onClick={() => navigate(-1)}>Back to main page </Button>
      <div className="boardContainer">
        <Paper
          elevation={12}
          sx={{
            margin: '32px 32px ',
            minWidth: '1100px',
            maxWidth: '95vw',
            height: '66vh',
            overflowY: 'auto',
          }}
        >
          <Typography variant="h3">{currentBoard.title}</Typography>
          <Button
            variant="outlined"
            onClick={() =>
              currentBoard.id && dispatch(createColumn({ boardId: currentBoard.id, token: token }))
            }
          >
            Create column
          </Button>
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              '& > :not(style)': {
                m: 1,
              },
            }}
          >
            {columns?.map((column: ColumnInterface) => (
              <Column
                key={column.id}
                title={column.title}
                order={column.order}
                id={column.id}
                tasks={column.tasks}
              ></Column>
            ))}
          </Box>
        </Paper>
      </div>
      <Typography
        variant="h5"
        sx={{
          textAlign: 'center',
        }}
      >
        Get things done!
      </Typography>
    </div>
  );
};

export default Board;
