import { Button, Container, TextField } from '@mui/material';
import { Box } from '@mui/system';
import { Controller, useForm } from 'react-hook-form';
import { useAppSelector } from '../../../hooks/storeHooks';
import './profile.scss';

const Profile = () => {
  const { login, name } = useAppSelector((state) => state.signinSignup);
  const { control } = useForm();

  return (
    <Container maxWidth="xl">
      <form className="profile__form">
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              id="outlined-multiline-flexible"
              label="Name"
              defaultValue={name}
              variant="standard"
            />
          )}
        />
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextField {...field} label="Email" variant="standard" defaultValue={login} />
          )}
        />
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <TextField
              sx={{ mb: 5 }}
              {...field}
              id="standard-password-input"
              label="Password"
              type="password"
              autoComplete="current-password"
              variant="standard"
            />
          )}
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
          <Button variant="contained" type="submit" sx={{ minWidth: '85px' }}>
            Save
          </Button>
          <Button variant="contained" type="submit" sx={{ minWidth: '85px' }}>
            Delete
          </Button>
        </Box>
      </form>
    </Container>
  );
};
export default Profile;
