import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loadFriend, loadFriends, addFriend, deleteFriend, updateFriend } from '../services/api';

export const loadFriendThunk = createAsyncThunk('friends/loadFriend', async (id) => {
  const response = await loadFriend(id);
  return response;
});

export const loadFriendsThunk = createAsyncThunk('friends/loadFriends', async () => {
  const response = await loadFriends();
  return response;
});

export const addFriendThunk = createAsyncThunk('friends/addFriend', async (friend) => {
  const response = await addFriend(friend);
  return response;
});

export const updateFriendThunk = createAsyncThunk('friends/updateFriend', async (friend) => {
  const response = await updateFriend(friend);
  return response;
});

export const deleteFriendThunk = createAsyncThunk('friends/deleteFriend', async (id) => {
  const response = await deleteFriend(id);
  if (response) {
    return id;
  }
});

const friendsSlice = createSlice({
  name: 'friends',
  initialState: {
    data: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadFriendsThunk.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loadFriendsThunk.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
        state.error = null;
      })
      .addCase(loadFriendsThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addFriendThunk.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      .addCase(updateFriendThunk.fulfilled, (state, action) => {
        const index = state.data.findIndex(friend => friend.id === action.payload.id);
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })
      .addCase(deleteFriendThunk.fulfilled, (state, action) => {
        state.data = state.data.filter(friend => friend.id !== action.payload);
      });
  }
});

export default friendsSlice.reducer;
