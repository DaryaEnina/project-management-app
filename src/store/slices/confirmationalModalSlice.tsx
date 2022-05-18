import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const confirmationalModalSlice = createSlice({
  name: 'confirmationalModal',
  initialState: {
    isOpen: false,
    currentCardId: '',
  } as ConfirmationalModalSliceState,
  reducers: {
    setOpen: (state: ConfirmationalModalSliceState, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload;
    },
    setCurrentCardId: (state: ConfirmationalModalSliceState, action: PayloadAction<string>) => {
      state.currentCardId = action.payload;
    },
  },
});

export const { setOpen, setCurrentCardId } = confirmationalModalSlice.actions;
export default confirmationalModalSlice.reducer;
