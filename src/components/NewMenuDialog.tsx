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
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setSnackbar } from "../store/slices/appSnackbarSlice";
import AppSnackBar from "./AppSnackBar";
import { NewMenuPayload } from "@/types/menu";
import MultiSelect from "./MultiSelect";
import { uploadAsset } from "@/store/slices/appSlice";
import FileDropZone from "./FileDropZone";
import { createMenu } from "@/store/slices/menuSlice";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  newMenu: NewMenuPayload;
  setNewMenu: Dispatch<SetStateAction<NewMenuPayload>>;
}

const NewMenuDialog = ({ open, setOpen, newMenu, setNewMenu }: Props) => {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((store) => store.menus);
  const [selected, setSelected] = useState<number[]>([]);
  const [menuImage, setMenuImage] = useState<File[]>([]);

  const { menuCategories } = useAppSelector((store) => store.menuCategories);
  const { menuCategoryMenus } = useAppSelector(
    (state) => state.menuCategoryMenu
  );
  /*   const menuCategoryMenuIds = menuCategoryMenus.map(
    (item) => item.menuCategoryId
  ); */

  const handleCreateMenu = () => {
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
    if (menuImage) {
      dispatch(
        uploadAsset({
          file: menuImage[0],
          onSuccess: (assetUrl) => {
            newMenu.assetUrl = assetUrl;
            createMenu({ ...newMenu });
          },
        })
      );
    }
    // Dispatch createMenu with callbacks
    /*  dispatch(
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
    ); */

    // Reset newMenu state
    //setNewMenu({ name: "", price: 0 ,});
    setOpen(false);
  };
  useEffect(() => {
    setNewMenu({ ...newMenu, menuCategoryIds: selected });
  }, [selected]);
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
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              // bgcolor: "red",
              width: 300,
            }}
          >
            <TextField
              placeholder="menu name"
              sx={{ width: "100%", mb: 1 }}
              value={newMenu.name || ""}
              onChange={(event) =>
                setNewMenu({ ...newMenu, name: event.target.value })
              }
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  handleCreateMenu();
                }
              }}
            />

            <TextField
              type="number"
              placeholder="price"
              sx={{ width: "100%", mb: 1 }}
              value={newMenu.price || ""}
              onChange={(event) =>
                setNewMenu({ ...newMenu, price: Number(event.target.value) })
              }
            />

            <MultiSelect
              title="Menu Category"
              selected={selected}
              setSelected={setSelected}
              itemCatalog={menuCategories}
            />
          </Box>
          <FileDropZone
            onDrop={(files) => {
              setMenuImage(files);
            }}
          />
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
              onClick={handleCreateMenu}
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
