import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from "@mui/material";
import React, { Dispatch, SetStateAction } from "react";
import { MenuType } from "../types/menu";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { createMenu } from "../store/slices/menuSlice";
import { setSnackbar } from "../store/slices/appSnackbarSlice";
import AppSnackBar from "./AppSnackBar";
import { MenuCategory } from "@prisma/client";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  newMenu: MenuType;
  setNewMenu: Dispatch<SetStateAction<MenuType>>;
}
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const NewMenuDialog = ({ open, setOpen, newMenu, setNewMenu }: Props) => {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((store) => store.menus);
  const { menuCategories } = useAppSelector((store) => store.menuCategories);
  const { menuCategoryMenus } = useAppSelector(
    (state) => state.menuCategoryMenu
  );
  /*   const menuCategoryMenuIds = menuCategoryMenus.map(
    (item) => item.menuCategoryId
  ); */
  const handleOnClick = () => {
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
    console.log(newMenu);

    //return console.log("go to create api");

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
    //setNewMenu({ name: "", price: 0 ,});
    setOpen(false);
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
                  handleOnClick();
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

            <Box sx={{}}>
              <FormControl sx={{ width: "100%" }}>
                <InputLabel id="demo-multiple-checkbox-label">
                  Menu Category
                </InputLabel>
                <Select
                  multiple
                  value={newMenu.menuCategoryIds}
                  onChange={(eve) => {
                    const selectedValue = eve.target.value as number[];
                    setNewMenu({ ...newMenu, menuCategoryIds: selectedValue });
                  }}
                  input={<OutlinedInput label="Menu Category" />}
                  renderValue={() => {
                    /*  const test=menuCategories.filter(itemId=>selected.includes(itemId.id))as MenuCategory[]
                    return test.map(item=>item.name).join(", ") */
                    const selectedMenuCategories = newMenu.menuCategoryIds.map(
                      (selectedId) =>
                        menuCategories.find(
                          (item) => item.id === selectedId
                        ) as MenuCategory
                    );
                    return selectedMenuCategories
                      .map((item) => item.name)
                      .join(", ");
                  }}
                  /*   renderValue={(selected) => {
                    const selectedMenuCategories = selected.filter(
                      (selectedId) =>
                        menuCategories.find((item) => item.id === selectedId)
                    );
                    return selectedMenuCategories
                      .map((item) => item.name)
                      .join(", ");
                  }} */
                  MenuProps={MenuProps}
                >
                  {menuCategories.map((item) => (
                    <MenuItem key={item.name} value={item.id}>
                      <Checkbox
                        checked={newMenu.menuCategoryIds.includes(item.id)}
                      />
                      <ListItemText primary={item.name} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
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
