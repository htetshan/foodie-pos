import { Box, Button, Typography } from "@mui/material";
import { signIn } from "next-auth/react";

const signin = () => {
  return (
    <Box>
      <Typography>signin custom</Typography>
      <Button
        variant="contained"
        onClick={() => signIn("google", { callbackUrl: "/backofficeapp" })}
      >
        signin
      </Button>
    </Box>
  );
};

export default signin;
