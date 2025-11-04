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
    bucket: config.minioBucket,
    acl: "public-read",
    key: (_req, file, cb) => {
      cb(null, `foodie/${Date.now()}_${file.originalname}`);
    },
  }),
}).single("file"); // Expect "file" in FormData
