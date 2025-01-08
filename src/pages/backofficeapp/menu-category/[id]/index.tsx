import BackofficeLayout from "@/components/BackofficeLayout";
import { useAppSelector } from "@/store/hooks";
import { Typography } from "@mui/material";
import { useRouter } from "next/router";

const MenuCategoryDetail = () => {
  const router = useRouter();
  const menuCategoryId = Number(router.query.id);
  const { menuCategories } = useAppSelector((state) => state.menuCategories);
  const menuCategory = menuCategories.find(
    (item) => item.id === menuCategoryId
  );
  console.log(menuCategory);
  if (!menuCategory)
    return (
      <BackofficeLayout>
        <Typography>Menu Category not found</Typography>
      </BackofficeLayout>
    );
  return (
    <BackofficeLayout>
      <Typography>{menuCategory?.name}</Typography>
    </BackofficeLayout>
  );
};

export default MenuCategoryDetail;
