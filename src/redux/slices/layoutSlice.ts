import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface LayoutState {
  search: string;
}

const initialState: LayoutState = {
  search: localStorage.getItem('search') || '',
};

export const layoutSlice = createSlice({
  name: 'layout',
  initialState: initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
      localStorage.setItem('search', action.payload);
    },
  },
});

export const { setSearch } = layoutSlice.actions;
export default layoutSlice.reducer;
