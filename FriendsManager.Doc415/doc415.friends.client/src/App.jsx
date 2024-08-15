import './App.css';
import AddFriend from './components/FriendForm';
import CategoryList from './components/categoryList'
import "bootstrap-icons/font/bootstrap-icons.css";
import Topmenu from './components/topmenu'
import FriendList from './components/friendList'
import { setCategoriesFromServer, setFriends, updateClientFriendList } from './actions/actions'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { CircleLoader } from 'react-spinners'

function App() {
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(true);
    const [isFriendsEmpty, setIsFriendsEmpty] = useState(true);
    const friends = useSelector(state => state.friends)
    const [isFriendsSelected, setIsFriendsSelected] = useState(true);

    useEffect(() => {
        if (friends.length < 1) {
            setIsFriendsEmpty(true)
        }
        else {
            setIsFriendsEmpty(false)

        }
    }, [friends])

    useEffect(() => {
        let categoriesFromServer = []
        axios.get('https://localhost:7016/api/FCategories').then(response => {
            categoriesFromServer = response.data
            dispatch(setCategoriesFromServer(categoriesFromServer))
            setIsLoading(false)

        }).catch(error => console.log(error))
        let friendsFromServer = []
        axios.get('https://localhost:7016/api/Friends').then(response => {
            friendsFromServer = response.data
            dispatch(setFriends(friendsFromServer))
            setIsLoading(false)

        }).catch(error => console.log(error))
        console.log(friendsFromServer)

    }, [])

    const handlePageChange = (isCategorySelected) => {
        setIsFriendsSelected(!isCategorySelected)
        console.log(isFriendsSelected)
        console.log(isCategorySelected)
    }

    const updateFriends = (id) => {
        console.log('deleting friends from category')
        dispatch(updateClientFriendList(id))
    }



    return (
        <>
            <Topmenu onSelect={handlePageChange} />
            <hr />
            <div className="main">
                {isLoading ?
                    <div className="d-flex justify-content-center align-items-center" style={{ height: '60vh' }}>
                        <CircleLoader size='150'/>
                    </div>
                    :
                    <>
                        {isFriendsSelected ? (
                            <>
                                {!isFriendsEmpty ? (<>
                                    <FriendList />
                                </>)
                                    :
                                    <div className='text-center'>  <span className='dancingFont startText'>Lets start adding friends...</span>
                                        <AddFriend onAddComplete={() => console.log('added')} /></div>
                                }
                            </>) :
                            (<>
                                <CategoryList onChange={updateFriends} />
                            </>)}
                    </>
                }
            </div>

        </>
    );
}

export default App;