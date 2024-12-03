import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { MenuType } from "../types/menu";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { createMenu } from "../store/slices/menuSlice";
import { setSnackbar } from "../store/slices/appSnackbarSlice";
import AppSnackBar from "./AppSnackBar";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const NewMenuDialog = ({ open, setOpen }: Props) => {
  const [newMenu, setNewMenu] = useState<MenuType>({ name: "", price: 0 });
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((store) => store.menus);
  const handleOnClick = () => {
    dispatch(
      createMenu({
        ...newMenu,
        onSuccess() {
          dispatch(
            setSnackbar({ message: "is ok now", outComeType: "success" })
          );
        },
        onError() {
          dispatch(
            setSnackbar({ message: "is not ok now", outComeType: "error" })
          );
        },
      })
    );
  };
  return (
    <Dialog
      open={open}
      onClose={() => {
        setOpen(false);
      }}
    >
      <Box sx={{ width: 350 }}>
        <DialogTitle>Create Menu</DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <TextField
              placeholder="menu name"
              sx={{ p: 1 }}
              onChange={(event) =>
                setNewMenu({ ...newMenu, name: event.target.value })
              }
            />
            <TextField
              type="number"
              placeholder="price"
              sx={{ p: 1 }}
              onChange={(event) =>
                setNewMenu({ ...newMenu, price: Number(event.target.value) })
              }
            />
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
              {isLoading ? <CircularProgress /> : "Create"}
            </Button>
          </DialogActions>
        </DialogContent>
        <AppSnackBar />
      </Box>
    </Dialog>
  );
};

export default NewMenuDialog;
