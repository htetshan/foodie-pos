import BackofficeLayout from "@/components/BackofficeLayout";
import NewMenuDialog from "@/components/NewMenuDialog";
import { MenuType } from "@/types/menu";
import { Box, Button } from "@mui/material";
import { useState } from "react";

const Menus = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [newMenu, setNewMenu] = useState<MenuType>({ name: "", price: 0 });

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
    </BackofficeLayout>
  );
};

export default Menus;
