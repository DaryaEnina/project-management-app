import { Stack } from '@mui/material';

const Board = () => {
  return (
    <Stack direction={{ xs: 'column', sm: 'column' }} spacing={{ xs: 1, sm: 2, md: 4 }}>
      <p>Item 1</p>
      <p>Item 2</p>
      <p>Item 3</p>
    </Stack>
  );
};

export default Board;
