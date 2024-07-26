import React, { useState } from 'react';
import { AddCategoryForm } from 'features/Categories/AddCategoryForm';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Fab from '@mui/material/Fab';

export const AddCategoryModal = () => {
  const [categoryFormOpen, setCategoryFormOpen] = useState(false);
  const handleCategoryAddOpen = () => {
    setCategoryFormOpen(true);
  };
  const handleAddCategoryClose = () => {
    console.log('handlingClose');
    setCategoryFormOpen(false);
  };

  const addCategoryForm = (
      <Dialog
        open={categoryFormOpen}
        onClose={handleAddCategoryClose}
      >
        <DialogContent>
          <AddCategoryForm
            handleClose={handleAddCategoryClose}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddCategoryClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
  );


  return (
    <section>
      <Box sx={{ '& > :not(style)': { m: 5, position: 'fixed', top: 0, right: 0, zIndex: 2000 } }}>
        <Fab color="secondary" aria-label="add"
          onClick={handleCategoryAddOpen}
        >
          <AddIcon />
        </Fab>
      </Box>
      {addCategoryForm}
    </section>
  );
};
