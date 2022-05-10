/* signinSignupSlice */

type signInData = {
  login: string;
  password: string;
};

type signinSignupState = {
  token: string;
  loading: boolean;
  error: string;
};
