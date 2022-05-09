import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

interface BoardsListState {
  currentBoard: Board;
  boards: Board[];
  loading: boolean;
}

const server = 'thawing-tor-58868.herokuapp.com';

const user = { name: 'Vasya', login: 'developer3', password: 'strong1' };

let token: string;

export const signUp = createAsyncThunk('users/signUp', async () => {
  try {
    const response = await axios.post(`https://${server}/signup`, user);
    return response.data;
  } catch (err) {
    throw err;
  }
});

const registered = { login: 'developer3', password: 'strong1' };

export const signIn = createAsyncThunk('users/signIn', async () => {
  try {
    const response = await axios.post(`https://${server}/signin`, registered);
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
    const response = await axios.post(`https://${server}/boards`, board, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    throw err;
  }
});

export const getBoards = createAsyncThunk('boards/get', async () => {
  try {
    const response = await axios.get(`https://${server}/boards`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    throw err;
  }
});

export const getCurrentBoard = createAsyncThunk('boards/getCurrent', async (id: string) => {
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

export const boardsListSlice = createSlice({
  name: 'boardsList',
  initialState: { boards: [], loading: true, currentBoard: {} as Board } as BoardsListState,
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
      token = action.payload.token;
      console.log(action.payload);
    });
    builder.addCase(createBoard.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createBoard.fulfilled, (state, action) => {
      state.boards.push(action.payload);
      state.loading = false;
    });
    builder.addCase(getBoards.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getBoards.fulfilled, (state, action) => {
      state.boards = action.payload;
      console.log(action.payload);
    });
    builder.addCase(getCurrentBoard.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getCurrentBoard.fulfilled, (state, action) => {
      state.currentBoard = action.payload;
      console.log(action.payload);
    });
  },
});

export const { complete } = boardsListSlice.actions;

export default boardsListSlice.reducer;
