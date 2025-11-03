// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { assetUploadFunction } from "@/lib/assetUploadFunction";
import { Request, Response } from "express";
export const config = {
  api: {
    bodyParser: false,
  },
};
export default async function handler(req: Request, res: Response) {
  const method = req.method;
  if (method === "POST") {
    assetUploadFunction(req, res, (error) => {
      if (error) {
        return res.status(500).send("Internal Server Error.");
      }
      const file = req.file as Express.MulterS3.File;
      const assetUrl = file.location;
      return res.status(200).json({ assetUrl });
    });
  } else {
    res.status(405).send("Invalid Method");
  }
}
