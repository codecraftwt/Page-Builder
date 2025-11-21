import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_BASE_URL = 'http://localhost:5000/api';

export const fetchPages = createAsyncThunk(
  'pages/fetchPages',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/pages`);
      if (!response.ok) throw new Error('Failed to fetch pages');
      const result = await response.json();
      return result.data || [];
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deletePage = createAsyncThunk(
  'pages/deletePage',
  async (pageId, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/page/${pageId}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete page');
      return pageId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const renamePage = createAsyncThunk(
  'pages/renamePage',
  async ({ pageId, newTitle }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/page/${pageId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: newTitle }),
      });
      if (!response.ok) throw new Error('Failed to rename page');
      const result = await response.json();
      return result.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const pagesSlice = createSlice({
  name: 'pages',
  initialState: {
    pages: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPages.fulfilled, (state, action) => {
        state.loading = false;
        state.pages = action.payload;
      })
      .addCase(fetchPages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deletePage.fulfilled, (state, action) => {
        state.pages = state.pages.filter(page => page.pageId !== action.payload);
      })
      .addCase(renamePage.fulfilled, (state, action) => {
        const index = state.pages.findIndex(page => page.pageId === action.payload.pageId);
        if (index !== -1) {
          state.pages[index] = action.payload;
        }
      });
  },
});

export const { clearError } = pagesSlice.actions;
export default pagesSlice.reducer;
