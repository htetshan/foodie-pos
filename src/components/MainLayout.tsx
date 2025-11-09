import { ReactNode } from "react";
import { useRouter } from "next/router";
import { Box } from "@mui/material";
import BackofficeLayout from "./BackofficeLayout";
import OrderAppLayout from "./OrderAppLayout";

interface Props {
  children: ReactNode;
}
const MainLayout = ({ children }: Props) => {
  const router = useRouter();
  const query = router.query; //for orderApp => http://localhost:3000/order?tableId=2 -> {tableId: '2'}
  const { tableId } = query;
  const pathname = router.pathname;

  const isBackOfficeApp = pathname.includes("backofficeapp");
  const isOrderApp = tableId;
  if (isBackOfficeApp) {
    return <BackofficeLayout>{children}</BackofficeLayout>;
  }
  if (isOrderApp) {
    return <OrderAppLayout>{children}</OrderAppLayout>;
  }
  return <Box>{children}</Box>;
};

export default MainLayout;
