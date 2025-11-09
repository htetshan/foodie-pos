import multer from "multer";
import {
  ObjectCannedACL,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import multerS3 from "multer-s3";
import { config } from "@/config";
import QRCode from "qrcode";
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

export const generateLinkForQRCode = (tableId: number) => {
  return `${config.orderAppUrl}?tableId=${tableId}`;
};
export const qrCodeUploadFunction = async (tableId: number) => {
  try {
    const qrImageData = await QRCode.toDataURL(generateLinkForQRCode(tableId), {
      scale: 20,
    });
    //console.log("qrData:", qrImageData);

    const input = {
      Bucket: "miniohtet",
      Key: `qrcode/table-${tableId}.png`,
      ACL: ObjectCannedACL.public_read,
      Body: Buffer.from(
        qrImageData.replace(/^data:image\/\w+;base64,/, ""),
        "base64"
      ),
    };
    const command = new PutObjectCommand(input);
    await s3Client.send(command);
    return `http://127.0.0.1:9000/miniohtet/qrcode/table-${tableId}.png`;
  } catch (error) {}
};
