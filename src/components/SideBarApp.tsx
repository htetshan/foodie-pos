import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import SettingsIcon from "@mui/icons-material/Settings";
import Link from "next/link";

const SideBarApp = () => {
  const siderBarItems = [
    {
      id: 1,
      name: "Menu",
      link: "/backofficeapp/menu",
      icon: <RestaurantMenuIcon />,
    },
    {
      id: 2,
      name: "Menu Category",
      link: "/backofficeapp/menu-category",
      icon: <MenuBookIcon />,
    },
    {
      id: 3,
      name: "Location",
      link: "/backofficeapp/location",
      icon: <AddLocationAltIcon />,
    },
  ];
  return (
    <Box>
      <List>
        {siderBarItems.map((item) => (
          <Link
            href={item.link}
            key={item.id}
            style={{ textDecoration: "none" }}
          >
            <ListItem sx={{ color: "#674636" }} disablePadding>
              <ListItemButton>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
      <List>
        {
          <Link
            href={"/backofficeapp/setting"}
            style={{ textDecoration: "none" }}
          >
            <ListItem sx={{ color: "#674636" }} disablePadding>
              <ListItemButton>
                <ListItemIcon>{<SettingsIcon />}</ListItemIcon>
                <ListItemText primary={"Settings"} />
              </ListItemButton>
            </ListItem>
          </Link>
        }
      </List>
    </Box>
  );
};

export default SideBarApp;
