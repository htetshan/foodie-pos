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
  if (!menuCategory)
    return (
      <BackofficeLayout>
        <Typography>Menu Category not found</Typography>
      </BackofficeLayout>
    );

  useEffect(() => {
    if (menuCategory) {
      setEditMenuCategory(menuCategory);
    } else {
      setEditMenuCategory(undefined); // Optional: Reset state if menuCategory is undefined
    }
  }, [menuCategory]);
  console.log(editMenuCategory);

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

  return (
    <BackofficeLayout>
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
