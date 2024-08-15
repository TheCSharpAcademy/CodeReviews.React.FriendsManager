import { useSelector, useDispatch } from 'react-redux'
import { Table } from 'react-bootstrap';
import { useState, useEffect } from 'react'
import axios from 'axios'
import CategoryForm from '../components/categoryForm'
import {deleteCategory} from '../actions/actions'

const CategoryList = ({onChange}) => {
    const baseUrl = 'https://localhost:7016/api/fcategories/'
    const categories = useSelector(state => state.categories)
    const [newName, setNewName] = useState('')
    const dispatch = useDispatch()
    const [selectedCategory,setSelectedCategory]=useState(undefined)
    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }

    const handleUpdate = (category) => {
        setSelectedCategory(category)
        console.log('updating', category)
    }

    const resetState = () => {
        console.log('reseting state')
        setSelectedCategory(undefined)
    }

    const handleDelete = (category) => {
        if (window.confirm(`This will delete ${category.name} category and all friends in this category. Are you sure? `))
        {
            axios.delete(`${baseUrl}${category.id}`).then(response => {
                dispatch(deleteCategory(category.id))
                console.log(response.data)
            })
                .catch(error => console.log(error))
            onChange(category.id);

        }
                       
    }

    return (
        <>
            <div className="d-flex justify-content-center mb-2">
                <CategoryForm updatingCategory={selectedCategory} onCategoryUpdate={resetState} />
            </div>

            <div className="d-flex justify-content-center">
                <Table striped bordered hover style={{ width: 300 }} className="categoryTable">
                    <tbody>
                        {categories.map(category => (
                            <tr id={category.id}>
                                <td>{category.name}</td>
                                <td> <button onClick={() => handleUpdate(category)} className='categoryButton'><i style={{ color: '#B94C73' }} className="bi bi-pen"></i></button></td>
                                <td> <button onClick={() => handleDelete(category)} className='categoryButton'><i style={{ color: '#f48427' }} className="bi bi-folder-x"></i></button></td>

                            </tr>))}
                    </tbody>

                </Table>
            </div>
        </>
    )
}
export default CategoryList