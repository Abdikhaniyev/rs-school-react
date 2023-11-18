import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface LayoutState {
  search: string;
  viewMode: 'detailed' | 'grid';
  characterLoading: boolean;
  charactersLoading: boolean;
  episodesLoading: boolean;
}

const initialState: LayoutState = {
  search: localStorage.getItem('search') || '',
  viewMode: window.location.pathname.includes('character') ? 'detailed' : 'grid',
  characterLoading: false,
  charactersLoading: false,
  episodesLoading: false,
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
    setCharacterLoading: (state, action: PayloadAction<boolean>) => {
      state.characterLoading = action.payload;
    },
    setCharactersLoading: (state, action: PayloadAction<boolean>) => {
      state.charactersLoading = action.payload;
    },
    setEpisodesLoading: (state, action: PayloadAction<boolean>) => {
      state.episodesLoading = action.payload;
    },
  },
});

export const {
  setSearch,
  setViewMode,
  setCharacterLoading,
  setCharactersLoading,
  setEpisodesLoading,
} = layoutSlice.actions;
export default layoutSlice.reducer;
