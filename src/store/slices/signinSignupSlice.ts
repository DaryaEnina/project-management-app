import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { api } from '../api';
import axios, { AxiosError, AxiosResponse } from 'axios';

export const signIn = createAsyncThunk('auth/signIn', async (data: SignInData, thunkAPI) => {
  try {
    const response = await api.post('/signin', data);
    return response.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
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
      return thunkAPI.rejectWithValue(((err as AxiosError).response as AxiosResponse).data.message);
    } else {
      throw err;
    }
  }
});

export const updateUser = createAsyncThunk(
  'users/updateUser',
  async (data: UpdateData, thunkAPI) => {
    try {
      const response = await api.put(
        `/users/${data.userId}`,
        {
          ...data.userData,
        },
        {
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
        }
      );
      return response.data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return thunkAPI.rejectWithValue(
          ((err as AxiosError).response as AxiosResponse).data.message
        );
      } else {
        throw err;
      }
    }
  }
);

export const signinSignupSlice = createSlice({
  name: 'signinSignup',
  initialState: {
    token: localStorage.getItem('token') || '',
    userId: localStorage.getItem('userId') || '',
    name: localStorage.getItem('userName') || '',
    login: localStorage.getItem('userLogin') || '',
    loading: false,
    error: '',
    mode: 'login',
  } as SigninSignupState,
  reducers: {
    clearStorage: (state: SigninSignupState) => {
      state.token = '';
      state.userId = '';
      state.name = '';
      state.login = '';
      state.error = '';
      localStorage.clear();
    },
    setMode: (state: SigninSignupState, action: PayloadAction<Mode>) => {
      state.mode = action.payload;
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
      state.login = '';
      state.error = '';
    },
    [signUp.fulfilled.type]: (state, action: PayloadAction<SignUpResponse>) => {
      state.loading = false;
      state.login = action.payload.login;
      state.name = action.payload.name;
      state.userId = action.payload.id;
      state.error = '';
    },
    [signUp.rejected.type]: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    [getUser.fulfilled.type]: (state, action: PayloadAction<getUserResponse>) => {
      state.name = action.payload.name;
      localStorage.setItem('userName', action.payload.name);
      localStorage.setItem('userId', action.payload.id);
      localStorage.setItem('userLogin', action.payload.login);
    },
    [getUser.rejected.type]: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    [updateUser.pending.type]: (state) => {
      state.loading = true;
      state.error = '';
    },
    [signUp.fulfilled.type]: (state, action: PayloadAction<SignUpResponse>) => {
      state.loading = false;
      state.login = action.payload.login;
      state.name = action.payload.name;
      state.userId = action.payload.id;
      state.error = '';
    },
    [signUp.rejected.type]: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { clearStorage, setMode, setIdLogin } = signinSignupSlice.actions;
export default signinSignupSlice.reducer;
