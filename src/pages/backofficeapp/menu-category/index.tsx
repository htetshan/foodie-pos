import ItemCard from "@/components/ItemCard";
import NewMenuCategoryDialog from "@/components/NewMenuCategoryDialog";
import { MenuCategoryType } from "@/types/menuCategory";
import { Box, Button } from "@mui/material";
import { useEffect, useState } from "react";
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
  const { selectedLocation } = useAppSelector((state) => state.app);
  const { disableLocationMenuCategories } = useAppSelector(
    (state) => state.disableLocationMenuCategory
  );

  useEffect(() => {
    if (company) {
      setNewMenuCatgory({ ...newMenuCatgory, companyId: company.id });
    }
  }, [company]);
  return (
    <Box>
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
        {menuCategories.map((menuCategory) => {
          const isAvailable = disableLocationMenuCategories.find(
            (item) =>
              item.menuCatgoryId === menuCategory.id &&
              item.locationId === selectedLocation?.id
          )
            ? false
            : true;
          return (
            <ItemCard
              key={menuCategory.id}
              icon={<MenuBookIcon />}
              title={menuCategory.name}
              isAvailable={isAvailable}
              href={`/backofficeapp/menu-category/${menuCategory.id}`}
            />
          );
        })}
      </Box>
    </Box>
  );
};

export default MenuCategory;
