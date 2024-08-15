import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { deleteFriend, updateFriend } from '../actions/actions'
import axios from 'axios'
import { Card, Stack } from 'react-bootstrap';
import { useState, useEffect } from 'react'
import FriendForm from './FriendForm'
import EditFriend from './editFriend'
import { set } from '../../../../../../AppData/Local/Microsoft/TypeScript/5.2/node_modules/date-fns/set';

const FriendList = () => {
    const dispatch = useDispatch()
    const friends = useSelector(state => state.friends)
    const baseUrl = 'https://localhost:7016/api/friends/'
    console.log(friends)
    const [addNewClicked, setAddNewClicked] = useState(false)
    const [selectedFriend, setSelectedFriend] = useState(undefined)
    const [toShow, setToShow] = useState(false)


    useEffect(() => {
        if (friends.length < 1) {
            setAddNewClicked(false)
        }
        else {
            setAddNewClicked(true)
        }
    }
        , []
    )

    const containerRef = useRef(null);

    const closeForm = () => setAddNewClicked(true)

    const handleScroll = (event) => {
        const container = containerRef.current;
        const scrollAmount = event.deltaY;
        container.scrollTo({
            top: 0,
            left: container.scrollLeft - (3 * scrollAmount),
            behavior: 'smooth'
        });
    };

    const handleDeleteFriend = (id) => {
        if (window.confirm('This will delete selected friend. Are you sure?')) {
            axios.delete(`${baseUrl}${id}`).then(dispatch(deleteFriend(id))).catch(error => console.log(error))
        }
    }

    const handleEditFriend = (friend) => {
        setSelectedFriend(friend);
        setToShow(true);
    }

    const handleContactFriend = (friend) => {
        let latestContactMethod = window.prompt('Enter contact method', 'Telephone')
        let updatedFriend = {
            ...friend, formattedDate: (new Date()).toLocaleString('tr-TR', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
            }), lastContactMethod: latestContactMethod
        }
        console.log(friend, updatedFriend)
        axios.put(`${baseUrl}${updatedFriend.id}`, updatedFriend)
            .then(response => {
                console.log(response.data)
                dispatch(updateFriend(response.data))
            }
            )
            .catch(error => console.log(error))
    }




    return (
        <>
            {addNewClicked ? (
                <div className="listContainer" ref={containerRef} onWheel={handleScroll}>
                    {friends.map(friend =>
                    (
                        <div className="item" id={friend.id}>
                            <Card.Body className='cardBody'>
                                <Card.Title> {friend.name} </Card.Title>
                                <Card.Subtitle className="mb-2 text-muted dancingFont">{friend.categoryName}</Card.Subtitle>
                                <div>

                                    {friend.daysToNextContact < 0 ?
                                        (<span style={{ color: '#B44B75' }}>
                                            You have missed your planned contact for {Math.abs(friend.daysToNextContact)} days!
                                        </span>)
                                        :
                                        (friend.daysToNextContact === 0 ?
                                            <span style={{ color: '#F16020' }}>You have planned contact today!</span>
                                            :
                                            <span style={{ color: '#71D7B0' }}>You have {friend.daysToNextContact} days for planned contact
                                            </span>
                                        )
                                    }
                                </div>

                            </Card.Body>
                            <Card.Footer >
                                <Stack gap={5} direction="horizontal">
                                    <button className="dancingFont contactButton" style={{ backgroundColor: 'transparent' }} onClick={() => handleContactFriend(friend)}><i class="bi bi-chat-quote"></i></button>
                                    <Stack gap={2} direction="horizontal">
                                    <button className="cardButtons" onClick={() => handleEditFriend(friend)}><i class="bi bi-credit-card-2-front"></i></button>
                                        <button className="cardButtons" onClick={() => handleDeleteFriend(friend.id)}><i class="bi bi-person-x"></i></button>
                                    </Stack>
                                </Stack>
                            </Card.Footer>
                        </div>
                    ))}
                </div>) :
                <FriendForm onAddComplete={closeForm} />}

            <div className="text-center justify-content-center">
                <hr />
                <br />
                <button className="dancingFont addFriendButton" style={{ fontSize: 32 }} onClick={() => setAddNewClicked(!addNewClicked)}> {addNewClicked ? "Add new friend" : "Return to list"}</button>
            </div>
            <div>
                <EditFriend friend={selectedFriend} show={toShow} onClose={() => setToShow(false)} />
            </div>
        </>
    )
}

export default FriendList;