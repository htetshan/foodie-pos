import BackofficeLayout from "@/components/BackofficeLayout";
import ItemCard from "@/components/ItemCard";
import { useAppSelector } from "@/store/hooks";
import { Box, Button } from "@mui/material";
import { useEffect, useState } from "react";
import TableBarIcon from "@mui/icons-material/TableBar";

import { CreateTableParam } from "@/types/table";
import NewTableDialog from "@/components/NewTableDialog";
const Tables = () => {
  const { tables } = useAppSelector((state) => state.table);
  const { selectedLocation } = useAppSelector((state) => state.app);

  const [open, setOpen] = useState<boolean>(false);
  const [newTable, setNewTable] = useState<CreateTableParam>({
    name: "",
    locationId: selectedLocation?.id,
  });
  useEffect(() => {
    if (selectedLocation) {
      setNewTable({ ...newTable, locationId: selectedLocation.id });
    }
  }, [selectedLocation]);

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
          New Table
        </Button>
      </Box>
      <NewTableDialog
        open={open}
        setOpen={setOpen}
        newTable={newTable}
        setNewTable={setNewTable}
      />
      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
        {tables.map((item) => {
          return (
            <ItemCard
              key={item.id}
              icon={<TableBarIcon />}
              title={item.name}
              isAvailable
              href={`/backofficeapp/table/${item.id}`}
            />
          );
        })}
      </Box>
    </BackofficeLayout>
  );
};

export default Tables;
