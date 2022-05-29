import { useCallback, useEffect } from 'react';
import { Container, TextField, Button, ThemeProvider } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../../hooks/storeHooks';
import {
  signIn,
  signUp,
  setIdLogin,
  getUser,
  updateUser,
} from '../../../store/slices/signinSignupSlice';
import { Paths } from '../../../constants';
import './signinSignup.scss';
import jwt_decode from 'jwt-decode';
import { mainTheme } from '../../../mui';
import { Mode } from '../../../constants';

export const SignInSignUp = () => {
  const { mode, token, userId, login, name } = useAppSelector((state) => state.signinSignup);

  const schema =
    mode === Mode.login
      ? yup.object().shape({
          login: yup.string().email().required(),
          password: yup.string().min(8).max(15).required(),
        })
      : yup.object().shape({
          name: yup.string().min(2).max(15).required(),
          login: yup.string().email().required(),
          password: yup.string().min(8).max(15).required(),
        });

  const defaultValues =
    mode === Mode.login
      ? {
          login: login || '',
          password: '',
        }
      : {
          name: name || '',
          login: login || '',
          password: '',
        };

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<SignInFormValues | SignUpFormValues>({
    defaultValues,
    resolver: yupResolver(schema),
  });
  const { enqueueSnackbar } = useSnackbar();
  const { error } = useAppSelector((state) => state.signinSignup);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { t: translate } = useTranslation();

  const onSubmit = (data: SignInFormValues | SignUpFormValues) => {
    if (mode === Mode.register) {
      dispatch(signUp(data as SignUpFormValues));
    } else if (mode === Mode.login) {
      dispatch(signIn(data as SignInFormValues));
      reset({
        login: '',
        password: '',
      });
      return;
    } else if (mode === Mode.edit) {
      dispatch(updateUser({ userData: data as SignUpFormValues, userId, token }));
      navigate(Paths.home);
    }
    reset({
      name: '',
      login: '',
      password: '',
    });
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

  useEffect(() => {
    if (token && mode !== Mode.edit) {
      const jwtObject = jwt_decode<JwtParseResponse>(token);
      dispatch(setIdLogin(jwtObject));
      if (userId) {
        dispatch(getUser({ userId, token }));
      }
      navigate(Paths.main);
    }
  }, [token, navigate, dispatch, userId, mode]);

  // useEffect(() => {
  //   unregister('name');
  //   reset({
  //     login,
  //     password: '',
  //   });
  // }, [login, reset, unregister]);

  useEffect(() => {
    localStorage.setItem('token', token);
  }, [token]);

  return (
    <ThemeProvider theme={mainTheme}>
      <Container maxWidth="xl">
        <form className="signin-form" onSubmit={handleSubmit(onSubmit)}>
          {mode !== Mode.login && (
            <Controller
              name="name"
              control={control}
              render={({ field, formState }) => (
                <TextField
                  {...field}
                  label={translate('your-name')}
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
            {mode === Mode.register
              ? translate('sign-up')
              : mode === Mode.login
              ? translate('sign-in')
              : translate('save')}
          </Button>
        </form>
      </Container>
    </ThemeProvider>
  );
};
