import AddIcon from '@mui/icons-material/Add';
import Box from "@mui/material/Box"
import Fab from "@mui/material/Fab"

export const AddFriendModal = () => {
  return (
    <Box sx={{ '& > :not(style)': { m: 5, position: "fixed", top: 0, right: 0, zIndex: 2000 } }}>
      <Fab color="secondary" aria-label="add">
        <AddIcon />
      </Fab>
    </Box>  
  )
}