import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api } from '../api';

interface CurrentBoardState {
  currentBoard: Board;
  currentColumn: ColumnInterface;
  boards: Board[];
  loading: boolean;
  editMode: false;
  id: string;
  title: string;
}

export const createBoard = createAsyncThunk<Board, { token: string; board: Board }>(
  'boards/create',
  async ({ token, board }) => {
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
  }
);
//TODO: remove hardcode when modal will be delivered
const column = {
  title: 'Resolved',
  order: 4,
};

const task = {
  title: 'Task: pet the cat',
  order: 2,
  description: 'Domestic cat needs to be stroked gently',
  userId: '527176c4-ff92-4525-9c38-d327eaed7c01',
};

export const createTask = createAsyncThunk<
  TaskInterface,
  { boardId: string; columnId?: string; token: string }
>('task/create', async ({ boardId, columnId, token }) => {
  try {
    const response = await api.post(`/boards/${boardId}/columns/${columnId}/tasks`, task, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    throw err;
  }
});

export const getTasks = createAsyncThunk<
  TaskInterface,
  { boardId: string; columnId?: string; token: string }
>('task/create', async ({ boardId, columnId, token }) => {
  try {
    const response = await api.get(`/boards/${boardId}/columns/${columnId}/tasks`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    throw err;
  }
});

export const createColumn = createAsyncThunk<ColumnInterface, { boardId: string; token: string }>(
  'column/create',
  async ({ boardId, token }) => {
    try {
      const response = await api.post(`/boards/${boardId}/columns`, column, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (err) {
      throw err;
    }
  }
);

export const getColumn = createAsyncThunk<
  ColumnInterface,
  { boardId: string; columnId: string; token: string }
>('column/get', async ({ boardId, columnId, token }) => {
  try {
    const response = await api.get(`/boards/${boardId}/columns/${columnId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    throw err;
  }
});

export const updateColumn = createAsyncThunk<
  ColumnInterface,
  {
    boardId: string;
    columnId?: string;
    title: string;
    order?: number;
    token: string;
  } & Partial<Board>
>('column/update', async ({ boardId, columnId, title, order, token }) => {
  try {
    const response = await api.put(
      `/boards/${boardId}/columns/${columnId}`,
      { title: title, order: order },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (err) {
    throw err;
  }
});

export const deleteColumn = createAsyncThunk<
  ColumnInterface,
  {
    boardId: string;
    columnId?: string;
    token: string;
  } & Partial<Board>
>('column/delete', async ({ boardId, columnId, token }) => {
  try {
    const response = await api.delete(`/boards/${boardId}/columns/${columnId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    throw err;
  }
});

export const getColumns = createAsyncThunk<ColumnInterface[], { boardId: string; token: string }>(
  'columns/get',
  async ({ boardId, token }) => {
    try {
      const response = await api.get(`/boards/${boardId}/columns`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (err) {
      throw err;
    }
  }
);

export const getBoards = createAsyncThunk<Board[], { token: string }>(
  'boards/get',
  async ({ token }) => {
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
  }
);

export const getCurrentBoard = createAsyncThunk<Board, { boardId: string; token: string }>(
  'boards/getCurrent',
  async ({ boardId, token }) => {
    try {
      const response = await api.get(`/boards/${boardId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (err) {
      throw err;
    }
  }
);

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

export const currentBoardSlice = createSlice({
  name: 'currentBoard',
  initialState: {
    boards: [],
    loading: false,
    currentBoard: {} as Board,
    currentColumn: {} as ColumnInterface,
    editMode: false,
    id: 'string',
    title: 'Mock title',
  } as CurrentBoardState,
  reducers: {
    complete: (state: CurrentBoardState) => {
      state.loading = true;
    },
  },
  extraReducers(builder) {
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
      state.loading = false;
      state.currentBoard = action.payload;
    });
    builder.addCase(getColumns.fulfilled, (state, action) => {
      state.currentBoard.columns = action.payload;
    });
    builder.addCase(createColumn.fulfilled, (state, action) => {
      state.currentBoard.columns?.push(action.payload);
    });
    builder.addCase(getColumn.fulfilled, (state, action) => {
      state.currentColumn = action.payload;
    });
    builder.addCase(createTask.fulfilled, (state, action) => {
      state.currentBoard.columns
        ?.filter((column) => action.payload.columnId === column.id)[0]
        .tasks?.push(action.payload);
    });
  },
});

export const { complete } = currentBoardSlice.actions;

export default currentBoardSlice.reducer;
