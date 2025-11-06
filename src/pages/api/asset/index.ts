import { assetUploadFunction } from "@/lib/uploadAssetFunction";
import { Request, Response } from "express";

export const config = {
  api: { bodyParser: false },
};

// Extend Multer file type to include location
interface S3File extends Express.Multer.File {
  location: string;
}

export default function handler(req: Request, res: Response) {
  if (req.method !== "POST") return res.status(405).send("Method Not Allowed");

  assetUploadFunction(req, res, (error) => {
    if (error) {
      console.error("Multer error:", error);
      return res
        .status(500)
        .json({ message: "Internal Server Error", error: error.message });
    }

    const file = req.file as S3File; // ✅ Now includes location
    if (!file) return res.status(400).json({ message: "No file uploaded" });

    const assetUrl = file.location; // ✅ Browser-ready URL
    console.log("assetUrl:", assetUrl);

    return res.status(200).json({ assetUrl });
  });
}
