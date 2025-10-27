import BackofficeLayout from "@/components/BackofficeLayout";
import DeleteDialog from "@/components/DeleteDialog";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setSelectedLocation } from "@/store/slices/appSlice";
import { deleteLocation, updateLocation } from "@/store/slices/locationSlice";
import {
  Box,
  Button,
  FormControlLabel,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { Location } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const LocationDetail = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const locationId = Number(router.query.id);
  const [open, setOpen] = useState<boolean>(false);
  const [editLocation, setEditLocation] = useState<Location>();
  const { locations } = useAppSelector((state) => state.locations);
  const { selectedLocation } = useAppSelector((state) => state.app);

  const location = locations.find((item) => item.id === locationId);

  useEffect(() => {
    if (location) {
      setEditLocation(location);
    }
  }, [location]);

  const handleUpdateLocation = () => {
    if (editLocation?.name === "") return null;
    const shouldUpdate = location?.name !== editLocation?.name;
    if (shouldUpdate) {
      editLocation && dispatch(updateLocation(editLocation));
      router.push("/backofficeapp/location");
    }
  };
  const handleDeleteLocation = () => {
    const isVaild = locations.find((item) => item.id === locationId);
    if (!isVaild) return alert("Cannot Delete");
    dispatch(deleteLocation({ id: locationId }));
    router.push("/backofficeapp/location");
  };

  if (!location)
    return (
      <BackofficeLayout>
        <Typography>Location not found</Typography>
      </BackofficeLayout>
    );
  return (
    <BackofficeLayout>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="contained"
          sx={{ bgcolor: "red" }}
          onClick={() => setOpen(true)}
        >
          Delete
        </Button>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          p: 2,
          width: 350,
        }}
      >
        <TextField
          sx={{ mb: 1 }}
          value={editLocation?.name}
          onChange={(eve) =>
            editLocation &&
            setEditLocation({
              ...editLocation,
              name: eve.target.value,
            })
          }
        />
        <FormControlLabel
          control={
            <Switch
              checked={selectedLocation?.id === locationId}
              onChange={() => {
                localStorage.setItem("selectedLocationId", String(location.id));
                dispatch(setSelectedLocation(location));
              }}
            />
          }
          label="Current Location"
        />
        <Button
          variant="contained"
          content="fixed"
          onClick={handleUpdateLocation}
        >
          Update
        </Button>
      </Box>
      <DeleteDialog
        open={open}
        setOpen={setOpen}
        title="Delete Location"
        content="Are you sure you want to delete this location?"
        handleDelete={handleDeleteLocation}
      />
    </BackofficeLayout>
  );
};

export default LocationDetail;
