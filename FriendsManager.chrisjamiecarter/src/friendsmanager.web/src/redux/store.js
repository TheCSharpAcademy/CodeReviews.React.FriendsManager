import { configureStore } from '@reduxjs/toolkit';
import apiStatusReducer from './apiStatusSlice';
import categoriesReducer from './categoriesSlice';
import friendsReducer from './friendsSlice';

const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    friends: friendsReducer,
    apiStatus: apiStatusReducer,
  }
});

export default store;
