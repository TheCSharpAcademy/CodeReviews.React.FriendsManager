import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loadCategories } from '../services/api';

export const loadCategoriesThunk = createAsyncThunk('categories/loadCategories', async () => {
  const response = await loadCategories();
  return response;
});

const categoriesSlice = createSlice({
  name: 'categories',
  initialState: {
    data: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadCategoriesThunk.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loadCategoriesThunk.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
        state.error = null;
      })
      .addCase(loadCategoriesThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export default categoriesSlice.reducer;
