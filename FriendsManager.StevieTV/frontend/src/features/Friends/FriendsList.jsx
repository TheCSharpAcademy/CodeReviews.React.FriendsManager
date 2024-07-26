import React from 'react';
import { useParams } from 'react-router-dom';
import classnames from 'classnames';
import { useGetFriendsQuery } from 'features/api/apiSlice.js';
import { AddFriendModal } from 'features/Friends/AddFriendModal.jsx';
import { FriendEntry } from 'features/Friends/FriendEntry.jsx';

import './FriendsList.css';


export const FriendsList = () => {

  const { categoryId } = useParams();

  const {
    data: friends = [],
    isLoading,
    isFetching,
    isSuccess,
    isError,
    error
  } = useGetFriendsQuery();

  const containerClassname = classnames('friends-container', {
    disabled: isFetching
  });


  return (
    <section>
      <section className="friends-list">
        <h2>Friends</h2>
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
