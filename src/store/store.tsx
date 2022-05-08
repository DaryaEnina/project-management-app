import { configureStore } from '@reduxjs/toolkit';
import boardsListSlice from './slices/boardsListSlice';
import currentBoardSlice from './slices/currentBoardSlice';

export const store = configureStore({
  reducer: {
    currentBoard: currentBoardSlice,
    boardsList: boardsListSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
