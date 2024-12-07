import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import React from "react";
import AppSnackBar from "./AppSnackBar";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const NewMenuCategoryDialog = ({ open, setOpen }: Props) => {
  const handleOnClick = () => {};
  return (
    <Dialog
      open={open}
      onClose={() => {
        setOpen(false);
      }}
    >
      <Box sx={{ width: 350 }}>
        <DialogTitle>Create Menu Category</DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography>new menu category </Typography>
            {/*             jfjfl
             */}{" "}
          </Box>
          <DialogActions>
            <Button
              onClick={() => {
                setOpen(false);
              }}
            >
              Cancel{" "}
            </Button>
            <Button
              sx={{ width: 40, height: 35 }}
              variant="contained"
              onClick={handleOnClick}
            >
              Create
            </Button>
          </DialogActions>
        </DialogContent>
        <AppSnackBar />
      </Box>
    </Dialog>
  );
};

export default NewMenuCategoryDialog;
