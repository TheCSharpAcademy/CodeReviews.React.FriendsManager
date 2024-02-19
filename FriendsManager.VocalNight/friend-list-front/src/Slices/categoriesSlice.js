import { createReducer, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    categories: [],
    loading: false,
    error: null,
};

export const fetchCategoriesList = createAsyncThunk('categories/fetchCategories', async () => {
    const response = await axios.get('https://localhost:7187/api/Categories');
    return response.data;
});

export const removeCategory = createAsyncThunk(
    'categories/removeCategory', async (id, thunk) => {
        try {
            await axios.delete('https://localhost:7187/api/Categories/' + id);
            return id;
        } catch (error) {
            return thunk.rejectWithValue(error);
        }
    }
)

export const updateCategory = createAsyncThunk(
    'categories/updateCategory', async (category, thunk) => {
        try {
            await axios.put('https://localhost:7187/api/Categories/' + category.Id, category);
            return category;
        } catch (error) {
            return thunk.rejectWithValue(error);
        }
    }
)

export const addCategory = createAsyncThunk(
    'categories/addCategory', async (category, thunk) => {
        try {
            const response = await axios.post('https://localhost:7187/api/Categories/', category);
            return response.data;
        } catch (error) {
            return thunk.rejectWithValue(error);
        }
    }
)

const categoriesReducer = createReducer(initialState, (builder) => {
    builder.addCase(fetchCategoriesList.pending, (state) => {
        state.loading = true;
        state.error = null;
    })
    .addCase(fetchCategoriesList.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
    })
    .addCase(fetchCategoriesList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
    })
    .addCase(removeCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.categories = state.categories.filter(category => category.Id !== action.payload);
    })
    .addCase(addCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.categories = [...state.categories, action.payload];
    })
    .addCase(updateCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.categories = state.categories.map(category => {
            if (category.Id === action.payload.Id) {
                return action.payload;
            } else {
                return category;
            }    
        });
    })
});

export default categoriesReducer;
