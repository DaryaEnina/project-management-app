import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

interface currentBoardState {
  id: string;
  title: string;
}

const board = {
  title: 'Homework tasks',
};

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJiYzU4YmM2Yi1mODlkLTQ4NjEtOTc1MC1kMGQ2NDQ4ZTIyMmMiLCJsb2dpbiI6ImRldmVsb3BlcjMiLCJpYXQiOjE2NTIwMDg2MDd9.cznvyztwxvQc3yW2MvHnhc3JxfW4FleRHajDWItfURA';
//TODO: rewrite when wil be available global scope token

export const getCurrentBoardT = createAsyncThunk('boards/getCurrent', async (id) => {
  try {
    const response = await axios.get(`https://thawing-tor-58868.herokuapp.com/boards/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    throw err;
  }
});

export const currentBoardSlice = createSlice({
  name: 'currentBoard',
  initialState: { id: 'string', title: 'Mock title' } as currentBoardState,
  reducers: {},
  extraReducers(builder) {
    /* builder.addCase(createBoard.pending, (state) => {
      state.loading = true;
    }); */
    builder.addCase(getCurrentBoardT.fulfilled, (state, action) => {
      state.id = action.payload.id;
      state.title = action.payload.title;
    });
  },
});

export default currentBoardSlice.reducer;
