//if we come this path:http://localhost:3000/orderapp?tableId=2 show OrderApp(src>pages>orderapp>index.tsx) with OrderAppLayout.tsx

//if we come this path:http://localhost:3000/order show OrderApp(src>pages>orderapp>index.tsx) without OrderAppLayout.tsx

//that why i am now using MainLayout.tsx in that i am using query like: http://localhost:3000/order?tableId=2 -> {tableId: '2'}
//1. i catch query :tableId contain i show isOrderApp

const OrderApp = () => {
  return <h3>i am orderApp not layout</h3>;
};

export default OrderApp;
