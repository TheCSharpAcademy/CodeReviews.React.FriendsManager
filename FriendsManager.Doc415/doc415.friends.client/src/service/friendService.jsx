import axios from 'axios'
const baseUrl = 'https://localhost:7016/api/friends/'

const deleteFriend = (id) => axios.delete(`${baseUrl}${id}`)
const updateFriend = (updatedFriend) => axios.put(`${baseUrl}${updatedFriend.id}`, updatedFriend)
const addFriend = (friend) => axios.post(baseUrl, friend)
const getFriends = () => axios.get(baseUrl)

export default {
    deleteFriend,
    updateFriend,
    addFriend,
    getFriends
}