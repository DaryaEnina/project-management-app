import { useEffect } from 'react';
import { Container, TextField, Button } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import './signin.scss';
import { useAppDispatch, useAppSelector } from '../../../hooks/storeHooks';
import { signIn } from '../../../store/slices/signinSignupSlice';

const schema = yup.object().shape({
  login: yup.string().email().required(),
  password: yup.string().min(8).max(15).required(),
});

export const SignIn = () => {
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
  const { token, error } = useAppSelector((state) => state.signinSignup);
  const dispatch = useAppDispatch();

  const onSubmit = (data: FormValues) => {
    console.log('submit');
    dispatch(signIn(data));
  };

  useEffect(() => {
    console.log(token, error);
  }, [token, error]);

  return (
    <Container maxWidth="xl">
      <form className="signin-form" onSubmit={handleSubmit(onSubmit)}>
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
          Sign In
        </Button>
      </form>
    </Container>
  );
};
