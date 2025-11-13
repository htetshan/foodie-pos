import { useAppDispatch } from "@/store/hooks";
import { appFetchServer } from "@/store/slices/appSlice";
import { Box } from "@mui/material";
import { useRouter } from "next/router";
import { ReactNode, useEffect } from "react";
interface Props {
  children: ReactNode;
}
const OrderAppLayout = ({ children }: Props) => {
  const router = useRouter();
  const dispath = useAppDispatch();
  const { tableId } = router.query;
  useEffect(() => {
    if (tableId) {
      dispath(appFetchServer({ tableId: String(tableId) }));
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
