import { Box, Button, Paper, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Column from '../../../components/Column/Column';
import { useAppDispatch, useAppSelector } from '../../../hooks/storeHooks';
import {
  getBoards,
  signInD,
  signUp,
  getCurrentBoard,
  createColumn,
} from '../../../store/slices/boardsListSlice';
import './board.scss';

const Board = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const currentBoard = useAppSelector((state) => state.currentBoard);
  const boardsList = useAppSelector((state) => state.boardsList.boards);

  return (
    <div>
      <Button onClick={() => navigate(-1)}>Back to main page </Button>
      <Button onClick={() => dispatch(getBoards())}>Get boards</Button>
      <Button onClick={() => dispatch(signUp())}>Sign up</Button>
      <Button onClick={() => dispatch(signInD())}>Sign in</Button>
      <div className="boardContainer">
        {
          <div>
            {boardsList.map((board) => (
              <span key={board.id} onClick={() => dispatch(getCurrentBoard(board.id))}>
                {board.title}
              </span>
            ))}
          </div>
        }

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
          <Button variant="outlined" onClick={() => dispatch(createColumn(currentBoard.id))}>
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
            {currentBoard.columns?.map((column: ColumnInterface) => (
              <Column
                key={column.id}
                title={column.title}
                order={column.order}
                id={column.id}
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
