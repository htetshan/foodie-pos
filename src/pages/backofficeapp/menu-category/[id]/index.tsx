import BackofficeLayout from "@/components/BackofficeLayout";
import DeleteDialog from "@/components/DeleteDialog";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  deleteMenuCategory,
  updateMenuCategory,
} from "@/store/slices/menuCategorySlice";
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
  const [open, setOpen] = useState<boolean>(false);
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

  if (!editMenuCategory)
    return (
      <BackofficeLayout>
        <Typography>Menu Category not found</Typography>
      </BackofficeLayout>
    );
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

  const handleDeleteMenuCategory = () => {
    const valid = menuCategories.find((item) => item.id === menuCategoryId);
    if (!valid) return alert("Cannot delete");
    dispatch(deleteMenuCategory({ id: menuCategoryId }));
    router.push("/backofficeapp/menu-category");
  };

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
      <DeleteDialog
        open={open}
        setOpen={setOpen}
        title="Delte Menu Category"
        content="Are you sure you want to delete this menu categoy?"
        handleDelete={handleDeleteMenuCategory}
      />
    </BackofficeLayout>
  );
};

export default MenuCategoryDetail;
