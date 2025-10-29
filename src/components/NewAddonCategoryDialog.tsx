import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  TextField,
} from "@mui/material";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setSnackbar } from "../store/slices/appSnackbarSlice";
import AppSnackBar from "./AppSnackBar";
import MultiSelect from "./MultiSelect";
import { CreateAddonCategoryParam } from "@/types/addonCategory";
import { createAddonCategory } from "@/store/slices/addonCategorySlice";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  newAddonCategory: CreateAddonCategoryParam;
  setNewAddonCategory: Dispatch<SetStateAction<CreateAddonCategoryParam>>;
}

const NewAddonCategoryDialog = ({
  open,
  setOpen,
  newAddonCategory,
  setNewAddonCategory,
}: Props) => {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((store) => store.addonCategory);
  const [selected, setSelected] = useState<number[]>([]);
  const { menus } = useAppSelector((store) => store.menus);

  const handleCreateMenu = () => {
    // Validate newAddonCategory.name
    if (!newAddonCategory.name) {
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
      createAddonCategory({
        ...newAddonCategory,
        /*    onSuccess: () => {
          dispatch(
            setSnackbar({
              message: "Addon category created successfully.",
              outComeType: "success",
              openType: true,
            })
          );
        },
        onError: () => {
          dispatch(
            setSnackbar({
              message: "Failed to create addon category. Please try again.",
              outComeType: "error",
              openType: true,
            })
          );
        }, */
      })
    );

    setOpen(false);
  };
  useEffect(() => {
    setNewAddonCategory({ ...newAddonCategory, menuIds: selected });
  }, [selected]);
  return (
    <Dialog
      open={open}
      onClose={() => {
        setOpen(false);
      }}
    >
      <Box sx={{ width: 350 }}>
        <DialogTitle>Create Addon Category</DialogTitle>
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
              id="addon category"
              placeholder="Addon Category Name"
              sx={{ width: "100%", mb: 1 }}
              value={newAddonCategory.name || ""}
              onChange={(event) =>
                setNewAddonCategory({
                  ...newAddonCategory,
                  name: event.target.value,
                })
              }
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  handleCreateMenu();
                }
              }}
            />

            <MultiSelect
              title="Menu"
              selected={selected}
              setSelected={setSelected}
              itemCatalog={menus}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={newAddonCategory.isRequired}
                  onChange={(event) => {
                    setNewAddonCategory({
                      ...newAddonCategory,
                      isRequired: event.target.checked,
                    });
                  }}
                />
              }
              label="isRequired"
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

export default NewAddonCategoryDialog;
