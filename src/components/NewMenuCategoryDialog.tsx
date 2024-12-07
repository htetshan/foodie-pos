import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  FormGroup,
  TextField,
} from "@mui/material";
import React, { Dispatch, SetStateAction } from "react";
import AppSnackBar from "./AppSnackBar";
import { MenuCategoryType } from "@/types/menuCategory";
import { useAppDispatch } from "@/store/hooks";
import { addMenuCategory } from "@/store/slices/menuCategorySlice";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  newMenuCatgory: MenuCategoryType;
  setNewMenuCatgory: Dispatch<SetStateAction<MenuCategoryType>>;
}
const NewMenuCategoryDialog = ({
  open,
  setOpen,
  newMenuCatgory,
  setNewMenuCatgory,
}: Props) => {
  const dispatch = useAppDispatch();
  const handleOnClick = () => {
    console.log(newMenuCatgory);
    dispatch(addMenuCategory(newMenuCatgory));
    setNewMenuCatgory({ name: "", isAvailable: true });
  };
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
            <TextField
              placeholder="menu category name"
              sx={{ p: 1 }}
              value={newMenuCatgory.name || ""}
              onChange={(event) =>
                setNewMenuCatgory({
                  ...newMenuCatgory,
                  name: event.target.value,
                })
              }
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  handleOnClick();
                }
              }}
            />
            <FormGroup sx={{ p: 1 }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={newMenuCatgory.isAvailable}
                    onChange={(event) => {
                      setNewMenuCatgory({
                        ...newMenuCatgory,
                        isAvailable: event.target.checked,
                      });
                    }}
                  />
                }
                label="isAvailable"
              />
            </FormGroup>
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
