import BackofficeLayout from "@/components/BackofficeLayout";
import DeleteDialog from "@/components/DeleteDialog";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { deleteMenu, updateMenu } from "@/store/slices/menuSlice";
import { UpdateMenuType } from "@/types/menu";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { MenuCategory } from "@prisma/client";
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
  const [selected, setSelected] = useState<number[]>([]);
  const [updateData, setUpdateData] = useState<UpdateMenuType>();
  const { menus } = useAppSelector((state) => state.menus);
  const { menuCategoryMenus } = useAppSelector(
    (state) => state.menuCategoryMenu
  );
  const { menuCategories } = useAppSelector((state) => state.menuCategories);
  const { selectedLocation } = useAppSelector((state) => state.app);
  const { disableLocationMenus } = useAppSelector(
    (state) => state.disableLocationMenu
  );
  const isAvailable = disableLocationMenus.find(
    (item) => item.menuId === menuId && item.locationId === selectedLocation?.id
  )
    ? false
    : true;
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
      setUpdateData({
        ...menu,
        isAvailable,
        selectedLocationId: selectedLocation?.id,
      });
      setSelected(selectedMenuCategoryIds);
    }
  }, [menu]);
  // console.log(updateData);

  const handleUpdateMenu = () => {
    updateData && dispatch(updateMenu(updateData));
    router.push("/backofficeapp/menu");
    return;
    const shouldUpdate =
      menu?.name !== updateData?.name || menu?.price !== updateData?.price;
    if (shouldUpdate) {
      router.push("/backofficeapp/menu");
    }
  };
  const handleDeleteMenu = () => {
    const isVaild = menus.find((item) => item.id === menuId);
    if (!isVaild) return alert("Cannot Delete");
    dispatch(deleteMenu({ id: menuId }));
    setOpen(false);
    router.push("/backofficeapp/menu");
  };

  if (!updateData)
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
          value={updateData?.name}
          onChange={(eve) =>
            updateData &&
            setUpdateData({
              ...updateData,
              name: eve.target.value,
            })
          }
        />
        <TextField
          sx={{ mb: 1 }}
          value={updateData?.price}
          onChange={(eve) =>
            updateData &&
            setUpdateData({
              ...updateData,
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
            value={selected}
            onChange={(eve) => {
              const selectedId = eve.target.value as number[];
              setSelected(selectedId);
            }}
            renderValue={() => {
              const selectedMenuCategories = selected.map(
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
                <Checkbox checked={selected.includes(item.id)} />
                <ListItemText primary={item.name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControlLabel
          control={
            <Checkbox
              defaultChecked={isAvailable}
              onChange={(eve, value) => {
                updateData &&
                  setUpdateData({
                    ...updateData,
                    isAvailable: value,
                  });
              }}
            />
          }
          label="Available"
        />
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
