import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface SearchState {
  value: string;
}

const initialState: SearchState = {
  value: localStorage.getItem('search') || '',
};

export const searchSlice = createSlice({
  name: 'search',
  initialState: initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
      localStorage.setItem('search', action.payload);
    },
  },
});

export const { setSearch } = searchSlice.actions;
export default searchSlice.reducer;
