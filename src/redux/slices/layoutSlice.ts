/* eslint-disable @typescript-eslint/no-unused-vars */
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import { FormValues } from '../../pages/UncontrolledForm';

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
      state.latestForms.push(action.payload);
    },
  },
});

export const { addForm } = layoutSlice.actions;
export default layoutSlice.reducer;
