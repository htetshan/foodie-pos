//if we come this path:http://localhost:3000/orderapp?tableId=2 show OrderApp(src>pages>orderapp>index.tsx) with OrderAppLayout.tsx

import { useAppSelector } from "@/store/hooks";
import { Box, Typography } from "@mui/material";

//if we come this path:http://localhost:3000/order show OrderApp(src>pages>orderapp>index.tsx) without OrderAppLayout.tsx

//that why i am now using MainLayout.tsx in that i am using query like: http://localhost:3000/order?tableId=2 -> {tableId: '2'}
//1. i catch query :tableId contain i show isOrderApp

const OrderApp = () => {
  const { menuCategories } = useAppSelector((state) => state.menuCategories);
  const { menus } = useAppSelector((state) => state.menus);
  const { locations } = useAppSelector((state) => state.locations);
  const { addonCategories } = useAppSelector((state) => state.addonCategory);
  return (
    <Box>
      <Typography>
        {locations.map(
          (item) => `locationId : ${item.id} and locationName : ${item.name}`
        )}
      </Typography>
      <Box sx={{ display: "flex", p: 3, m: 4 }}>
        <Box>
          <Typography>Menus are:</Typography>
          <Typography>
            {menus.map((item) => {
              return <Typography>{item.name}</Typography>;
            })}
          </Typography>
        </Box>

        <Box>
          <Typography>addonCategories are: </Typography>
          <Typography>
            {addonCategories.map((item) => {
              return <Typography>{item.name}</Typography>;
            })}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default OrderApp;
