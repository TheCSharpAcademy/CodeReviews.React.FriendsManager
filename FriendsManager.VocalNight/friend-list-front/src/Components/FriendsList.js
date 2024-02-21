import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchFriendsList, removeFriend } from "../Slices/friendsSlice";
import { fetchCategoriesList } from "../Slices/categoriesSlice";
import { addDays, parseISO } from 'date-fns';
import FriendModal from "./FriendModal";
import Modal from 'react-modal'



export default function FriendsList() {
    const [showFriendsMod, setShowFriendsMod] = useState(false);
    const [currentFriend, setCurrentFriend] = useState(null);

    const dispatch = useDispatch();
    const friends = useSelector((state) => state.friends.friends);
    const loading = useSelector((state) => state.friends.loading);
    const error = useSelector((state) => state.friends.error);

    const categories = useSelector((state) => state.categories.categories);
    const loadingCategories = useSelector((state) => state.categories.loading);
    const errorCategories = useSelector((state) => state.categories.error);

    useEffect(() => {
        if (categories.length === 0) {
            dispatch(fetchCategoriesList());
        }
        if (friends.length === 0) {
            dispatch(fetchFriendsList());
        }
    }, [])

    const editItem = (friend) => {
        setCurrentFriend(friend);
        setShowFriendsMod(true);
    }

    const addItem = () => {
        setCurrentFriend(null);
        setShowFriendsMod(true);
    }

    const deleteItem = async (id) => {
        await dispatch(removeFriend(id));
    }

    const calculateDate = (friend) => {

        var parsedDate = parseISO(friend.LastContactDate);
        var newDate = addDays(parsedDate, parseInt(friend.DesiredContactFrequency));

        console.log(newDate);
        console.log(new Date());

        console.log(new Date() >= newDate);

        if (new Date() >= newDate) {
            return 'Contact your friend!'
        }

        return 'No action needed.'
    }

    return (
        <>
            <div>
                {loading || loadingCategories ? (
                    <p>loading friends and categories...</p>
                ) : error || errorCategories ? (
                    <p>Error loading your friends: {error}</p>
                ) : (
                    <table data-testid="friendTable">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Last Contact Date</th>
                                <th>Friend Category</th>
                                <th>Desired Contact Frequency (Days)</th>
                                <th>Necessary action/contact</th>
                            </tr>
                        </thead>
                        <tbody>

                            {friends.map(friend => (
                                <tr key={friend.Id}>
                                    <td>{friend.Name}</td>
                                    <td>{friend.LastContactDate}</td>
                                    <td>{categories.find(c => c.Id === friend.CategoryId).Name}</td>
                                    <td>{friend.DesiredContactFrequency}</td>
                                    <td>{calculateDate(friend)}</td>
                                    <td>
                                        <button
                                            type="button"
                                            onClick={() => editItem(friend)}
                                            className="bg-yellow-600 hover:bg-yellow-900 text-white font-bold py-2 px-4 rounded"
                                        >Edit</button></td>
                                    <td>
                                        <button
                                            type="button"
                                            onClick={() => deleteItem(friend.Id)}
                                            className="bg-amber-700 hover:bg-amber-800 text-white font-bold py-2 px-4 rounded">Delete</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
                <Modal className="modal" ariaHideApp={false} isOpen={showFriendsMod}>
                    <FriendModal
                        handleClose={() => setShowFriendsMod(false)}
                        friendCategories={categories}
                        friend={currentFriend} />
                </Modal>
                <div className="pt-1">
                    <button type="button" className=" bg-amber-700 hover:bg-amber-800 text-white font-bold py-2 px-4 rounded" onClick={() => addItem()}>New Friend</button>
                </div>
            </div>
        </>
    );
}
