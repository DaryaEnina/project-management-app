import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

interface BoardsListState {
  boards: Board[];
  loading: boolean;
}

const user = { name: 'Vasya', login: 'developer1', password: 'strong1' };

export const signUp = createAsyncThunk('users/signUp', async () => {
  try {
    const response = await axios.post('https://thawing-tor-58868.herokuapp.com/signup', user);
    return response.data;
  } catch (err) {
    throw err;
  }
});

const registered = { login: 'developer1', password: 'strong1' };

export const signIn = createAsyncThunk('users/signIn', async () => {
  try {
    const response = await axios.post('https://thawing-tor-58868.herokuapp.com/signin', registered);
    return response.data;
  } catch (err) {
    throw err;
  }
});

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

export const boardsListSlice = createSlice({
  name: 'boardsList',
  initialState: { boards: [], loading: true } as BoardsListState,
  reducers: {
    complete: (state: BoardsListState) => {
      state.loading = true;
    },
  },
  extraReducers(builder) {
    builder.addCase(signUp.pending, (state) => {
      console.log('fff');
      state.loading = false;
    });
    builder.addCase(signUp.fulfilled, (state, action) => {
      console.log(action.payload);
    });
    builder.addCase(signIn.pending, (state) => {
      state.loading = false;
    });
    builder.addCase(signIn.fulfilled, (state, action) => {
      console.log(action.payload);
    });
    builder.addCase(createBoard.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createBoard.fulfilled, (state, action) => {
      console.log(action.payload);
    });
  },
});

export const { complete } = boardsListSlice.actions;

export default boardsListSlice.reducer;
