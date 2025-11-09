import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Box, Button, TextField, Typography } from "@mui/material";

import {
  selectedCompanySetting,
  updateCompany,
} from "@/store/slices/companySlice";
import { UpdateCompanyParam } from "@/types/company";
import { useEffect, useState } from "react";
const Setting = () => {
  const dispath = useAppDispatch();
  const companySetting = useAppSelector(selectedCompanySetting);
  const [updateData, setUpdateData] = useState<UpdateCompanyParam>();
  useEffect(() => {
    if (companySetting) {
      setUpdateData(companySetting);
    }
  }, [companySetting]);
  const handleUpdateCompany = () => {
    updateData && dispath(updateCompany(updateData));
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          p: 2,
          width: 350,
        }}
      >
        <Typography>Company Detail</Typography>
        <TextField
          sx={{ mb: 1, mt: 2 }}
          value={updateData?.name}
          onChange={(eve) =>
            updateData &&
            setUpdateData({
              ...updateData,
              name: eve.target.value,
            })
          }
        />
        <Button
          variant="contained"
          content="fixed"
          onClick={handleUpdateCompany}
        >
          Update
        </Button>
      </Box>
    </Box>
  );
};

export default Setting;
