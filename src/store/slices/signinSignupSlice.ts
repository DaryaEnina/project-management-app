import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { api } from '../api';
import axios, { AxiosError, AxiosResponse } from 'axios';

export const signIn = createAsyncThunk('auth/signIn', async (data: signInData, thunkAPI) => {
  console.log('signIn');
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

export const signinSignupSlice = createSlice({
  name: 'signinSignup',
  initialState: { token: '', loading: false, error: '' } as signinSignupState,
  reducers: {
    signOut: (state: signinSignupState) => {
      state.token = '';
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
  },
});

export const { signOut } = signinSignupSlice.actions;
export default signinSignupSlice.reducer;
