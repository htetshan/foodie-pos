import DeleteDialog from "@/components/DeleteDialog";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  deleteMenuCategory,
  updateMenuCategory,
} from "@/store/slices/menuCategorySlice";
import { UpdateMenuCategoryType } from "@/types/menuCategory";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
const MenuCategoryDetail = () => {
  const [open, setOpen] = useState<boolean>(false);
  const router = useRouter();
  const { selectedLocation } = useAppSelector((state) => state.app);
  const { disableLocationMenuCategories } = useAppSelector(
    (state) => state.disableLocationMenuCategory
  );

  const [updateData, setUpdateData] = useState<UpdateMenuCategoryType>();
  const dispatch = useAppDispatch();
  const menuCategoryId = Number(router.query.id);
  const { menuCategories } = useAppSelector((state) => state.menuCategories);
  const menuCategory = menuCategories.find(
    (item) => item.id === menuCategoryId
  );

  const isAvailable = disableLocationMenuCategories.find(
    (item) =>
      item.menuCatgoryId === menuCategoryId &&
      item.locationId === selectedLocation?.id
  )
    ? false
    : true;

  useEffect(() => {
    if (menuCategory) {
      setUpdateData({
        ...menuCategory,
        isAvailable: isAvailable,
        selectedLocationId: selectedLocation?.id,
      });
    }
  }, [menuCategory, isAvailable]);

  const handleUpdateMenuCategory = () => {
    const shouldUpdate =
      menuCategory?.name !== updateData?.name || isAvailable !== undefined;
    if (shouldUpdate) {
      dispatch(updateMenuCategory({ ...updateData }));
      router.push("/backofficeapp/menu-category");
    }
  };

  const handleDeleteMenuCategory = () => {
    const valid = menuCategories.find((item) => item.id === menuCategoryId);
    if (!valid) return alert("Cannot delete");
    dispatch(deleteMenuCategory({ id: menuCategoryId }));
    setOpen(false);
    router.push("/backofficeapp/menu-category");
  };
  if (!updateData)
    return (
      <Box>
        <Typography>Menu Category not found</Typography>
      </Box>
    );

  return (
    <Box>
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
          width: 200,
        }}
      >
        <TextField
          value={updateData?.name}
          onChange={(eve) =>
            updateData &&
            setUpdateData({
              ...updateData,
              name: eve.target.value,
            })
          }
        />
        <FormControlLabel
          control={
            <Checkbox
              defaultChecked={isAvailable}
              onChange={(eve, value) => {
                setUpdateData({
                  ...updateData,
                  isAvailable: value,
                });
              }}
            />
          }
          label="Available"
        />
        <Button
          variant="contained"
          content="fixed"
          onClick={handleUpdateMenuCategory}
        >
          Update
        </Button>
      </Box>
      <DeleteDialog
        open={open}
        setOpen={setOpen}
        title="Delte Menu Category"
        content="Are you sure you want to delete this menu categoy?"
        handleDelete={handleDeleteMenuCategory}
      />
    </Box>
  );
};

export default MenuCategoryDetail;
