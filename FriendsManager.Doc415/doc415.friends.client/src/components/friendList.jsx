import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { deleteFriend, updateFriend } from '../actions/actions'
import axios from 'axios'
import { Card, Stack } from 'react-bootstrap';
import { useState, useEffect } from 'react'
import FriendForm from './FriendForm'
import EditFriend from './editFriend'
import { set } from 'date-fns';

const FriendList = () => {
    const dispatch = useDispatch()
    const friends = useSelector(state => state.friends)
    const baseUrl = 'https://localhost:7016/api/friends/'
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
        axios.put(`${baseUrl}${updatedFriend.id}`, updatedFriend)
            .then(response => {
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
                                        (<p style={{ color: '#F47925' }}>
                                            You have missed your planned contact for {Math.abs(friend.daysToNextContact)} days!
                                        </p>)
                                        :
                                        (friend.daysToNextContact === 0 ?
                                            <p style={{ color: '#6DBAEE' }}>You have planned contact today!</p>
                                            :
                                            <p style={{ color: '#31BB9D' }}>You have {friend.daysToNextContact} days for next contact
                                            </p>
                                        )
                                    }
                                    
                                    <p style={{ color: '#746169' }}>
                                        Your last contact was via <span style={{ color: '#9B3E73',fontWeight:600 }}> {friend.lastContactMethod} </span>
                                    </p>
                                </div>

                            </Card.Body>
                            <Card.Footer >
                                <Stack gap={5} direction="horizontal">
                                    <button className="dancingFont contactButton" style={{ backgroundColor: 'transparent' }} onClick={() => handleContactFriend(friend)}><i className="bi bi-chat-quote"></i></button>
                                    <Stack gap={2} direction="horizontal">
                                    <button className="cardButtons" onClick={() => handleEditFriend(friend)}><i className="bi bi-credit-card-2-front"></i></button>
                                        <button className="cardButtons" onClick={() => handleDeleteFriend(friend.id)}><i className="bi bi-person-x"></i></button>
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
