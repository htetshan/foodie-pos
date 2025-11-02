import BackofficeLayout from "@/components/BackofficeLayout";
import DeleteDialog from "@/components/DeleteDialog";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { deleteTable, updateTable } from "@/store/slices/tablesSlice";
import { UpdateTableParam } from "@/types/table";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const TableDetail = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const tableId = Number(router.query.id);
  const [open, setOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<number>();
  const [updateData, setUpdateData] = useState<UpdateTableParam>();
  const { tables } = useAppSelector((state) => state.table);
  const { selectedLocation } = useAppSelector((state) => state.app);
  const { addonCategories } = useAppSelector((state) => state.addonCategory);
  const table = tables.find((item) => item.id === tableId);

  const handleUpdateTable = () => {
    updateData && dispatch(updateTable(updateData));
    router.push("/backofficeapp/table");

    /*    if (updateData?.name === "") return null;
    const shouldUpdate = table?.name !== updateData?.name;
    if (shouldUpdate) {
      updateData && dispatch(updateLocation(updateData));
    } */
  };
  const handleDeleteTable = () => {
    const isVaild = tables.find((item) => item.id === tableId);
    if (!isVaild) return alert("Cannot Delete");
    dispatch(deleteTable({ id: tableId }));
    router.push("/backofficeapp/table");
  };
  useEffect(() => {
    if (table && selectedLocation) {
      setUpdateData({ ...table, locationId: selectedLocation.id });
    }
  }, [table, selectedLocation]);

  if (!updateData)
    return (
      <BackofficeLayout>
        <Typography>Table not found</Typography>
      </BackofficeLayout>
    );
  return (
    <BackofficeLayout>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="contained"
          sx={{ bgcolor: "red" }}
          onClick={() => setOpen(true)}
        >
          Delete
        </Button>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          p: 2,
          width: 350,
        }}
      >
        <TextField
          sx={{ mb: 1 }}
          value={updateData?.name}
          onChange={(eve) =>
            updateData &&
            setUpdateData({
              ...updateData,
              name: eve.target.value,
            })
          }
        />
        <Button variant="contained" content="fixed" onClick={handleUpdateTable}>
          Update
        </Button>
      </Box>
      <DeleteDialog
        open={open}
        setOpen={setOpen}
        title="Delete Table"
        content="Are you sure you want to delete this table?"
        handleDelete={handleDeleteTable}
      />
    </BackofficeLayout>
  );
};

export default TableDetail;
