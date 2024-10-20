import { createSlice } from '@reduxjs/toolkit';

const apiStatusSlice = createSlice({
  name: 'apiStatus',
  initialState: {
    loading: false,
    error: null
  },
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    }
  }
});

export const { setLoading, setError } = apiStatusSlice.actions;
export default apiStatusSlice.reducer;
