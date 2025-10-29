import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import AppSnackBar from "./AppSnackBar";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useRouter } from "next/router";
import { CreateAddonParam } from "@/types/addon";
import SingleSelect from "./SingleSelect";
import { createAddon } from "@/store/slices/addonSlice";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  newAddon: CreateAddonParam;
  setNewAddon: Dispatch<SetStateAction<CreateAddonParam>>;
}
const NewAddonDialog = ({ open, setOpen, newAddon, setNewAddon }: Props) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [selected, setSelected] = useState<number>();
  const { addonCategories } = useAppSelector((state) => state.addonCategory);

  const handleCreateAddon = () => {
    dispatch(createAddon(newAddon));
    router.push("/backofficeapp/addon");
    setOpen(false);
  };
  useEffect(() => {
    if (selected) {
      setNewAddon({ ...newAddon, addonCategoryId: selected });
    }
  }, [selected]);
  return (
    <Dialog
      open={open}
      onClose={() => {
        setOpen(false);
      }}
    >
      <Box sx={{ width: 350 }}>
        <DialogTitle>Create Addon</DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <TextField
              placeholder="Addon name"
              sx={{ p: 1 }}
              value={newAddon.name || ""}
              onChange={(event) =>
                setNewAddon({
                  ...newAddon,
                  name: event.target.value,
                })
              }
            />
            <TextField
              placeholder="price"
              type="number"
              sx={{ p: 1 }}
              onChange={(event) =>
                setNewAddon({
                  ...newAddon,
                  price: Number(event.target.value),
                })
              }
            />
            <Box sx={{ p: 1 }}>
              <SingleSelect
                title="Menu"
                selected={selected}
                setSelected={setSelected}
                itemCatalog={addonCategories}
              />
            </Box>
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
              onClick={handleCreateAddon}
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

export default NewAddonDialog;
