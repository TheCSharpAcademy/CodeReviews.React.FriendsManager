import { createReducer, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    friends: [],
    loading: false,
    error: null,
};

export const fetchFriendsList = createAsyncThunk('friends/fetchFriends', async () => {
    const response = await axios.get('https://localhost:7187/api/Friends');
    return response.data;
});

export const removeFriend = createAsyncThunk(
    'friends/removeFriend', async (id, thunk) => {
        try {
            await axios.delete('https://localhost:7187/api/Friends/' + id);
            return id;
        } catch (error) {
            return thunk.rejectWithValue(error);
        }
    }
)

export const updateFriend = createAsyncThunk(
    'friends/updateFriend', async (friend, thunk) => {
        try {
            await axios.put('https://localhost:7187/api/Friends/' + friend.Id, friend);
            return friend;
        } catch (error) {
            return thunk.rejectWithValue(error);
        }
    }
)

export const addFriend = createAsyncThunk(
    'friends/addFriend', async (friend, thunk) => {
        try {
            const response = await axios.post('https://localhost:7187/api/Friends', friend);
            return response.data;
        } catch (error) {
            return thunk.rejectWithValue(error);
        }
    }
)

const friendsReducer = createReducer(initialState, (builder) => {
    builder.addCase(fetchFriendsList.pending, (state) => {
        state.loading = true;
        state.error = null;
    })
    .addCase(fetchFriendsList.fulfilled, (state, action) => {
        state.loading = false;
        state.friends = action.payload;
    })
    .addCase(fetchFriendsList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
    })
    .addCase(removeFriend.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.friends = state.friends.filter(friend => friend.id !== action.payload);
    })
    .addCase(addFriend.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.friends = [...state.friends, action.payload];
    })
    .addCase(updateFriend.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.friends = state.friends.map(friend => {
            if (friend.Id === action.payload.Id) {
                return action.payload;
            } else {
                return friend;
            }    
        });
    })
});

export default friendsReducer;
