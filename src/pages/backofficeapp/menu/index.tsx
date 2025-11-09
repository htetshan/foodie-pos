import MenuCard from "@/components/MenuCard";
import NewMenuDialog from "@/components/NewMenuDialog";
import { useAppSelector } from "@/store/hooks";
import { NewMenuPayload } from "@/types/menu";
import { Box, Button } from "@mui/material";
import { useState } from "react";
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

  if (!menus) return null;
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          padding: 2,
          position: "sticky",
          top: 0,
          zIndex: 100,
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
      </Box>
      <NewMenuDialog
        open={open}
        setOpen={setOpen}
        newMenu={newMenu}
        setNewMenu={setNewMenu}
      />
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
            <MenuCard
              menu={menu}
              href={`/backofficeapp/menu/${menu.id}`}
              isAvailable={isAvailable}
            />
          );
        })}
      </Box>
    </Box>
  );
};

export default Menus;
