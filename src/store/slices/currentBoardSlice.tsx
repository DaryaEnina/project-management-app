import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

interface currentBoardState {
  id: string;
  title: string;
}

const board = {
  title: 'Homework tasks',
};

export const createBoard = createAsyncThunk('boards/create', async () => {
  try {
    const response = await axios.post('https://thawing-tor-58868.herokuapp.com/boards', board);
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
    builder.addCase(createBoard.fulfilled, (state, action) => {
      state.id = action.payload.id;
      state.title = action.payload.title;
    });
  },
});

export default currentBoardSlice.reducer;
