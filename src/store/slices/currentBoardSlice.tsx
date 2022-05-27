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

export const createTask = createAsyncThunk<
  TaskInterface,
  {
    boardId: string;
    columnId?: string;
    token: string;
    userId: string;
    title: string;
    description: string;
  }
>('task/create', async ({ boardId, columnId, token, userId, title, description }) => {
  try {
    const response = await api.post(
      `/boards/${boardId}/columns/${columnId}/tasks`,
      {
        title: title,
        description: description,
        userId: userId,
      },
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

export const updateTask = createAsyncThunk<
  TaskInterface,
  {
    boardId: string;
    columnId?: string;
    taskId: string;
    newColumnId: string;
    newOrder: number;
    token: string;
    userId: string;
  }
>(
  'task/update',
  async ({ boardId, columnId, taskId, newColumnId, newOrder, token /* userId */ }) => {
    try {
      const response = await api.put(
        `/boards/${boardId}/columns/${columnId}/tasks/${taskId}`,
        {
          title: 'Task: pet the cat',
          order: newOrder,
          description: 'Domestic cat needs to be stroked gently',
          userId: '527176c4-ff92-4525-9c38-d327eaed7c01',
          boardId: boardId,
          columnId: newColumnId,
        },
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
  }
);

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

export const createColumn = createAsyncThunk<
  ColumnInterface,
  { boardId: string; token: string; column: ColumnInterface }
>('column/create', async ({ boardId, token, column }) => {
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
});

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
    builder.addCase(updateTask.fulfilled, (state, action) => {
      state.currentBoard.columns
        ?.filter((column) => action.payload.columnId === column.id)[0]
        .tasks?.push(action.payload);
      state.currentBoard.columns?.filter((column) =>
        column.tasks?.filter((task) => task.id !== action.payload.id)
      );
    });
  },
});

export const { complete } = currentBoardSlice.actions;

export default currentBoardSlice.reducer;
