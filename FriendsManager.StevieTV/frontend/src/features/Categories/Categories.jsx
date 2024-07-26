import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDeleteCategoryMutation, useGetCategoriesQuery } from 'features/api/apiSlice';
import { AddCategoryModal } from 'features/Categories/AddCategoryModal.jsx';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { DialogContentText, DialogTitle } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';

export const Categories = () => {

  const {
    data: categories,
    isLoading: categoriesLoading
  } = useGetCategoriesQuery();

  const [deleteCategory] = useDeleteCategoryMutation();

  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);

  const [chosenCategory, setChosenCategory] = useState('');
  const handleDeleteClickOpen = (category) => {
    setChosenCategory(category);
    setDeleteConfirmOpen(true);
  };

  const handleDeleteClose = () => {
    setDeleteConfirmOpen(false);
  };

  const onDeleteCategoryConfirmed = async() => {
    try {
      await deleteCategory({
       id: chosenCategory.id
      }).unwrap();
    } catch (err) {
      console.log('failed to delete category', err);
    } finally {
      handleDeleteClose();
    }
  };


  return (
    categoriesLoading ?
      'Loading...' :
      <div className="categories">
        <h2>Categories</h2>
        <div className="categories-list-container">
            {categories.map((category) => (
              <div key={category.id} className="categories-list-item">
                <Link className="categories-list-link" to={`/category/${category.id}`}>{category.name}</Link>
                <IconButton aria-label="delete" onClick={() => { handleDeleteClickOpen(category); }}
                  className="categories-list-button"
                >
                  <DeleteForeverIcon />
                </IconButton>
              </div>
            ))
            }
            </div>
        <AddCategoryModal />

        <Dialog
          open={deleteConfirmOpen}
          onClose={handleDeleteClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {`Really Delete ${chosenCategory.name}`}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to delete this category?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDeleteClose}>Cancel</Button>
            <Button onClick={onDeleteCategoryConfirmed}>Confirm</Button>
          </DialogActions>
        </Dialog>

      </div>
  );
};
