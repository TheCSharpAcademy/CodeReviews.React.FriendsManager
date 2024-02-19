import { addCategory, updateCategory } from '../Slices/categoriesSlice';
import { useDispatch } from 'react-redux';

export default function CategoryModal({ handleClose, currentCategory }) {
    const dispatch = useDispatch();

    function handleSubmit(e) {
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);
        const formJson = Object.fromEntries(formData.entries());

        if (currentCategory) {
            editCategory(currentCategory, formJson);
        } else {
            createCategory(formJson);
        }

        handleClose();
    }

    function createCategory(formJson) {
        dispatch(addCategory({
            Name: formJson.Name,
        }));
    }

    function editCategory(category, formJson) {
        dispatch(updateCategory(
            {
                Id: category.Id,
                Name: formJson.Name,
            }
        ))
    }


    return (
        <div>
            <section className="modal-main-categories">
                <form method="post" onSubmit={handleSubmit}>
                    <div className='ml-2 mt-2'>

                        <label
                            className='mr-2 text-stone-400 font-bold'
                            htmlFor="fName">Name</label>
                        <input
                            className='shadow bg-stone-500 text-gray-950 appearance-none border rounded py-2 px-3  leading-tight focus:outline-none focus:shadow-outline'
                            name="Name"
                            defaultValue={currentCategory ? currentCategory.Name : ""}
                            id="fName"
                            type="text"></input>

                    </div>
                    <div>
                        <button
                            className='
                        bg-yellow-600 hover:bg-yellow-900  text-white font-bold py-2 px-4 rounded m-2'
                            type="submit">{currentCategory ? "Edit" : "Create"}</button>
                        <button
                            className=' text-white bg-amber-700 hover:bg-amber-800 font-bold py-2 px-4 rounded'
                            type="button" onClick={() => handleClose()}>Cancel</button>
                    </div>
                </form>
            </section>
        </div>
    );
}
