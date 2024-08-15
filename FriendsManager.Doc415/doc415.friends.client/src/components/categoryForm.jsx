import { useSelector, useDispatch } from 'react-redux'
import { Stack, Form } from 'react-bootstrap';
import { useState, useEffect } from 'react'
import axios from 'axios'
import { addCategory,updateCategory } from '../actions/actions'

function CategoryForm({ updatingCategory, onCategoryUpdate }) {

    console.log(onCategoryUpdate)
    const dispatch = useDispatch();
    const categories = useSelector(state => state.categories)
    const [newCategory, setNewCategory] = useState('')
    const baseUrl = 'https://localhost:7016/api/fcategories/'
    const [isUpdating, setIsUpdating] = useState(false);
    const [buttonText, setButtonText] = useState('Add');
    console.log(updatingCategory)

    useEffect(() => {
        if (updatingCategory !== undefined) {
            setIsUpdating(true)
            setButtonText('Update')
            setNewCategory(updatingCategory.name)
        } else {
            setIsUpdating(false)
            setButtonText('Add')
            setNewCategory('')
        }
    },[updatingCategory,isUpdating])

    const handleNameChange = (event) => {
        setNewCategory(event.target.value)
        console.log(newCategory)
    }

    const handleCategorySubmit = (event) => {
        event.preventDefault()
        if (newCategory === '') {
            return
        }
        
        newCategory.charAt(0).toUpperCase() + newCategory.slice(1)
        let catId = '';
        if (isUpdating) {
            catId=updatingCategory.id
        }
        const fcategory = {
            id: catId,
            name: newCategory.charAt(0).toUpperCase() + newCategory.slice(1)

        }
        if (!isUpdating) {
            axios.post(baseUrl, fcategory).
                then(response => {
                    console.log('return from server', response.data)
                    setNewCategory('')
                    dispatch(addCategory(response.data))
                })
                .catch(error => console.log(error))
        } else {
            axios.put(`${baseUrl}${updatingCategory.id}`, fcategory).then(response=>{
                setNewCategory('')
                dispatch(updateCategory(fcategory))
                setIsUpdating(false)
                onCategoryUpdate()
            })
        }

       

        console.log(newCategory)

    }



    return (
        <div className="p-4">
            <Form onSubmit={handleCategorySubmit} name='categoryForm'>
                <Stack direction="horizontal" gap={3}>
                    <Form.Group controlId="catName">
                        <Form.Control
                            type="text"
                            name="name"
                            value={newCategory}
                            onChange={handleNameChange}
                            placeholder="Name"
                        />
                    </Form.Group>
                    <button type="submit" className="submitButton dancingFont" style={{ width: 100 }}>
                        <span>{buttonText}</span>
                    </button>
                </Stack>
            </Form>

        </div>
    )
}
export default CategoryForm;

