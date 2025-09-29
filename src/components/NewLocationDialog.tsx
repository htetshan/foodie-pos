import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import React, { Dispatch, SetStateAction } from "react";
import AppSnackBar from "./AppSnackBar";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useRouter } from "next/router";
import { LocationType } from "@/types/location";
import { createLocation } from "@/store/slices/locationSlice";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  newLocation: LocationType;
  setNewLocation: Dispatch<SetStateAction<LocationType>>;
}
const NewLocationDialog = ({
  open,
  setOpen,
  newLocation,
  setNewLocation,
}: Props) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { company } = useAppSelector((state) => state.company);

  const handleCreateLocation = () => {
    //if (!newLocation.name) return alert("Name is required");
    console.log("create work ", newLocation);
    dispatch(createLocation({ ...newLocation }));
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
        <DialogTitle>Create Location</DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <TextField
              placeholder="location name"
              sx={{ p: 1 }}
              value={newLocation.name || ""}
              onChange={(event) =>
                setNewLocation({
                  ...newLocation,
                  name: event.target.value,
                })
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
              onClick={handleCreateLocation}
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

export default NewLocationDialog;
