import { Container, TextField, Button } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import './login.scss';
import { useEffect } from 'react';

const schema = yup.object().shape({
  login: yup.string().email().required(),
  password: yup.string().min(8).max(15).required(),
});

export const Login = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      login: '',
      password: '',
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: FormValues) => {
    console.log(data);
  };

  useEffect(() => {
    console.log(errors);
  }, [errors]);

  return (
    <Container maxWidth="xl">
      <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="login"
          control={control}
          render={({ field, formState }) => (
            <TextField
              {...field}
              label="Email address"
              error={!!formState.errors.login}
              helperText={errors.login?.message ?? ''}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          render={({ field, formState }) => (
            <TextField
              {...field}
              label="Password"
              type="password"
              sx={{ m: '30px 0' }}
              error={!!formState.errors.password}
              helperText={errors.password?.message ?? ''}
            />
          )}
        />
        <Button variant="contained" type="submit">
          Log In
        </Button>
      </form>
    </Container>
  );
};
