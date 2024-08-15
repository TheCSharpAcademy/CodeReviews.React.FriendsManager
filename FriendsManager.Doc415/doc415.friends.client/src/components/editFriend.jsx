import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { deleteFriend, updateFriend } from '../actions/actions'
import axios from 'axios'
import { Modal, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react'
import FriendForm from './FriendForm'

const EditFriend = ({ friend, show,onClose }) => {
    const [isModalOn, setIsModalOn] = useState(false)
    const [updatedFriend,setUpdatedFrien]=useState(friend)


    useEffect(() => {
        setIsModalOn(show)
        console.log(isModalOn, friend)
    }, [show]

    )

    const handleUpdate = () => {
        onClose()
    }

    return (
        <>
            <Modal show={show} >
                <Modal.Header className='dancingFont modalHeader'>
                    <Modal.Title>Friend Details</Modal.Title>
                </Modal.Header >
                <Modal.Body className="modalBody">
                    <FriendForm updatingFriend={friend} fromUpdate={true} onUpdate={handleUpdate} />

                </Modal.Body>
                <Modal.Footer className='modalFooter'>
                    <button className="dancingFont modalClose" onClick={onClose}>
                        Close
                    </button>
                    
                </Modal.Footer>
            </Modal >
        </>
    )

}

export default EditFriend;