import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from "react-router-dom";
import { updateFriendThunk } from '../redux/friendsSlice';

const EditFriendForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const categories = useSelector((state) => state.categories.data);
  const friends = useSelector((state) => state.friends.data);

  const { id } = useParams();
  const getFriend = () => {
    const index = friends.findIndex(friend => friend.id === id);
    if (index !== -1) {
      return friends[index];
    }
  }
  const friend = getFriend();

  const [formData, setFormData] = useState({
    name: friend.name,
    categoryid: friend.category.id,
    desiredContactFrequency: friend.desiredContactFrequency,
  });

  if (!friend) {
    return (
      <div className="w-full text-white bg-red-500">
        <div className="container flex items-center justify-center px-6 py-4 mx-auto">
          <svg viewBox="0 0 40 40" className="w-6 h-6 fill-current">
            <path d="M20 3.33331C10.8 3.33331 3.33337 10.8 3.33337 20C3.33337 29.2 10.8 36.6666 20 36.6666C29.2 36.6666 36.6667 29.2 36.6667 20C36.6667 10.8 29.2 3.33331 20 3.33331ZM21.6667 28.3333H18.3334V25H21.6667V28.3333ZM21.6667 21.6666H18.3334V11.6666H21.6667V21.6666Z" />
          </svg>

          <p className="mx-3">Invalid friend ID</p>
        </div>
      </div>
    );
  }

  const handleCancel = () => {
    navigate('/');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform validation.
    if (!formData.name || !formData.categoryid || !formData.desiredContactFrequency) {
      alert('Please fill out all fields');
      return;
    }

    const request = {};
    request.id = friend.id;
    request.name = formData.name;
    request.desiredContactFrequency = formData.desiredContactFrequency;
    request.lastContactDate = friend.lastContactDate;
    request.lastContactType = friend.lastContactType;
    request.categoryId = formData.categoryid;

    dispatch(updateFriendThunk(request));
    navigate('/');
  };

  return (
    <section className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md">

      <h2 className="text-lg font-semibold text-gray-700 capitalize">Edit Friend</h2>

      <form onSubmit={handleSubmit}>

        <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
          <div className='col-span-full'>
            <label className="text-gray-700" htmlFor="name">Name</label>
            <input id="name" type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Friend's Name" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring" />
          </div>

          <div>
            <label className="text-gray-700" htmlFor="category">Category</label>
            <select id='category' name="categoryid" value={formData.categoryid} onChange={handleChange} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring">
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-gray-700" htmlFor="desiredContactFrequency">Desired Contact Frequency</label>
            <input id="desiredContactFrequency" type="number" name="desiredContactFrequency" value={formData.desiredContactFrequency} onChange={handleChange} placeholder="Contact Frequency (days)" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring" />
          </div>

        </div>

        <div className="flex gap-1 mt-6">
          <button type="submit" className="w-28 px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">Edit</button>
          <button type='button' onClick={handleCancel} className="w-28 px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-500 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">Cancel</button>
        </div>

      </form>

    </section>
  );
};

export default EditFriendForm;
