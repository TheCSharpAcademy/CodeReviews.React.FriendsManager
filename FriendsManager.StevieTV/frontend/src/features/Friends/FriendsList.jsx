import React from 'react';
import classnames from 'classnames';
import { useGetFriendsQuery } from 'features/api/apiSlice.js';
import { AddFriendModal } from 'features/Friends/AddFriendModal.jsx';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';

import './FriendsList.css';

function stringToColor(string) {
  let hash = 0;
  let i = 0;

  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + (hash * Math.pow(2,5));
    hash = hash && hash;
  }
  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = Math.floor(hash / Math.pow(256, i)) % 256;
    color += `00${value.toString(16)}`.slice(-2);
  }
  return color;
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name)
    },
    children: `${name.split(' ')[0][0]}${name.split(' ')[1] ? name.split(' ')[1][0] : ''}`
  };
}

const FriendEntry = ({ friend }) => {
  return (
    <React.Fragment>
      <Box className="friend-entry">
        <Card
          variant="outlined"
          className="friend-card"
          sx={{ borderRadius: 5 }}
        >
          <CardHeader
            avatar={
              <Avatar {...stringAvatar(friend.name)} />
            }
            title={friend.name}
          />
          <CardContent>
            <dl>
              <dt>Last Contact Date</dt>
              <dd>{friend.lastContactDate}</dd>
              <dt>Last Contact Type</dt>
              <dd>{friend.lastContactType}</dd>
              <dt>Contact Frequency</dt>
              <dd>{friend.desiredContactFrequency}</dd>
              <dt>Category</dt>
              <dd>{friend.category.name}</dd>
            </dl>
          </CardContent>
        </Card>
      </Box>
    </React.Fragment>
  );
};


export const FriendsList = () => {

  const {
    data: friends = [],
    isLoading,
    isFetching,
    isSuccess,
    isError,
    error
  } = useGetFriendsQuery();

  let content = '' ;

  if (isLoading) {
    content = 'LOADING...';
  } else if (isSuccess) {

    const containerClassname = classnames('friends-container', {
      disabled: isFetching
    });

    content = (<div className={containerClassname}>{friends.map((friend) => (
      <FriendEntry key={friend.id} friend={friend} />
    ))
    }</div>);
  } else if (isError) {
    content = <div>{error.toString()}</div>;
  }

  return (
    <section>
    <section className="friends-list">
      <h2>Friends</h2>
      {content}
    </section>
    <AddFriendModal />
    </section>
);
};
