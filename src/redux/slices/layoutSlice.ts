import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

export interface FormValues {
  id?: string;
  name: string;
  age: number;
  email: string;
  password: string;
  passwordConfirmation: string;
  gender: string;
  term: NonNullable<boolean | undefined>;
  image?: FileList | undefined;
  imageBase64?: string | ArrayBuffer | null;
  country: string;
}

interface LayoutState {
  latestForms: FormValues[];
}

const initialState: LayoutState = {
  latestForms: [],
};

export const layoutSlice = createSlice({
  name: 'layout',
  initialState: initialState,
  reducers: {
    addForm: (state, action: PayloadAction<FormValues>) => {
      state.latestForms.unshift(action.payload);
    },
  },
});

export const { addForm } = layoutSlice.actions;
export default layoutSlice.reducer;
