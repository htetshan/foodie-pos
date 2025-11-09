import ItemCard from "@/components/ItemCard";
import { useAppSelector } from "@/store/hooks";
import { Box, Button } from "@mui/material";
import { useState } from "react";
import ClassIcon from "@mui/icons-material/Class";
import NewAddonCategoryDialog from "@/components/NewAddonCategoryDialog";
import { CreateAddonCategoryParam } from "@/types/addonCategory";
const AddonCategory = () => {
  const { addonCategories } = useAppSelector((state) => state.addonCategory);

  const [open, setOpen] = useState<boolean>(false);
  const [newAddonCategory, setNewAddonCategory] =
    useState<CreateAddonCategoryParam>({
      name: "",
      isRequired: true,
      menuIds: [],
    });

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
          New Addon Category
        </Button>
        <NewAddonCategoryDialog
          open={open}
          setOpen={setOpen}
          newAddonCategory={newAddonCategory}
          setNewAddonCategory={setNewAddonCategory}
        />
      </Box>
      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
        {addonCategories.map((item) => {
          return (
            <ItemCard
              key={item.id}
              icon={<ClassIcon />}
              title={item.name}
              isAvailable
              href={`/backofficeapp/addon-category/${item.id}`}
            />
          );
        })}
      </Box>
    </Box>
  );
};

export default AddonCategory;
