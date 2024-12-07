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
import React, { Dispatch, SetStateAction } from "react";
import { MenuType } from "../types/menu";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { createMenu } from "../store/slices/menuSlice";
import { setSnackbar } from "../store/slices/appSnackbarSlice";
import AppSnackBar from "./AppSnackBar";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  newMenu: MenuType;
  setNewMenu: Dispatch<SetStateAction<MenuType>>;
}
const NewMenuDialog = ({ open, setOpen, newMenu, setNewMenu }: Props) => {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((store) => store.menus);
  const handleOnClick = () => {
    console.log(newMenu);

    // Validate newMenu.name
    if (!newMenu.name) {
      dispatch(
        setSnackbar({
          message: "Menu name is required. Please provide a valid name.",
          outComeType: "error",
          openType: true,
        })
      );
      setOpen(true);

      return;
    }

    // Dispatch createMenu with callbacks
    dispatch(
      createMenu({
        ...newMenu,
        onSuccess: () => {
          dispatch(
            setSnackbar({
              message: "Menu created successfully.",
              outComeType: "success",
              openType: true,
            })
          );
        },
        onError: () => {
          dispatch(
            setSnackbar({
              message: "Failed to create menu. Please try again.",
              outComeType: "error",
              openType: true,
            })
          );
        },
      })
    );

    // Reset newMenu state
    setNewMenu({ name: "", price: 0 });
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
              value={newMenu.name || ""}
              onChange={(event) =>
                setNewMenu({ ...newMenu, name: event.target.value })
              }
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  handleOnClick();
                }
              }}
            />
            <TextField
              type="number"
              placeholder="price"
              sx={{ p: 1 }}
              value={newMenu.price || ""}
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
              Cancel
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
