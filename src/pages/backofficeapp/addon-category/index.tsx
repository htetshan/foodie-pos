import BackofficeLayout from "@/components/BackofficeLayout";
import ItemCard from "@/components/ItemCard";
import { useAppSelector } from "@/store/hooks";
import { Box, Button } from "@mui/material";
import { useEffect, useState } from "react";
import NewLocationDialog from "@/components/NewLocationDialog";
import ClassIcon from "@mui/icons-material/Class";
import { LocationType } from "@/types/location";
const Locations = () => {
  const { addonCategories } = useAppSelector((state) => state.addonCategory);
  const { company } = useAppSelector((state) => state.company);

  const [open, setOpen] = useState<boolean>(false);
  const [newLocation, setNewLocation] = useState<LocationType>({
    name: "",
    companyId: company?.id,
  });
  useEffect(() => {
    if (company) {
      setNewLocation({ ...newLocation, companyId: company.id });
    }
  }, [company]);

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
          New Location
        </Button>
        <NewLocationDialog
          open={open}
          setOpen={setOpen}
          newLocation={newLocation}
          setNewLocation={setNewLocation}
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
    </BackofficeLayout>
  );
};

export default Locations;
