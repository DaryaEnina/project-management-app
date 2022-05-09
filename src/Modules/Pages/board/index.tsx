import { Box, Button, Paper, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Column from '../../../components/Column/Column';
import { ColumnInterface } from '../../../components/Column/columnInterface';
import { useAppDispatch, useAppSelector } from '../../../hooks/storeHooks';
import {
  getBoards,
  signIn,
  signUp,
  getCurrentBoard,
  createColumn,
  getColumns,
} from '../../../store/slices/boardsListSlice';

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
      <Button onClick={() => dispatch(signIn())}>Sign in</Button>
      <div>
        {
          <div>
            {boardsList.map((board) => (
              <p key={board.id} onClick={() => dispatch(getCurrentBoard(board.id))}>
                {board.title}
              </p>
            ))}
          </div>
        }
        <p>{currentBoard.id}</p>
        <p>{currentBoard.columns?.length}</p>
        <Button onClick={() => dispatch(getColumns(currentBoard.id))}>Get column</Button>

        <Paper elevation={12} sx={{ margin: '0 auto', maxWidth: '95vw' }}>
          <Typography variant="h3">{currentBoard.title}</Typography>
          <Button onClick={() => dispatch(createColumn(currentBoard.id))}>Create column</Button>
          <Button
            onClick={() => dispatch(createColumn(currentBoard.id))}
            disabled={!currentBoard.columns?.length}
          >
            Create new task
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
    </div>
  );
};

export default Board;
