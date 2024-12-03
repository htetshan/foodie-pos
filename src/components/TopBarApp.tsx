import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { signOut, useSession } from "next-auth/react";

export default function ButtonAppBar() {
  const { data } = useSession();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            foodie pos
          </Typography>
          {data?.user && (
            <Button color="inherit" onClick={() => signOut()}>
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
