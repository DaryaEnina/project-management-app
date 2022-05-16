import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { api } from '../api';

export const getBoards = createAsyncThunk<Board[], { token: string }>(
  'boards/getBoard',
  async (data) => {
    try {
      const response = await api.get('/boards', {
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      });
      return response.data;
    } catch (err) {
      throw err;
    }
  }
);

export const boardListSlice = createSlice({
  name: 'boardList',
  initialState: {
    boardList: [],
    loading: false,
  } as BoardListState,
  reducers: {},
  extraReducers: {
    [getBoards.pending.type]: (state) => {
      state.loading = true;
    },
    [getBoards.fulfilled.type]: (state, action: PayloadAction<{ title: string; id: string }[]>) => {
      state.loading = false;
      state.boardList = action.payload;
    },
  },
});

export default boardListSlice.reducer;
