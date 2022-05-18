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
  isRegistrationMode: boolean;
};

type SignUpResponse = {
  id: string;
  name: string;
  login: string;
};

type JwtParseResponse = {
  userId: string;
  login: string;
};

type getUserResponse = {
  id: string;
  login: string;
  name: string;
};

type getUserData = {
  userId: string;
  token: string;
};

/* boardListSlice */

type BoardListState = {
  boardList: { title: string; id: string }[];
  loading: boolean;
};

/* confirmationalModalSlice */

type ConfirmationalModalSliceState = {
  isOpen: boolean;
};
