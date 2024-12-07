import BackofficeLayout from "@/components/BackofficeLayout";
import NewMenuCategoryDialog from "@/components/NewMenuCategoryDialog";
import { MenuCategoryType } from "@/types/menuCategory";
import { Box, Button } from "@mui/material";
import { useState } from "react";

const MenuCategory = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [newMenuCatgory, setNewMenuCatgory] = useState<MenuCategoryType>({
    name: "",
    isAvailable: true,
  });

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
          New Menu Category
        </Button>
        <NewMenuCategoryDialog
          open={open}
          setOpen={setOpen}
          newMenuCatgory={newMenuCatgory}
          setNewMenuCatgory={setNewMenuCatgory}
        />
      </Box>
    </BackofficeLayout>
  );
};

export default MenuCategory;
