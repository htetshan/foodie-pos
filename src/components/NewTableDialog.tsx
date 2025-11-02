import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import React, { Dispatch, SetStateAction } from "react";
import AppSnackBar from "./AppSnackBar";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useRouter } from "next/router";
import { CreateTableParam } from "@/types/table";
import { createTable } from "@/store/slices/tablesSlice";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  newTable: CreateTableParam;
  setNewTable: Dispatch<SetStateAction<CreateTableParam>>;
}
const NewTableDialog = ({ open, setOpen, newTable, setNewTable }: Props) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { selectedLocation } = useAppSelector((state) => state.app);

  const handleCreateTable = () => {
    dispatch(createTable(newTable));
    //router.push("/backofficeapp/table");
    setOpen(false);
  };
  /*   useEffect(() => {
    if (selectedLocation) {
      setNewTable({ ...newTable, locationId: selectedLocation?.id });
    }
  }, [selectedLocation]); */
  return (
    <Dialog
      open={open}
      onClose={() => {
        setOpen(false);
      }}
    >
      <Box sx={{ width: 350 }}>
        <DialogTitle>Create Table</DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <TextField
              placeholder="Table name"
              sx={{ p: 1 }}
              value={newTable.name || ""}
              onChange={(event) =>
                setNewTable({
                  ...newTable,
                  name: event.target.value,
                })
              }
            />
          </Box>
          <DialogActions>
            <Button
              onClick={() => {
                setOpen(false);
              }}
            >
              Cancel
            </Button>
            <Button
              sx={{ width: 40, height: 35 }}
              variant="contained"
              onClick={handleCreateTable}
            >
              Create
            </Button>
          </DialogActions>
        </DialogContent>
        <AppSnackBar />
      </Box>
    </Dialog>
  );
};

export default NewTableDialog;
