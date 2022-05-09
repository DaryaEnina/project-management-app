import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { api } from '../api';

export const signIn = createAsyncThunk('auth/signIn', async (data: signInData) => {
  try {
    const response = await api.post('/signin', data);
    return response.data;
  } catch (err) {
    console.log(err);
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
