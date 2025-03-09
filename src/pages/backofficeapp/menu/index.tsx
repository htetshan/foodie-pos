import BackofficeLayout from "@/components/BackofficeLayout";
import ItemCard from "@/components/ItemCard";
import NewMenuDialog from "@/components/NewMenuDialog";
import { useAppSelector } from "@/store/hooks";
import { MenuType } from "@/types/menu";
import { Box, Button } from "@mui/material";
import { useState } from "react";
import MenuBookIcon from "@mui/icons-material/MenuBook";
const Menus = () => {
  const { menus } = useAppSelector((state) => state.menus);

  const [open, setOpen] = useState<boolean>(false);
  const [newMenu, setNewMenu] = useState<MenuType>({
    name: "",
    price: 0,
    menuCategoryIds: [],
  });

  /*   const handleOnClick = () => {
    dispatch(createMenu({ ...newMenu }));
  }; */

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
        {menus.map((item) => (
          <ItemCard
            key={item.id}
            icon={<MenuBookIcon />}
            title={item.name}
            href={`/backofficeapp/menu/${item.id}`}
          />
        ))}
      </Box>
    </BackofficeLayout>
  );
};

export default Menus;
