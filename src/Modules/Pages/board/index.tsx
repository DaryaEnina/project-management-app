import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Column from '../../../components/Column/Column';

const Board = () => {
  const navigate = useNavigate();
  /* const currentBoard = useAppSelector((state) => state.currentBoard); */

  const columns = ['todo', 'in progress', 'done'];

  const createColumn = () => {
    console.log('column');
  };

  return (
    <div>
      <button onClick={() => navigate(-1)}>Back to main page</button>
      <button onClick={() => createColumn()}>Create column</button>
      <div>
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
