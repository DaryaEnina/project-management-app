import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { api } from '../api';
import axios, { AxiosError, AxiosResponse } from 'axios';

export const signIn = createAsyncThunk('auth/signIn', async (data: SignInData, thunkAPI) => {
  try {
    const response = await api.post('/signin', data);
    return response.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      console.log(err);
      return thunkAPI.rejectWithValue(((err as AxiosError).response as AxiosResponse).data.message);
    } else {
      throw err;
    }
  }
});

export const signUp = createAsyncThunk('auth/signUp', async (data: SignUpData, thunkAPI) => {
  try {
    const response = await api.post('/signup', data);
    return response.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      console.log(err);
      return thunkAPI.rejectWithValue(((err as AxiosError).response as AxiosResponse).data.message);
    } else {
      throw err;
    }
  }
});

export const getUser = createAsyncThunk('users/getUser', async (data: getUserData, thunkAPI) => {
  try {
    const response = await api.get(`/users/${data.userId}`, {
      headers: {
        Authorization: `Bearer ${data.token}`,
      },
    });
    return response.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      console.log(err);
      return thunkAPI.rejectWithValue(((err as AxiosError).response as AxiosResponse).data.message);
    } else {
      throw err;
    }
  }
});

export const signinSignupSlice = createSlice({
  name: 'signinSignup',
  initialState: {
    token: '',
    userId: '',
    name: '',
    login: '',
    loading: false,
    error: '',
    isRegistrationMode: false,
  } as SigninSignupState,
  reducers: {
    signOut: (state: SigninSignupState) => {
      state.token = '';
      state.userId = '';
      state.name = '';
      state.login = '';
      state.error = '';
    },
    setIsRegistrationMode: (state: SigninSignupState, action: PayloadAction<boolean>) => {
      state.isRegistrationMode = action.payload;
    },
    setIdLogin: (state: SigninSignupState, action: PayloadAction<JwtParseResponse>) => {
      state.userId = action.payload.userId;
      state.login = action.payload.login;
    },
  },
  extraReducers: {
    [signIn.pending.type]: (state) => {
      state.loading = true;
      state.error = '';
    },
    [signIn.fulfilled.type]: (state, action: PayloadAction<{ token: string }>) => {
      state.loading = false;
      state.token = action.payload.token;
    },
    [signIn.rejected.type]: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    [signUp.pending.type]: (state) => {
      state.loading = true;
      state.userId = '';
      state.name = '';
      state.login = '';
      state.error = '';
    },
    [signUp.fulfilled.type]: (state, action: PayloadAction<SignUpResponse>) => {
      state.loading = false;
      state.userId = action.payload.id;
      state.name = action.payload.name;
      state.login = action.payload.login;
    },
    [signUp.rejected.type]: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    [getUser.fulfilled.type]: (state, action: PayloadAction<getUserResponse>) => {
      state.name = action.payload.name;
    },
    [getUser.rejected.type]: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
});

export const { signOut, setIsRegistrationMode, setIdLogin } = signinSignupSlice.actions;
export default signinSignupSlice.reducer;
