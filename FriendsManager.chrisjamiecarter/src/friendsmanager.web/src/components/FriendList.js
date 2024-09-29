import React from 'react';
import { useSelector } from 'react-redux';
import FriendCard from './FriendCard';

const FriendList = () => {
  const friends = useSelector((state) => state.friends.data);

  return (
    <div className='friends-container'>
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
        {friends && friends.map((friend) => (
          <FriendCard key={friend.id} friend={friend} />
        ))}
      </div>
    </div>
  )
}

export default FriendList;
