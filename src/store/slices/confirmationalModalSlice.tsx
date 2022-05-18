import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const confirmationalModalSlice = createSlice({
  name: 'confirmationalModal',
  initialState: {
    isOpen: false,
  } as ConfirmationalModalSliceState,
  reducers: {
    setOpen: (state: ConfirmationalModalSliceState, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload;
    },
  },
});

export const { setOpen } = confirmationalModalSlice.actions;
export default confirmationalModalSlice.reducer;
