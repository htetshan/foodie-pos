import { NextApiRequest, NextApiResponse } from "next";
import { assetUploadFunction } from "@/lib/uploadAssetFunction";

export const config = {
  api: { bodyParser: false }, // Important for file uploads
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).send("Method Not Allowed");

  // Cast req/res to any because Multer expects Express objects
  assetUploadFunction(req as any, res as any, (error: any) => {
    if (error) {
      console.error("Multer error:", error);
      return res
        .status(500)
        .json({ message: "Internal Server Error", error: error.message });
    }

    const file = (req as any).file; // Multer stores file here
    if (!file) return res.status(400).json({ message: "No file uploaded" });

    // Success! Return asset URL
    const assetUrl = file.location;
    return res.status(200).json({ assetUrl });
  });
}
