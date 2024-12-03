import { Box, Typography } from "@mui/material";
import Link from "next/link";

const Landing = () => {
  /*   console.log(config.googleId);
   */
  return (
    <>
      <Typography variant="h3">App Landing site</Typography>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Link href={"/backofficeapp"}>BackOffice App(company)</Link>
        <Link href={"/orderapp"}>Order App(end user)</Link>
      </Box>
    </>
  );
};

export default Landing;
