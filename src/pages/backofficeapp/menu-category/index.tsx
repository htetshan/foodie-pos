import BackofficeLayout from "@/components/BackofficeLayout";
import ItemCard from "@/components/ItemCard";
import NewMenuCategoryDialog from "@/components/NewMenuCategoryDialog";
import { MenuCategoryType } from "@/types/menuCategory";
import { Box, Button } from "@mui/material";
import { useState } from "react";
import { useAppSelector } from "@/store/hooks";
import MenuBookIcon from "@mui/icons-material/MenuBook";

const MenuCategory = () => {
  const [open, setOpen] = useState<boolean>(false);
  const { company } = useAppSelector((state) => state.company);

  const [newMenuCatgory, setNewMenuCatgory] = useState<MenuCategoryType>({
    name: "",
    isAvailable: true,
    companyId: company?.id,
  });
  const { menuCategories } = useAppSelector((state) => state.menuCategories);
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

      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
        {menuCategories.map((item) => (
          <ItemCard
            key={item.id}
            icon={<MenuBookIcon />}
            title={item.name}
            href={`/backofficeapp/menu-category/${item.id}`}
          />
        ))}
      </Box>
    </BackofficeLayout>
  );
};

export default MenuCategory;
