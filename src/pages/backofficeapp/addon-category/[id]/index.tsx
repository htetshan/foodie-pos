import BackofficeLayout from "@/components/BackofficeLayout";
import DeleteDialog from "@/components/DeleteDialog";
import MultiSelect from "@/components/MultiSelect";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { updateAddonCategory } from "@/store/slices/addonCategorySlice";
import { UpdateAddonCategoryParam } from "@/types/addonCategory";
import { Box, Button, TextField, Typography } from "@mui/material";
import { Menu } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const AddonCategoryDetail = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const addonCategoryId = Number(router.query.id);
  const [open, setOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<number[]>([]);
  const [updateData, setUpdateData] = useState<UpdateAddonCategoryParam>();
  const { addonCategories } = useAppSelector((state) => state.addonCategory);
  const { menus } = useAppSelector((state) => state.menus);
  const { company } = useAppSelector((state) => state.company);
  const { menuAddonCategories } = useAppSelector(
    (state) => state.menuAddonCategory
  );

  const addonCategory = addonCategories.find(
    (item) => item.id === addonCategoryId
  );
  const menuFound = menuAddonCategories
    .filter((itemId) => itemId.addonCategoryId === addonCategoryId)
    .map((item) => menus.find((menu) => menu.id === item.menuId) as Menu);
  const selectedMenuIds = menuFound.map((item) => item?.id);

  const handleUpdateAddonCategory = () => {
    updateData && dispatch(updateAddonCategory(updateData));
    router.push("/backofficeapp/addon-category");
    if (updateData?.name === "") return null;
    const shouldUpdate = addonCategory?.name !== updateData?.name;
    if (shouldUpdate) {
    }
  };
  const handleDeleteAddonCategory = () => {
    const isVaild = addonCategories.find((item) => item.id === addonCategoryId);
    if (!isVaild) return alert("Cannot Delete");
    //dispatch(deleteLocation({ id: locationId }));
    router.push("/backofficeapp/addon-category");
  };

  //different useEffect style logic compare in menu[id],cause of type no option "menuIds"
  useEffect(() => {
    if (addonCategory) {
      setUpdateData({
        ...addonCategory,
        menuIds: selectedMenuIds,
        companyId: company?.id,
      });
      setSelected(selectedMenuIds);
    }
  }, [addonCategory]);
  useEffect(() => {
    if (updateData) {
      setUpdateData({ ...updateData, menuIds: selected });
    }
  }, [selected]);

  if (!addonCategory)
    return (
      <BackofficeLayout>
        <Typography>Addon Category not found</Typography>
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
        <MultiSelect
          title="Addon Category"
          selected={selected}
          setSelected={setSelected}
          itemCatalog={menus}
        />
        <Button
          variant="contained"
          content="fixed"
          onClick={handleUpdateAddonCategory}
        >
          Update
        </Button>
      </Box>
      <DeleteDialog
        open={open}
        setOpen={setOpen}
        title="Delete Location"
        content="Are you sure you want to delete this addonCategory?"
        handleDelete={handleDeleteAddonCategory}
      />
    </BackofficeLayout>
  );
};

export default AddonCategoryDetail;
