import BackofficeLayout from "@/components/BackofficeLayout";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
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
  const { menuCategories } = useAppSelector((state) => state.menuCategories);
  const { menuCategoryMenus } = useAppSelector(
    (state) => state.menuCategoryMenu
  );
  const { menus } = useAppSelector((state) => state.menus);
  const [editMenu, setEditMenu] = useState<Menu>();

  //dynamic route taken menuId
  const router = useRouter();
  const menuId = Number(router.query.id);
  //console.log("router state initial state", router.query);

  const menuFound = menus.find((item) => item.id === menuId);

  //menu(useAppSelector)->menuCategoryMenu(filter)->[{id:,menuCategoryId:,menuId:},{}] ,menuCategories(find),menuCategories.id
  const menuCategoryFound = menuCategoryMenus
    .filter((menuIds) => menuIds.menuId === menuId)
    .map(
      (item) =>
        menuCategories.find(
          (menuCategoryId) => menuCategoryId.id === item.menuCategoryId
        ) as MenuCategory
    );
  const selectedMenuCategoryIds = menuCategoryFound.map((item) => item?.id);
  /*   above or below using return 

  const menuCategoryIdss = menuCategoryMenus
    .filter((menuIds) => menuIds.menuId === menuId)
    .map((item) => {
      const menuCategoryee = menuCategories.find(
        (menuCategoryId) => menuCategoryId.id === item.menuCategoryId
      ) as MenuCategory;
      return menuCategoryee.id;
    });
 */
  console.log("menucategryIds:", selectedMenuCategoryIds);

  if (!menuFound)
    return (
      <BackofficeLayout>
        <Typography>Menu not found</Typography>
      </BackofficeLayout>
    );

  useEffect(() => {
    if (menuFound) {
      setEditMenu(menuFound);
    }
  }, []);
  // console.log(editMenu);

  const handleUpdate = () => {
    if (editMenu?.name === "") return null;

    const shouldUpdate = menuFound?.name !== editMenu?.name;
    if (shouldUpdate) {
      console.log("editMenu", editMenu);

      //this go to menuSlice and update menu  =>editMenu && dispatch(updateMenuCategory());
      router.push("/backofficeapp/menu");
    }
  };

  return (
    <BackofficeLayout>
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
        <Button variant="contained" content="fixed" onClick={handleUpdate}>
          Update
        </Button>
      </Box>
    </BackofficeLayout>
  );
};

export default MenuDetail;
