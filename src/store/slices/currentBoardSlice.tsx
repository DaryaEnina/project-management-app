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
    newColumnId?: string;
    newOrder?: number;
    token: string;
    userId: string;
  } & Partial<TaskInterface>
>(
  'task/update',
  async ({ boardId, columnId, taskId, token, userId, title, order, description, newColumnId }) => {
    try {
      const response = await api.put(
        `/boards/${boardId}/columns/${columnId}/tasks/${taskId}`,
        {
          title: title,
          order: order,
          description: description,
          userId: userId,
          boardId: boardId,
          columnId: newColumnId ? newColumnId : columnId,
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

export const deleteTask = createAsyncThunk<
  ColumnInterface,
  {
    boardId: string;
    columnId?: string;
    token: string;
    taskId: string;
  } & Partial<TaskInterface>
>('task/delete', async ({ boardId, columnId, token, taskId }) => {
  try {
    const response = await api.delete(`/boards/${boardId}/columns/${columnId}/tasks/${taskId}`, {
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
      state.loading = false;
      state.currentBoard.columns = state.currentBoard.columns?.sort(
        (column1, column2) => (column1?.order || 0) - (column2?.order || 0)
      );
      state.currentBoard.columns?.map((column) =>
        column.tasks?.sort((task1, task2) => task1.order - task2.order)
      );
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
    builder.addCase(updateColumn.fulfilled, (state) => {
      state.currentBoard.columns?.map((column) => column.order);
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
        .tasks?.sort((task) => task.order);
    });
  },
});

export const { complete } = currentBoardSlice.actions;

export default currentBoardSlice.reducer;
