import React, { useState } from 'react';
import dayjs from 'dayjs';
import { EditFriendForm } from 'features/Friends/EditFriendForm';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

export const FriendEntry = ({ friend }) => {
  const [formOpen, setFormOpen] = useState(false);
  const isOverdue = dayjs(friend.lastContactDate, 'YYYY-MM-DD').add(friend.desiredContactFrequency, 'day').isBefore(dayjs().startOf('day'));

  const handleClickOpen = () => {
    setFormOpen(true);
  };
  const handleClose = () => {
    setFormOpen(false);
  };

  function stringToColor(string) {
    let hash = 0;

    for (let i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + (hash * Math.pow(2, 5));
      hash = hash && hash;
    }
    let color = '#';

    for (let i = 0; i < 3; i += 1) {
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

  const editFriendForm = (
    <Dialog
      open={formOpen}
      onClose={handleClose}
    >
      <DialogContent>
        <EditFriendForm
          friend={friend}
          handleClose={handleClose}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );


  return (
    <React.Fragment>
      <Box className="friend-entry" onClick={handleClickOpen}>
        <Card
          variant="outlined"
          className="friend-card"
          sx={[
            { borderRadius: 5 },
            isOverdue && { borderColor: 'Red' }
          ]}
        >
          <CardHeader
            avatar={
              <Avatar {...stringAvatar(friend.name)} />
            }
            title={friend.name}
            titleTypographyProps={{ fontSize: 20 }}
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
      {editFriendForm}
    </React.Fragment>
  );
};
