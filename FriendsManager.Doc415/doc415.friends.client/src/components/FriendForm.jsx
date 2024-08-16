import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Stack, Form } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { addFriend,updateFriend } from '../actions/actions'
import axios from 'axios'
import handShakeImage from '../assets/handshake.png'

const FriendForm = ({ fromUpdate, onUpdate, updatingFriend, onAddComplete }) => {
    const baseUrl = 'https://localhost:7016/api/friends/'
    const [isFromUpdate,setIsFromUpdate]=useState(fromUpdate)
    const [selectedCategory, setSelectedCategory] = useState("-1");
    const [interval, setFriendInterval] = useState('');
    const templateFriend = {
        id: '',
        name: '',
        lastContactDate: '',
        minRecontactInDays: undefined,
        formattedDate: '',
        inCategory: '',
        lastContactMethod: '',
        isMissedContact: false,
        daysToNextContact: 0,
        categoryName:''
    }
    const [newFriend, setNewFriend] = useState(templateFriend)
    const dispatch = useDispatch()
    const categories = useSelector(state => state.categories)

    useEffect(() => {
        if (isFromUpdate) {
            setNewFriend(updatingFriend)
            setFriendInterval(updatingFriend.minRecontactInDays)
            setSelectedCategory(updatingFriend.inCategory) 

        } else {
            setNewFriend(templateFriend)
            setFriendInterval('')
            setSelectedCategory(-1)
        }
        
   

    }, [])

const handleNameChange = (e) => {
    const value = e.target.value;
    setNewFriend({
        ...newFriend,
        name: value
    });
};

const handleMethodChange = (e) => {
    const value = e.target.value;
    setNewFriend({
        ...newFriend,
        lastContactMethod: value
    });
};

const handleDateChange = (e) => {
    let formatDate = e.toLocaleString('tr-TR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    })
    setNewFriend({
        ...newFriend,
        lastContactDate: e,
        formattedDate: formatDate
        })
    }

    const handleIntervalChange = (e) => {
        if (e.target.value > 0) {
            setFriendInterval(e.target.value)
            setNewFriend({
                ...newFriend,
                minRecontactInDays: e.target.value
            })
        }
    }


const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value)
    setNewFriend({
        ...newFriend,
        inCategory: e.target.value
    });
};


const handleSubmit = (e) => {
    e.preventDefault()
    if (newFriend.inCategory === "" || newFriend.name === '' || newFriend.lastContactDate === '' || newFriend.minRecontactInDays === undefined || newFriend.lastContactMethod === '') { return }

    const { lastContactDate, ...friend } = newFriend
 
    if (!isFromUpdate) {
        axios.post(baseUrl, friend)
            .then(response => {
                dispatch(addFriend(response.data))
            })
            .catch(error =>
                console.log(error)
            );
    } else {
        axios.put(`${baseUrl}${friend.id}`, friend)
            .then(response => {
                dispatch(updateFriend(response.data))
            })
            .catch(error =>
                console.log(error)
            );
    }
    setNewFriend(templateFriend)
    setSelectedCategory({ id: "-1", name: "" })
    setFriendInterval("")
    if (!isFromUpdate) {
        onAddComplete()
    } else {
        onUpdate()
    }
};

return (
    <>
        <div className="d-flex justify-content-center">
            <Form onSubmit={handleSubmit}>
                <Stack direction="horizontal" gap={5}>
                    <Stack direction="vertical" gap={2}>
                        <Form.Group controlId="formName">
                            <Form.Label >Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={newFriend.name}
                                onChange={handleNameChange}
                                placeholder="Name"
                            />
                        </Form.Group>

                        <Form.Group controlId="formLastContactDate">
                            <Form.Label>Last Contact Date</Form.Label>
                            <br />
                            <DatePicker
                                name="date"
                                selected={newFriend.lastContactDate}
                                value={newFriend.formattedDate}
                                onChange={handleDateChange}
                                dateFormat="dd/MM/yyyy"
                                className="form-control"
                                placeholderText="Select date"
                            />
                        </Form.Group>

                        <Form.Group controlId="formDesiredContactDaySpan">
                            <Form.Label>Desired Contact Interval</Form.Label>
                            <Form.Control
                                type="number"
                                name="interval"
                                value={interval}
                                onChange={handleIntervalChange}
                                placeholder="Contact interval"
                            />
                        </Form.Group>
                        
                    </Stack>

                    <Stack direction="vertical" gap={2}>
                        <Form.Group controlId="formCategory">
                            <Form.Label>Category</Form.Label>
                            <Form.Control
                                as="select"
                                name="category"
                                onChange={handleCategoryChange}
                                value={selectedCategory}
                            >
                                <option key={-1} value="-1">
                                    Select Category
                                </option>
                                {categories.map(category => (
                                    <option key={category.id} value={category.id}>
                                        {category.name}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="formMethod">
                            <Form.Label>Last contact method</Form.Label>
                            <Form.Control
                                type="text"
                                name="method"
                                value={newFriend.lastContactMethod}
                                onChange={handleMethodChange}
                                placeholder="Contact method"
                            />
                        </Form.Group>
                        <br />
                        <button className='submitButton dancingFont' type="submit" >
                            <span> {isFromUpdate? 'Update':'Add'}</span>
                        </button>
                    </Stack>

                </Stack>
            </Form>
        </div>
        <div className="text-center">
            <img className="handShakeImage" src={handShakeImage} width='33%' />
        </div>
    </>
);
};

export default FriendForm;
