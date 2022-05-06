import { Container, TextField, Button } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';

import './login.scss';

export const Login = () => {
  const { handleSubmit, control } = useForm<FormValues>({
    defaultValues: {
      login: '',
      password: '',
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log(data);
  };

  return (
    <Container maxWidth="xl">
      <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="login"
          control={control}
          render={({ field }) => <TextField {...field} label="Email address" />}
        />
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <TextField {...field} label="Password" type="password" sx={{ m: '40px 0' }} />
          )}
        />
        <Button variant="contained" type="submit">
          Log In
        </Button>
      </form>
    </Container>
  );
};
