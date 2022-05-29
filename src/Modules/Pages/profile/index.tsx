import { Button, Container, TextField, ThemeProvider } from '@mui/material';
import { Box } from '@mui/system';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../../../hooks/storeHooks';
import { mainTheme } from '../../../mui';
import './profile.scss';

const Profile = () => {
  const { login, name } = useAppSelector((state) => state.signinSignup);
  const { control } = useForm();
  const { t: translate } = useTranslation();

  return (
    <ThemeProvider theme={mainTheme}>
      <Container maxWidth="xl">
        <form className="profile__form">
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                id="outlined-multiline-flexible"
                label={translate('your-name')}
                defaultValue={name}
                variant="standard"
              />
            )}
          />
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label={translate('your-email')}
                variant="standard"
                defaultValue={login}
              />
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
                label={translate('your-password')}
                type="password"
                autoComplete="current-password"
                variant="standard"
              />
            )}
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              sx={{ minWidth: '85px', maxWidth: '125px' }}
            >
              {translate('save-user')}
            </Button>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              sx={{ minWidth: '85px', maxWidth: '125px' }}
            >
              {translate('delete-user')}
            </Button>
          </Box>
        </form>
      </Container>
    </ThemeProvider>
  );
};
export default Profile;
