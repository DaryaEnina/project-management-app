import { Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Column from '../../../components/Column/Column';
import { useAppDispatch, useAppSelector } from '../../../hooks/storeHooks';
import { getBoards, signIn, signUp, getCurrentBoard } from '../../../store/slices/boardsListSlice';

const Board = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const currentBoard = useAppSelector((state) => state.currentBoard);
  const boardsList = useAppSelector((state) => state.boardsList.boards);

  const columns = ['todo', 'in progress', 'done'];

  const createColumn = () => {
    console.log('column');
  };

  return (
    <div>
      <Button onClick={() => navigate(-1)}>Back to main page </Button>
      <Button onClick={() => createColumn()}>Create column</Button>
      <Button onClick={() => dispatch(getBoards())}>Get boards</Button>
      <Button onClick={() => dispatch(signUp())}>Sign up</Button>
      <Button onClick={() => dispatch(signIn())}>Sign in</Button>
      <div>
        {
          <p>
            {boardsList.map((board) => (
              <p key={board.id} onClick={() => dispatch(getCurrentBoard(board.id))}>
                {board.title}
              </p>
            ))}
          </p>
        }
        <p>{currentBoard.title}</p>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            '& > :not(style)': {
              m: 1,
            },
          }}
        >
          {columns.map((column) => (
            <Column key={column}></Column>
          ))}
        </Box>
      </div>
    </div>
  );
};

export default Board;
