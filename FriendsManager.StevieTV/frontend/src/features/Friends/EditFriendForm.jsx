import React, { useState } from 'react';
import dayjs from 'dayjs';
import { useDeleteFriendMutation, useEditFriendMutation, useGetCategoriesQuery } from 'features/api/apiSlice';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import SendIcon from '@mui/icons-material/Send';
import {
  DialogContentText,
  DialogTitle,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField
} from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

export const EditFriendForm = ({ friend, handleClose }) => {
  const [friendName, setFriendName] = useState(friend.name);
  const [desiredContactFrequency, setDesiredContactFrequency] = useState(friend.desiredContactFrequency);
  const [lastContactDate, setLastContactDate] = useState(dayjs(friend.lastContactDate, 'YYYY-MM-DD'));
  const [lastContactType, setLastContactType] = useState(friend.lastContactType);
  const [category, setCategory] = useState(friend.categoryId);

  const [editFriend] = useEditFriendMutation();
  const [deleteFriend] = useDeleteFriendMutation();

  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const handleDeleteClickOpen = () => {
    setDeleteConfirmOpen(true);
  };

  const handleDeleteClose = () => {
    setDeleteConfirmOpen(false);
  };

  const onFriendNameChanged = (e) => setFriendName(e.target.value);
  const onLastContactTypeChanged = (e) => setLastContactType(e.target.value);
  const onDesiredContactFrequencyChanged= (e) => setDesiredContactFrequency(e.target.value);
  const onCategoryChanged = (e) => setCategory(e.target.value);

  const canSave = [friendName, desiredContactFrequency, lastContactDate, lastContactType, category].every(Boolean);

  const onEditFriendClicked = async() => {
    if (canSave) {
      try {
        await editFriend({
          id: friend.id,
          name: friendName,
          desiredContactFrequency,
          lastContactDate: lastContactDate.format('YYYY-MM-DD'),
          lastContactType,
          categoryId: category
        }).unwrap();
      } catch (err) {
        console.log('failed to edit friend', err);
      } finally {
        handleClose();
      }
    }
  };

  const onDeleteFriendConfirmed = async() => {
    try {
      await deleteFriend({
        id: friend.id
      }).unwrap();
    } catch (err) {
      console.log('failed to delete friend', err);
    } finally {
      handleDeleteClose();
    }
  };

  const {
    data: categories,
    isLoading: categoriesLoading
  } = useGetCategoriesQuery();

  return (
    categoriesLoading ?
      'Loading...' :
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box component="section" sx={{ maxWidth: 300, margin: 5, gap: 2 }}>
        <h2>Edit Friend</h2>
        <Stack
          component="form"
          sx={{
            width: '25ch'
          }}
          spacing={2}
          autoComplete="off"
        >
          <TextField
            id="name"
            label="Name"
            value={friendName}
            onChange={onFriendNameChanged}
            sx={{ margin: 2 }}
            required={true}
          />
          <DatePicker
            label="Last contact"
            value={lastContactDate}
            onChange={(newLastContactDate) => setLastContactDate(newLastContactDate)}
            sx={{ margin: 2 }}
          />
          <TextField
            id="lastContactType"
            label="Last contact type"
            value={lastContactType}
            onChange={onLastContactTypeChanged}
            sx={{ margin: 2 }}
            required={true}
          />
          <TextField
            id="desiredContactFrequency"
            label="Desired Contact Frequency"
            value={desiredContactFrequency}
            onChange={onDesiredContactFrequencyChanged}
            type="number"
            min={0}
            max={365}
            InputProps={{
              endAdornment: <InputAdornment position="start">days</InputAdornment>
            }}
            sx={{ margin: 2 }}
            required={true}
          />
          <FormControl fullWidth={true} sx={{ margin: 2 }}>
            <InputLabel id="categoryLabel">Category</InputLabel>
            <Select
              id="category"
              label="Category"
              value={category}
              onChange={onCategoryChanged}
            >
              {categories.map((categoryOption) => (
                <MenuItem value={categoryOption.id} key={categoryOption.id}>
                  {categoryOption.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button variant="contained" onClick={onEditFriendClicked}
            disabled={!canSave} endIcon={<SendIcon />}
          >
            Edit Friend
          </Button>
          <Button variant="contained" onClick={handleDeleteClickOpen}
            disabled={!canSave} endIcon={<DeleteForeverIcon />}
            color="error"
          >
            Delete Friend
          </Button>
        </Stack>
      </Box>

      <Dialog
        open={deleteConfirmOpen}
        onClose={handleDeleteClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {`Really Delete ${friendName}`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this friend?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteClose}>Cancel</Button>
          <Button onClick={onDeleteFriendConfirmed}>Confirm</Button>
        </DialogActions>
      </Dialog>

    </LocalizationProvider>
  );
};
