import { Box } from "@mui/material";
import { useRouter } from "next/router";
import { ReactNode, useEffect } from "react";
interface Props {
  children: ReactNode;
}
const OrderAppLayout = ({ children }: Props) => {
  const router = useRouter();
  const { tableId } = router.query;
  useEffect(() => {
    if (tableId) {
      // get menu categories
    }
  }, [tableId]);
  return (
    <>
      <h1>this text is from OrderAppLayout catch with query: tableId</h1>
      <Box>{children}</Box>;
    </>
  );
};

export default OrderAppLayout;
