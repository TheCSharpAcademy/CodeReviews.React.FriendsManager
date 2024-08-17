import axios from 'axios'
const baseUrl = 'https://localhost:7016/api/fcategories/'

const addCategory = (fcategory) => axios.post(baseUrl, fcategory)
const updateCategory = (fcategory,id) => axios.put(`${baseUrl}${id}`, fcategory)
const deleteCategory = (id) => axios.delete(`${baseUrl}${id}`)
const getCategories= () => axios.get(baseUrl)
export default{
    updateCategory,
    addCategory,
    deleteCategory,getCategories

}