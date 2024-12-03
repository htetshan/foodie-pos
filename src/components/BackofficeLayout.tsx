import { Box } from "@mui/material";
import TopBarApp from "./TopBarApp";
import SideBarApp from "./SideBarApp";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}
const BackofficeLayout = ({ children }: Props) => {
  return (
    <Box sx={{ height: "100vh" }}>
      <Box sx={{ height: "10%" }}>
        <TopBarApp />
      </Box>
      <Box sx={{ display: "flex", height: "90%" }}>
        <Box sx={{ width: "20%", p: 1, bgcolor: "#CBD2A4" }}>
          <SideBarApp />
        </Box>
        <Box sx={{ width: "80%", p: 1, bgcolor: "#E4E0E1" }}>{children}</Box>
      </Box>
    </Box>
  );
};

export default BackofficeLayout;
