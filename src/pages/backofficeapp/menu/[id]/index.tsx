import BackofficeLayout from "@/components/BackofficeLayout";
import DeleteDialog from "@/components/DeleteDialog";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { deleteMenu } from "@/store/slices/menuSlice";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Menu, MenuCategory } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
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
const MenuDetail = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const menuId = Number(router.query.id);
  const [open, setOpen] = useState<boolean>(false);
  const [editMenu, setEditMenu] = useState<Menu>();
  const { menus } = useAppSelector((state) => state.menus);
  const { menuCategories } = useAppSelector((state) => state.menuCategories);
  const { menuCategoryMenus } = useAppSelector(
    (state) => state.menuCategoryMenu
  );
  const menu = menus.find((item) => item.id === menuId);

  const menuCategoryFound = menuCategoryMenus
    .filter((menuIds) => menuIds.menuId === menuId)
    .map(
      (item) =>
        menuCategories.find(
          (menuCategoryId) => menuCategoryId.id === item.menuCategoryId
        ) as MenuCategory
    );
  const selectedMenuCategoryIds = menuCategoryFound.map((item) => item?.id);

  useEffect(() => {
    if (menu) {
      setEditMenu(menu);
    }
  }, [menu]);
  // console.log(editMenu);

  const handleUpdateMenu = () => {
    if (editMenu?.name === "") return null;

    const shouldUpdate = menu?.name !== editMenu?.name;
    if (shouldUpdate) {
      console.log("editMenu", editMenu);

      //this go to menuSlice and update menu  =>editMenu && dispatch(updateMenuCategory());
      router.push("/backofficeapp/menu");
    }
  };
  const handleDeleteMenu = () => {
    const isVaild = menus.find((item) => item.id === menuId);
    if (!isVaild) return alert("Cannot Delete");
    dispatch(deleteMenu({ id: menuId }));
    router.push("/backofficeapp/menu");
  };

  if (!menu)
    return (
      <BackofficeLayout>
        <Typography>Menu not found</Typography>
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
          value={editMenu?.name}
          onChange={(eve) =>
            editMenu &&
            setEditMenu({
              ...editMenu,
              name: eve.target.value,
            })
          }
        />
        <TextField
          sx={{ mb: 1 }}
          value={editMenu?.price}
          onChange={(eve) =>
            editMenu &&
            setEditMenu({
              ...editMenu,
              price: Number(eve.target.value),
            })
          }
        />
        <FormControl>
          <InputLabel id="demo-multiple-checkbox-label">
            Menu Category
          </InputLabel>
          <Select
            multiple
            value={selectedMenuCategoryIds}
            renderValue={() => {
              const selectedMenuCategories = selectedMenuCategoryIds.map(
                (itemId) =>
                  menuCategories.find(
                    (item) => item.id === itemId
                  ) as MenuCategory
              );
              return selectedMenuCategories.map((item) => item.name).join(", ");
            }}
            input={<OutlinedInput label="Menu Category" />}
            MenuProps={MenuProps}
          >
            {menuCategories.map((item) => (
              <MenuItem key={item.id} value={item.id}>
                <Checkbox checked={selectedMenuCategoryIds.includes(item.id)} />
                <ListItemText primary={item.name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button variant="contained" content="fixed" onClick={handleUpdateMenu}>
          Update
        </Button>
      </Box>
      <DeleteDialog
        open={open}
        setOpen={setOpen}
        title="Delete Menu"
        content="Are you sure you want to delete this menu?"
        handleDelete={handleDeleteMenu}
      />
    </BackofficeLayout>
  );
};

export default MenuDetail;
