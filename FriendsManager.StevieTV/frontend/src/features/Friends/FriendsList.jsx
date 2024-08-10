import React from 'react';
import { Link, useParams } from 'react-router-dom';
import classnames from 'classnames';
import { useGetCategoriesQuery, useGetCategoryQuery, useGetFriendsQuery } from 'features/api/apiSlice.js';
import { AddFriendModal } from 'features/Friends/AddFriendModal.jsx';
import { FriendEntry } from 'features/Friends/FriendEntry.jsx';

import './FriendsList.css';


export const FriendsList = () => {

  const { categoryId } = useParams();

  const {
    data: friends = [],
    isLoading: isFriendsLoading,
    isFetching,
    isSuccess,
    isError,
    error
  } = useGetFriendsQuery();

  const {
    data: categories =[],
    isLoading: isCategoriesLoading
  } = useGetCategoriesQuery();

  const {
    data: currentCategory = []
  } = useGetCategoryQuery(categoryId);

  const isLoading = isFriendsLoading && isCategoriesLoading;

  const containerClassname = classnames('friends-container', {
    disabled: isFetching
  });

  const chosenCategory = categoryId ? ` - ${currentCategory.name}` : '';

  return (
    <section>
      <section className="friends-list">
        <h2>Friends{chosenCategory}</h2>
        {
          isLoading &&
          'Loading...'

        }
        {
          isError && (
            <div>{error.status} - {error.error}</div>
          )
        }
        {
          isSuccess && categoryId && (
            <div className={containerClassname}>{
              friends.filter((friend) => friend.category.id.toString() === categoryId)
                .map((friend) => (
              <FriendEntry key={friend.id} friend={friend} />
            ))
            }
            </div>
          )
        }
        {
          categories.length === 0 && (
            <h3>You have no friends categories, please go to the <Link to="/categories">categories</Link> page and add one.</h3>
          )
        }
        {
          categories.length > 0 && friends.length === 0 && (
            <h3>You have no friends, please add one.</h3>

          )
        }
        {
          isSuccess && !categoryId && (
          <div className={containerClassname}>{
        friends.map((friend) => (
            <FriendEntry key={friend.id} friend={friend} />
          ))
      }
      </div>
      )
        }
      </section>
      <AddFriendModal />
    </section>
  );
};
