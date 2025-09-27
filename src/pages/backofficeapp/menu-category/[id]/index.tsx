import BackofficeLayout from "@/components/BackofficeLayout";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { updateMenuCategory } from "@/store/slices/menuCategorySlice";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";
import { MenuCategory } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
const MenuCategoryDetail = () => {
  const router = useRouter();
  const [editMenuCategory, setEditMenuCategory] = useState<MenuCategory>();
  const dispatch = useAppDispatch();
  const menuCategoryId = Number(router.query.id);
  const { menuCategories } = useAppSelector((state) => state.menuCategories);
  const menuCategory = menuCategories.find(
    (item) => item.id === menuCategoryId
  );

  useEffect(() => {
    if (menuCategory) {
      setEditMenuCategory(menuCategory);
    }
  }, [menuCategory]);
  /* 
useEffect(() => { ... }, [menuCategory]) — What Triggers It?
This useEffect runs every time menuCategory changes — regardless of whether it becomes:

A defined value ({name: "drinks"})

Or undefined

So:

✅ Initial render — menuCategory is likely undefined, and effect runs.

✅ API call completes, menuCategory becomes { name: "drinks" } → effect runs.

✅ Later, for some reason, menuCategory is set back to undefined → effect runs again.

Each time the menuCategory value (reference) changes — even between undefined → object or object → undefined — the useEffect will re-run. */
  if (!editMenuCategory)
    return (
      <BackofficeLayout>
        <Typography>Menu Category not found</Typography>
      </BackofficeLayout>
    );

  // console.log(editMenuCategory);

  const handleUpdate = () => {
    if (editMenuCategory?.name === "") return null;

    const shouldUpdate =
      menuCategory?.name !== editMenuCategory?.name ||
      menuCategory?.isAvailable !== editMenuCategory?.isAvailable;
    if (shouldUpdate) {
      editMenuCategory && dispatch(updateMenuCategory(editMenuCategory));
      router.push("/backofficeapp/menu-category");
    }
  };
  const handleDelete = () => {
    console.log("delete");
  };

  return (
    <BackofficeLayout>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="contained"
          sx={{ bgcolor: "red" }}
          onClick={handleDelete}
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
          value={editMenuCategory?.name}
          onChange={(eve) =>
            editMenuCategory &&
            setEditMenuCategory({
              ...editMenuCategory,
              name: eve.target.value,
            })
          }
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={!!editMenuCategory?.isAvailable}
              /* Why?React's Checkbox component requires the checked prop to be strictly a boolean (true or false).
                !!editMenuCategory?.isAvailable ensures that:
                If editMenuCategory?.isAvailable is true, it stays true.
                If editMenuCategory?.isAvailable is falsy (e.g., undefined, null, or false), it becomes false. */
              onChange={(eve) =>
                editMenuCategory &&
                setEditMenuCategory({
                  ...editMenuCategory,
                  isAvailable: eve.target.checked,
                })
              }
            />
          }
          label="isAvailable"
        />
        <Button variant="contained" content="fixed" onClick={handleUpdate}>
          Update
        </Button>
      </Box>
    </BackofficeLayout>
  );
};

export default MenuCategoryDetail;
