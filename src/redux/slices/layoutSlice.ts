import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface LayoutState {
  search: string;
  viewMode: 'detailed' | 'grid';
}

const initialState: LayoutState = {
  search: localStorage.getItem('search') || '',
  viewMode: window.location.pathname.includes('character') ? 'detailed' : 'grid',
};

export const layoutSlice = createSlice({
  name: 'layout',
  initialState: initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
      localStorage.setItem('search', action.payload);
    },
    setViewMode: (state, action: PayloadAction<'detailed' | 'grid'>) => {
      state.viewMode = action.payload;
    },
  },
});

export const { setSearch, setViewMode } = layoutSlice.actions;
export default layoutSlice.reducer;
