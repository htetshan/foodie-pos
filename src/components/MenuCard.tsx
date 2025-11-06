import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import { Menu } from "@prisma/client";
import Link from "next/link";
import { Box } from "@mui/material";
import PaidIcon from "@mui/icons-material/Paid";

interface Props {
  menu: Menu;
  href: string;
  isAvailable?: boolean;
}
export default function MenuCard({ menu, href, isAvailable }: Props) {
  return (
    <Box sx={{ m: 2 }}>
      <Link href={href} style={{ textDecoration: "none" }}>
        <Card
          sx={{
            bgcolor: "lightblue",
            width: { xs: 280, sm: 330 },
            height: { xs: 220, sm: 260 },

            opacity: isAvailable ? 1 : 0.4,
          }}
        >
          <CardActionArea>
            <CardMedia
              component="img"
              sx={{
                height: { xs: 140, sm: 180 },
                objectFit: "fill",
                p: 0.3,
              }}
              image={menu.assetUrl || ""}
              alt={menu.name}
            />
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                p: { xs: 1, sm: 2 },
              }}
            >
              <Typography noWrap sx={{ fontSize: { xs: 18, sm: 20 } }}>
                {menu.name}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                <PaidIcon color="success" />
                <Typography
                  sx={{ m: 0, fontWeight: "bold", fontStyle: "italic" }}
                >
                  {menu.price}
                </Typography>
              </Box>
            </CardContent>
          </CardActionArea>
        </Card>
      </Link>
    </Box>
  );
}
