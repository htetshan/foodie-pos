import ItemCard from "@/components/ItemCard";
import { useAppSelector } from "@/store/hooks";
import { Box, Button } from "@mui/material";
import { useState } from "react";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import { CreateAddonParam } from "@/types/addon";
import NewAddonDialog from "@/components/NewAddonDialog";
const Locations = () => {
  const { addons } = useAppSelector((state) => state.addon);

  const [open, setOpen] = useState<boolean>(false);
  const [newAddon, setNewAddon] = useState<CreateAddonParam>({
    name: "",
    price: 0,
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
          New Addon
        </Button>
        <NewAddonDialog
          open={open}
          setOpen={setOpen}
          newAddon={newAddon}
          setNewAddon={setNewAddon}
        />
      </Box>
      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
        {addons.map((item) => {
          return (
            <ItemCard
              key={item.id}
              icon={<MenuBookIcon />}
              title={item.name}
              isAvailable
              href={`/backofficeapp/addon/${item.id}`}
            />
          );
        })}
      </Box>
    </Box>
  );
};

export default Locations;
