import BackofficeLayout from "@/components/BackofficeLayout";
import NewMenuCategoryDialog from "@/components/NewMenuCategoryDialog";
import { Box, Button } from "@mui/material";
import { useState } from "react";

const MenuCategory = () => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <BackofficeLayout>
      <Box
        sx={{
          bgcolor: "rebeccapurple",
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
        <NewMenuCategoryDialog open={open} setOpen={setOpen} />
      </Box>
    </BackofficeLayout>
  );
};

export default MenuCategory;
