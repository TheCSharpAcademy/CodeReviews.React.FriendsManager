import { useSelector, useDispatch } from 'react-redux'
import { Stack, Form } from 'react-bootstrap';
import { useState, useEffect } from 'react'
import axios from 'axios'
import { addCategory,updateCategory } from '../actions/actions'
import categoryService from '../service/categoryService'
function CategoryForm({ updatingCategory, onCategoryUpdate }) {

    const dispatch = useDispatch();
    const categories = useSelector(state => state.categories)
    const [newCategory, setNewCategory] = useState('')
    const baseUrl = 'https://localhost:7016/api/fcategories/'
    const [isUpdating, setIsUpdating] = useState(false);
    const [buttonText, setButtonText] = useState('Add');

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
            categoryService.addCategory(fcategory)
                .then(response => {
                    if (response.status === 201) {
                        dispatch(addCategory(response.data))
                    }
                    else {
                        window.alert(`Unexpected response: ${response.status}`)
                    }
                    setNewCategory('')
                }
                )
                .catch(error => console.log(error))
        } else {
            categoryService.updateCategory(fcategory, updatingCategory.id).then(response=>{
                if (response.status === 200) {
                    dispatch(updateCategory(fcategory))
                }
                else
                {
                    window.alert(`Unexpected response: ${response.status}`)
                }
                setNewCategory('')
                setIsUpdating(false)
                onCategoryUpdate(fcategory)
            })
        }
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

