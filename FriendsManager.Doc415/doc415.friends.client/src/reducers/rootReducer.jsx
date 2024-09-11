import { combineReducers } from '@reduxjs/toolkit'


const categoriesReducer = (state = [], action) => {
    switch (action.type) {
        case 'ADDCATEGORY': {
            console.log('category payload', action.payload)
            return [...state, action.payload];
        }

        case 'DELETECATEGORY':
            return state.filter(category => category.id !== action.payload);

        case 'SET':
            {
                console.log(action.payload)
                return [...state, ...action.payload.categories];
            }

        case 'UPDATECATEGORY':
            {
                return state.map(category => category.id === action.payload.id ? { ...category, name: action.payload.name } : category)

            }

        default:
            return state;
    }

}

const friendsReducer = (state = [], action) => {
    switch (action.type) {
        case 'ADDFRIEND': {
            return [...state, action.payload]
        }

        case 'DELETEFRIEND': {
            return state.filter(friend => friend.id !== action.payload);
        }

        case 'UPDATEFRIEND': {
            return state.map(friend => friend.id !== action.payload.id ? friend : action.payload);
        }

        case 'SETFRIENDS':
            return [...state, ...action.payload];

        case 'UPDATECLIENTLIST':
            return state.filter(friend => friend.inCategory !== action.payload)

        case 'UPDATEFRIENDSCATEGORIES':
            return state.map(friend => friend.inCategory === action.payload.id ? { ...friend, categoryName: action.payload.name } : friend)
        default:
            return state;
    }

}

export const rootReducer = combineReducers({
    categories: categoriesReducer,
    friends: friendsReducer
})


