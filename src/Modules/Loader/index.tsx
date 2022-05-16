import { CircularProgress, Box } from '@mui/material';

export const Loader = () => {
  return (
    <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
      <CircularProgress size={60} />
    </Box>
  );
};
