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
import ClassIcon from "@mui/icons-material/Class";
import EggIcon from "@mui/icons-material/Egg";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import SettingsIcon from "@mui/icons-material/Settings";
import TableBarIcon from "@mui/icons-material/TableBar";
import Link from "next/link";

const SideBarApp = () => {
  const siderBarItems = [
    {
      id: 1,
      label: "Menu",
      icon: <RestaurantMenuIcon />,
      route: "/backofficeapp/menu",
    },
    {
      id: 2,
      label: "Menu Category",
      icon: <MenuBookIcon />,
      route: "/backofficeapp/menu-category",
    },
    {
      id: 3,
      label: "Location",
      icon: <AddLocationAltIcon />,
      route: "/backofficeapp/location",
    },
    {
      id: 4,
      label: "Addon Categories",
      icon: <ClassIcon />,
      route: "/backofficeapp/addon-category",
    },
    {
      id: 5,
      label: "Addons",
      icon: <EggIcon />,
      route: "/backofficeapp/addon",
    },
    {
      id: 6,
      label: "Tables",
      icon: <TableBarIcon />,
      route: "/backofficeapp/table",
    },
    {
      id: 7,
      label: "Orders",
      icon: <LocalMallIcon />,
      route: "/backofficeapp/order",
    },
  ];
  return (
    <Box>
      <List>
        {siderBarItems.map((item) => (
          <Link
            href={item.route}
            key={item.id}
            style={{ textDecoration: "none" }}
          >
            <ListItem sx={{ color: "#674636" }} disablePadding>
              <ListItemButton>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} />
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
