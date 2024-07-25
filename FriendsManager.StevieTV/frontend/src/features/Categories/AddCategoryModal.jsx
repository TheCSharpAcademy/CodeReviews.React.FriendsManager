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
  const [formOpen, setFormOpen] = useState(false);
  const handleClickOpen = () => {
    setFormOpen(true);
  };
  const handleClose = () => {
    setFormOpen(false);
  };

  const addCategoryForm = (
      <Dialog
        open={formOpen}
        onClose={handleClose}
      >
        <DialogContent>
          <AddCategoryForm
            handleClose={handleClose}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
  );


  return (
    <section>
      <Box sx={{ '& > :not(style)': { m: 5, position: 'fixed', top: 0, right: 0, zIndex: 2000 } }}>
        <Fab color="secondary" aria-label="add"
          onClick={handleClickOpen}
        >
          <AddIcon />
        </Fab>
      </Box>
      {addCategoryForm}
    </section>
  );
};
