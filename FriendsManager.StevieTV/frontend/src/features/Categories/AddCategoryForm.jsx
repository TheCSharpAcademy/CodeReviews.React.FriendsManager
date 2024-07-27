import React, { useState } from 'react';
import { useAddCategoryMutation } from 'features/api/apiSlice';
import SendIcon from '@mui/icons-material/Send';
import { Stack, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

export const AddCategoryForm = ({ handleClose }) => {
  const [categoryName, setCategoryName] = useState('');

  const [addCategory] = useAddCategoryMutation();
  const [error, setError] = useState('');
  const onCategoryNameChanged = (e) => setCategoryName(e.target.value);

  const canSave = [categoryName].every(Boolean);

  const onAddCategoryClicked = async() => {
    if (canSave) {
      try {
        await addCategory({
          name: categoryName
        }).unwrap();
        setCategoryName('');
        console.log('calling handle close');
        handleClose();
      } catch (err) {
        console.log('failed to add category', err);
        setError(err.data);
      }
    }
  };

  return (

    <Box component="section" sx={{ maxWidth: 300, margin: 5, gap: 2 }}>
      <h2>Add a New Category</h2>
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
          value={categoryName}
          onChange={onCategoryNameChanged}
          sx={{ margin: 2 }}
          required={true}
          error={error !== ''}
        />
        {error && (
          <div className="error">{error}</div>
        )}
        <Button variant="contained"
          onClick={onAddCategoryClicked}
          disabled={!canSave} endIcon={<SendIcon />}
        >
          Add Category
        </Button>
      </Stack>
    </Box>
  );
};
