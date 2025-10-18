import * as React from "react";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { Paper } from "@mui/material";

interface Props {
  icon: React.ReactNode;
  title: string;
  href: string;
  isAvailable?: boolean;
  subtitle?: string;
}
export default function ActionAreaCard({
  icon,
  title,
  href,
  isAvailable,
}: Props) {
  return (
    <Link href={href} style={{ textDecoration: "none", color: "#000000" }}>
      <Paper
        elevation={2}
        sx={{
          width: 170,
          height: 170,
          p: 2,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          m: 2,
          cursor: "pointer",
          opacity: isAvailable ? 1 : 0.4,
        }}
      >
        {icon}
        <Typography sx={{ fontWeight: "700" }}>{title}</Typography>
      </Paper>
    </Link>
  );
}
