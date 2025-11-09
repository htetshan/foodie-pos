import DeleteDialog from "@/components/DeleteDialog";
import SingleSelect from "@/components/SingleSelect";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { deleteAddon, updateAddon } from "@/store/slices/addonSlice";
import { UpdateAddonParam } from "@/types/addon";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const AddonDetail = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const addonId = Number(router.query.id);
  const [open, setOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<number>();
  const [updateData, setUpdateData] = useState<UpdateAddonParam>();
  const { addons } = useAppSelector((state) => state.addon);
  const { addonCategories } = useAppSelector((state) => state.addonCategory);
  const addon = addons.find((item) => item.id === addonId);

  const handleUpdateAddon = () => {
    updateData && dispatch(updateAddon(updateData));
    router.push("/backofficeapp/addon");

    /*    if (updateData?.name === "") return null;
    const shouldUpdate = addon?.name !== updateData?.name;
    if (shouldUpdate) {
      updateData && dispatch(updateLocation(updateData));
    } */
  };
  const handleDeleteAddon = () => {
    const isVaild = addons.find((item) => item.id === addonId);
    if (!isVaild) return alert("Cannot Delete");
    dispatch(deleteAddon({ id: addonId }));
    router.push("/backofficeapp/addon");
  };

  useEffect(() => {
    if (addon) {
      setUpdateData(addon);
      setSelected(addon.addonCategoryId);
    }
  }, [addon]);
  useEffect(() => {
    if (updateData && selected) {
      setUpdateData({ ...updateData, addonCategoryId: selected });
    }
  }, [selected]);

  if (!addon)
    return (
      <Box>
        <Typography>Addon not found</Typography>
      </Box>
    );
  return (
    <Box>
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
        <TextField
          sx={{ mb: 1 }}
          value={updateData?.price}
          onChange={(eve) =>
            updateData &&
            setUpdateData({
              ...updateData,
              price: Number(eve.target.value),
            })
          }
        />
        <SingleSelect
          title="Addon"
          selected={selected}
          setSelected={setSelected}
          itemCatalog={addonCategories}
        />
        <Button variant="contained" content="fixed" onClick={handleUpdateAddon}>
          Update
        </Button>
      </Box>
      <DeleteDialog
        open={open}
        setOpen={setOpen}
        title="Delete Addon"
        content="Are you sure you want to delete this addon?"
        handleDelete={handleDeleteAddon}
      />
    </Box>
  );
};

export default AddonDetail;
