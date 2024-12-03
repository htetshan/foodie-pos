import { Alert, Box, Snackbar } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { hideSnackbar } from "../store/slices/appSnackbarSlice";
import { useEffect } from "react";

const AppSnackBar = () => {
  const dispath = useAppDispatch();
  const { openType, outComeType, message } = useAppSelector(
    (store) => store.appSnackBar
  );

  useEffect(() => {
    setTimeout(() => {
      dispath(hideSnackbar());
    }, 5000);
  }, []);

  return (
    <Box>
      <Snackbar open={openType}>
        <Alert
          onClose={() => dispath(hideSnackbar())}
          severity={outComeType}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AppSnackBar;
