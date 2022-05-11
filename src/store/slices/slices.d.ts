/* signinSignupSlice */

type SignInData = {
  login: string;
  password: string;
};

interface SignUpData extends SignInData {
  name: string;
}

type SigninSignupState = {
  token: string;
  userId: string;
  name: string;
  login: string;
  loading: boolean;
  error: string;
};

type SignUpResponse = {
  id: string;
  name: string;
  login: string;
};
