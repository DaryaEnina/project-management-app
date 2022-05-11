import { useCallback, useEffect } from 'react';
import { Container, TextField, Button } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useSnackbar } from 'notistack';

import './signinSignup.scss';
import { useAppDispatch, useAppSelector } from '../../../hooks/storeHooks';
import { signIn, signUp } from '../../../store/slices/signinSignupSlice';

export const SignInSignUp = ({ isRegistrationMode }: SignInSignUpProps) => {
  const schema = isRegistrationMode
    ? yup.object().shape({
        name: yup.string().min(2).max(15).required(),
        login: yup.string().email().required(),
        password: yup.string().min(8).max(15).required(),
      })
    : yup.object().shape({
        login: yup.string().email().required(),
        password: yup.string().min(8).max(15).required(),
      });

  const defaultValues = isRegistrationMode
    ? {
        name: '',
        login: '',
        password: '',
      }
    : {
        login: '',
        password: '',
      };

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<SignInFormValues | SignUpFormValues>({
    defaultValues,
    resolver: yupResolver(schema),
  });
  const { enqueueSnackbar } = useSnackbar();
  const { error } = useAppSelector((state) => state.signinSignup);
  const dispatch = useAppDispatch();

  const onSubmit = (data: SignInFormValues | SignUpFormValues) => {
    if (isRegistrationMode) {
      dispatch(signUp(data as SignUpFormValues));
    } else {
      dispatch(signIn(data));
    }
  };

  const showErrorMessage = useCallback(
    (message: string) => {
      enqueueSnackbar(message, { variant: 'error', autoHideDuration: 3000 });
    },
    [enqueueSnackbar]
  );

  useEffect(() => {
    if (error) {
      showErrorMessage(error);
    }
  }, [error, showErrorMessage]);

  return (
    <Container maxWidth="xl">
      <form className="signin-form" onSubmit={handleSubmit(onSubmit)}>
        {isRegistrationMode && (
          <Controller
            name="name"
            control={control}
            render={({ field, formState }) => (
              <TextField
                {...field}
                label="Your name"
                sx={{ mb: '30px' }}
                autoComplete="off"
                error={!!(formState.errors as SignUpErrorObject).name}
                helperText={(errors as SignUpErrorObject).name?.message ?? ''}
              />
            )}
          />
        )}
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
          Sign {isRegistrationMode ? 'Up' : 'In'}
        </Button>
      </form>
    </Container>
  );
};
