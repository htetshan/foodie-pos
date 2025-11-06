import multer from "multer";
import { S3Client } from "@aws-sdk/client-s3";
import multerS3 from "multer-s3";
import { config } from "@/config";

// Create S3 client for MinIO
const s3Client = new S3Client({
  endpoint: config.minioEndpoint,
  region: "us-east-1",
  forcePathStyle: true, // Required for MinIO
  credentials: {
    accessKeyId: config.minioAcceptKeyId,
    secretAccessKey: config.minioSecretAcceptKey,
  },
});

// Multer-S3 setup
export const assetUploadFunction = multer({
  storage: multerS3({
    s3: s3Client,
    bucket: "miniohtet",
    acl: "public-read",
    key: (req, file, cb) => {
      const timestamp = Date.now();
      const safeName = file.originalname.replace(/\s+/g, "_");
      cb(null, `foodie/${timestamp}_${safeName}`);
    },
  }),
}).single("file");
