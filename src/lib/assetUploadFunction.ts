import multer from "multer";
import { S3Client } from "@aws-sdk/client-s3";
import multerS3 from "multer-s3";
import { config } from "@/config";
const s3Client = new S3Client({
  endpoint: config.minioEndpoint,
  region: "us-east-1",
  forcePathStyle: true,
  credentials: {
    accessKeyId: config.minioAcceptKeyId,
    secretAccessKey: config.minioSecretAcceptKey,
  },
});

export const assetUploadFunction = multer({
  storage: multerS3({
    s3: s3Client,
    bucket: "miniohtet",
    acl: "public-read",
    key: (request, file, cb) => {
      cb(null, `testfoodie/${Date.now()}_${file.originalname}`);
    },
  }),
}).single("file");
