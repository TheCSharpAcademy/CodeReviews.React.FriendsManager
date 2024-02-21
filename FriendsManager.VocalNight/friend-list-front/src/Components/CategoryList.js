import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { removeCategory } from "../Slices/categoriesSlice";
import Modal from 'react-modal'
import CategoryModal from "./CategoryModal";

export default function CategoryList() {
    const [showCategoryMod, setShowCategoryMod] = useState(false);
    const [currentCategory, setCurrentCategory] = useState(null);

    const categories = useSelector((state) => state.categories.categories);
    const dispatch = useDispatch();

    const editItem = (category) => {
        setCurrentCategory(category);
        setShowCategoryMod(true);
    }

    const addItem = () => {
        setCurrentCategory(null);
        setShowCategoryMod(true);
    }

    const deleteItem = async (id) => {
        await dispatch(removeCategory(id));
    }

    return (
        <>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                        </tr>
                    </thead>
                    <tbody>

                        {categories.map(category => (
                            <tr key={category.Id}>
                                <td>{category.Name}</td>
                                <td>
                                    <button 
                                    type="button" 
                                    onClick={() => editItem(category)}
                                    className="bg-yellow-600 hover:bg-yellow-900 text-white font-bold py-2 px-4 rounded"
                                    >Edit</button></td>
                                <td>
                                    <button 
                                    type="button" 
                                    onClick={() => deleteItem(category.Id)}
                                    className="bg-amber-700 hover:bg-amber-800 text-white font-bold py-2 px-4 rounded"
                                    >Delete</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Modal className="modal" ariaHideApp={false} isOpen={showCategoryMod}>
                    <CategoryModal
                        handleClose={() => setShowCategoryMod(false)}
                        currentCategory={currentCategory} />
                </Modal>
                <div className="pt-1">
                    <button type="button" className="bg-amber-700 hover:bg-amber-800 text-white font-bold py-2 px-4 rounded" onClick={() => addItem()}>New Category</button>
                </div>
            </div>
        </>
    );
}
