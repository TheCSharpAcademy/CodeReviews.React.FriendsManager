import axios from 'axios'
const baseUrl = 'https://localhost:7016/api/fcategories/'

const addCategory = (fcategory) => axios.post(baseUrl, fcategory)
const updateCategory = (fcategory,id) => axios.put(`${baseUrl}${id}`, fcategory)
const deleteCategory = (id) => axios.delete(`${baseUrl}${id}`)

export default{
    updateCategory,
    addCategory,
    deleteCategory

}