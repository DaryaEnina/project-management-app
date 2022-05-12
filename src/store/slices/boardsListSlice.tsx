import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Board } from '../../Modules/Pages/board/board';
import { api } from '../api';

interface BoardsListState {
  currentBoard: Board;
  boards: Board[];
  loading: boolean;
}

const user = { name: 'Vasya', login: 'developer4', password: 'strong1' };

let token: string;

export const signUp = createAsyncThunk('users/signUp', async () => {
  try {
    const response = await api.post(`/signup`, user);
    return response.data;
  } catch (err) {
    throw err;
  }
});

const registered = { login: 'developer4', password: 'strong1' };

export const signInD = createAsyncThunk('users/signIn', async () => {
  try {
    const response = await api.post(`/signin`, registered);
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
    const response = await api.post(`/boards`, board, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    throw err;
  }
});
//TODO: remove hardcode when modal will be delivered
const column = {
  title: 'Done',
  order: 3,
};

export const createColumn = createAsyncThunk('column/create', async (id: string) => {
  try {
    const response = await api.post(`/boards/${id}/columns`, column, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    throw err;
  }
});

export const getColumns = createAsyncThunk('column/get', async (id: string) => {
  try {
    const response = await api.get(`/boards/${id}/columns`, {
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
    const response = await api.get(`/boards`, {
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
    const response = await api.get(`/boards/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    throw err;
  }
});

//TODO: add update for board

/* export const updateCurrentBoard = createAsyncThunk('boards/update', async (id: string) => {
  try {
    const response = await axios.put(`https://thawing-tor-58868.herokuapp.com/boards/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    throw err;
  }
}); */

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
      state.loading = false;
    });
    builder.addCase(signUp.fulfilled, (state, action) => {
      console.log(action.payload);
    });
    builder.addCase(signInD.pending, (state) => {
      state.loading = false;
    });
    builder.addCase(signInD.fulfilled, (state, action) => {
      token = action.payload.token;
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
    });
    builder.addCase(getCurrentBoard.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getCurrentBoard.fulfilled, (state, action) => {
      state.currentBoard = action.payload;
    });
    builder.addCase(getColumns.fulfilled, (state, action) => {
      state.currentBoard.columns = action.payload;
    });
    builder.addCase(createColumn.fulfilled, (state, action) => {
      console.log(action.payload);
      state.currentBoard.columns.push(action.payload);
    });
  },
});

export const { complete } = boardsListSlice.actions;

export default boardsListSlice.reducer;
