import ItemCard from "@/components/ItemCard";
import { useAppSelector } from "@/store/hooks";
import { Box, Button } from "@mui/material";
import { useEffect, useState } from "react";
import TableBarIcon from "@mui/icons-material/TableBar";
import { jsPDF } from "jspdf";

import { CreateTableParam } from "@/types/table";
import NewTableDialog from "@/components/NewTableDialog";
const Tables = () => {
  const { tables } = useAppSelector((state) => state.table);
  const { selectedLocation } = useAppSelector((state) => state.app);

  const [open, setOpen] = useState<boolean>(false);
  const [newTable, setNewTable] = useState<CreateTableParam>({
    name: "",
    locationId: selectedLocation?.id,
  });
  useEffect(() => {
    if (selectedLocation) {
      setNewTable({ ...newTable, locationId: selectedLocation.id });
    }
  }, [selectedLocation]);
  const handleTableQRPrint = (assetQRUrl: string) => {
    const imageWindow = window.open("");
    imageWindow?.document.writeln(`<html >
<head>
    <title>TableQR Image</title>
</head>
<body style="text-align:center">
    <img src="${assetQRUrl}" onload="window.print();window.close()"/>
</body>
</html>`);
  };

  const handleTableQRPDF = (assetQRUrl: string) => {
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "pt",
      format: [300, 400], // small card size
    });

    doc.text("Table QR Code", 100, 40);
    doc.addImage(assetQRUrl, "PNG", 50, 60, 200, 200);
    doc.save("table-qr.pdf");
  };
  const handleTableQRPrintTwo = (assetQRUrl: string) => {
    const imageWindow = window.open("", "_blank", "width=600,height=800");
    imageWindow?.document.write(`
    <html>
      <head>
        <title>Table QR</title>
        <style>
          @page {
            margin: 0; /* removes extra page margins */
          }
          body {
            margin: 0;
            height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            font-family: sans-serif;
          }
          img {
            width: 300px;
            height: 300px;
            object-fit: contain;
          }
          h3 {
            margin: 10px 0 0;
          }
        </style>
      </head>
      <body>
        <h3>Table QR Code</h3>
        <img src="${assetQRUrl}" onload="window.print(); window.close();" />
      </body>
    </html>
  `);
    imageWindow?.document.close();
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          padding: 2,
        }}
      >
        <Button
          variant="contained"
          onClick={() => {
            setOpen(true);
          }}
        >
          New Table
        </Button>
      </Box>
      <NewTableDialog
        open={open}
        setOpen={setOpen}
        newTable={newTable}
        setNewTable={setNewTable}
      />
      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
        {tables.map((item) => {
          return (
            <Box
              key={item.id}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                p: 1,
              }}
            >
              <ItemCard
                icon={<TableBarIcon />}
                title={item.name}
                isAvailable
                href={`/backofficeapp/table/${item.id}`}
              />
              <Button
                variant="contained"
                sx={{ textTransform: "none", width: "92%", mt: 0.4 }}
                onClick={() => handleTableQRPrint(item.assetQRUrl as string)}
              >
                Print QR
              </Button>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default Tables;
