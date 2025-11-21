import { configureStore } from '@reduxjs/toolkit';
import pagesReducer from './slices/pagesSlice';
import editorReducer from './slices/editorSlice';

export const store = configureStore({
  reducer: {
    pages: pagesReducer,
    editor: editorReducer,
  },
});
