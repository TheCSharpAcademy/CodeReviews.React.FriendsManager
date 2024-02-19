import { configureStore } from '@reduxjs/toolkit';
import friendsReducer from './Slices/friendsSlice';
import categoriesReducer from './Slices/categoriesSlice';


const store = configureStore({
    reducer: {
        friends: friendsReducer,
        categories: categoriesReducer,
    },
})

export default store;
