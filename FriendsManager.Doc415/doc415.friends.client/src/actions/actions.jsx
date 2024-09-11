export const addFriend = (friend) => {
    return {
        type: 'ADDFRIEND',
        payload: friend
    }
}

export const setFriends = (friends) => {
    return {
        type: 'SETFRIENDS',
        payload: friends
    }
}

export const deleteFriend = (id) => {
    return {
        type: 'DELETEFRIEND',
        payload: id
    }
}

export const updateFriend = (friend) => {
    return {
        type: 'UPDATEFRIEND',
        payload: friend
    }
}

export const setCategoriesFromServer = (categories) => {
    return {
        type: 'SET',
        payload: { categories }
    }
}

export const addCategory = (newCategory) => {
    return {
        type: 'ADDCATEGORY',
        payload: newCategory
    }
}

export const deleteCategory = (category) => {
    return {
        type: 'DELETECATEGORY',
        payload: category
    }
}
export const updateCategory = (fcategory) => {
    return {
        type: 'UPDATECATEGORY',
        payload: fcategory
    }
}

export const updateClientFriendList = (categoryId)=> {
    return {
        type: 'UPDATECLIENTLIST',
        payload: categoryId
    }
}

export const updateCategoriesInFriendList = (category) => {
    return {
        type: 'UPDATEFRIENDSCATEGORIES',
        payload: category
    }
}