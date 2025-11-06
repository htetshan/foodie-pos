// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { assetUploadFunction } from "@/lib/assetUploadFunction";
import { Request, Response } from "express";
export const config = {
  api: {
    bodyParser: false,
  },
};
interface S3File extends Express.Multer.File {
  location: string;
}

export default async function handler(req: Request, res: Response) {
  const method = req.method;
  if (method === "POST") {
    assetUploadFunction(req, res, (error) => {
      if (error) {
        console.error("Multer error:", error);
        return res.status(500).send("Internal Server Error.");
      }
      if (!req.file) {
        console.error("No file uploaded");
        return res.status(400).send("No file uploaded");
      }
      const file = req.file as S3File;
      const assetUrl = file.location;
      console.log("assetUrl", assetUrl);

      return res.status(200).json({ assetUrl });
    });
  } else {
    res.status(405).send("Invalid Method");
  }
}
