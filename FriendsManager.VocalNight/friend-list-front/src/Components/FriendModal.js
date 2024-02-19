import { useState } from 'react';
import { addFriend, updateFriend } from '../Slices/friendsSlice';
import { useDispatch } from 'react-redux';

export default function FriendModal({ handleClose, friendCategories, friend }) {
    const [selectedCategory, setSelectedCategory] = useState(friend ? friend.CategoryId : '');
    const dispatch = useDispatch();

    function handleSubmit(e) {
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);
        const formJson = Object.fromEntries(formData.entries());

        if (friend) {
            editFriend(friend, formJson);
        } else {
            createFriend(formJson);
        }

        handleClose();
    }

    function createFriend(formJson) {
        dispatch(addFriend({
            Name: formJson.name,
            LastContactDate: formJson.lastContactDate,
            CategoryId: parseInt(formJson.categoryId),
            DesiredContactFrequency: formJson.desiredContactFrequency,
        }));
    }

    function editFriend(friend, formJson) {
        dispatch(updateFriend(
            {
                Id: friend.Id,
                Name: formJson.name,
                LastContactDate: formJson.lastContactDate,
                //Returns the id as a string if i don't do this :)
                CategoryId: parseInt(formJson.categoryId),
                DesiredContactFrequency: formJson.desiredContactFrequency,
            }));
    }

    return (
        <div>
            <section className="modal-main-friends rounded">
                <form method="post" onSubmit={handleSubmit}>
                    <div className='ml-2 mt-2'>
                        <label className='mr-2 text-stone-400 font-bold' htmlFor="fName">Name</label>
                        <input
                            className='shadow bg-stone-500 text-gray-950 appearance-none border rounded py-2 px-3  leading-tight focus:outline-none focus:shadow-outline mb-1'
                            name="name"
                            defaultValue={friend ? friend.Name : ""}
                            id="fName"
                            type="text"></input>
                        <br />
                        <label className='mr-2 text-stone-400 font-bold' htmlFor="fDaysWanted">Desired Contact Frequency</label>
                        <input
                            className='shadow  appearance-none border rounded py-2 px-3 bg-stone-500 text-gray-950 leading-tight focus:outline-none focus:shadow-outline mb-1'
                            name="desiredContactFrequency"
                            type="number"
                            defaultValue={friend ? friend.DesiredContactFrequency : 0}
                            id="fDaysWanted"></input>
                        <br />
                        <label className='mr-2 text-stone-400 font-bold' htmlFor="lastContact">Last contacted</label>
                        <input
                            className='shadow appearance-none border rounded py-2 px-3 bg-stone-500 text-gray-950 leading-tight focus:outline-none focus:shadow-outline mb-1'
                            name="lastContactDate"
                            defaultValue={friend ? friend.LastContactDate : null}
                            id="lastContact"
                            type="date" />
                        <br />
                        <label className='mr-2 text-stone-400 font-bold' htmlFor="categories">Category</label>
                        <select
                            className='shadow appearance-none border rounded py-2 px-3 bg-stone-500 text-gray-950 leading-tight focus:outline-none focus:shadow-outline mb-1'
                            value={selectedCategory}
                            onChange={e => setSelectedCategory(e.target.value)}
                            name="categoryId"
                            id="categories">
                            {friendCategories.map(category => (
                                <option key={category.Id} value={category.Id}>{category.Name}</option>
                            ))}
                        </select>

                    </div>
                    <br />
                    <div>
                        <button
                            className='
                        bg-yellow-600 hover:bg-yellow-900  text-white font-bold py-2 px-4 rounded m-2'
                            type="submit">{friend ? "Edit" : "Create"}</button>
                        <button className=' text-white bg-amber-700 hover:bg-amber-800 font-bold py-2 px-4 rounded'
                            type="button" onClick={() => handleClose()}>Cancel</button>
                    </div>
                </form>
            </section>
        </div>
    );
}
