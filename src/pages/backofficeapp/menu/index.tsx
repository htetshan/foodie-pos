import BackofficeLayout from "@/components/BackofficeLayout";
import ItemCard from "@/components/ItemCard";
import NewMenuDialog from "@/components/NewMenuDialog";
import { useAppSelector } from "@/store/hooks";
import { NewMenuPayload } from "@/types/menu";
import { Box, Button } from "@mui/material";
import { useState } from "react";
import MenuBookIcon from "@mui/icons-material/MenuBook";
const Menus = () => {
  const { menus } = useAppSelector((state) => state.menus);

  const [open, setOpen] = useState<boolean>(false);
  const [newMenu, setNewMenu] = useState<NewMenuPayload>({
    name: "",
    price: 0,
    menuCategoryIds: [],
  });
  const { selectedLocation } = useAppSelector((state) => state.app);
  const { disableLocationMenus } = useAppSelector(
    (state) => state.disableLocationMenu
  );

  return (
    <BackofficeLayout>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          padding: 2,
        }}
      >
        <Button
          variant="contained"
          onClick={() => {
            setOpen(true);
          }}
        >
          New Menu
        </Button>
        <NewMenuDialog
          open={open}
          setOpen={setOpen}
          newMenu={newMenu}
          setNewMenu={setNewMenu}
        />
      </Box>
      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
        {menus.map((menu) => {
          const isAvailable = disableLocationMenus.find(
            (item) =>
              item.locationId === selectedLocation?.id &&
              item.menuId === menu.id
          )
            ? false
            : true;
          return (
            <ItemCard
              key={menu.id}
              icon={<MenuBookIcon />}
              title={menu.name}
              isAvailable={isAvailable}
              href={`/backofficeapp/menu/${menu.id}`}
            />
          );
        })}
      </Box>
    </BackofficeLayout>
  );
};

export default Menus;
