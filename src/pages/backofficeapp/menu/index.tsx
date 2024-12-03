import BackofficeLayout from "@/components/BackofficeLayout";
import NewMenuDialog from "@/components/NewMenuDialog";
import { Box, Button } from "@mui/material";
import { useState } from "react";

const Menus = () => {
  const [open, setOpen] = useState<boolean>(false);

  /*   const handleOnClick = () => {
    dispatch(createMenu({ ...newMenu }));
  }; */

  return (
    <BackofficeLayout>
      <Box
        sx={{
          bgcolor: "rebeccapurple",
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
          New Menu
        </Button>
        <NewMenuDialog open={open} setOpen={setOpen} />
      </Box>
    </BackofficeLayout>
  );
};

export default Menus;
