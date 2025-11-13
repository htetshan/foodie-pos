interface ConfigType {
  googleId: string;
  googleSecret: string;
  backOfficeAppApiBaseUrl: string;
  orderAppApiBaseUrl: string;
  minioEndpoint: string;
  minioAcceptKeyId: string;
  minioSecretAcceptKey: string;
  orderAppUrl: string;
}
export const config: ConfigType = {
  googleId: process.env.GOOGLE_CLIENT_ID || "",
  googleSecret: process.env.GOOGLE_CLIENT_SECRET || "",

  backOfficeAppApiBaseUrl: process.env.NEXT_PUBLIC_Backoffice_Api_BaseUrl || "",
  orderAppApiBaseUrl: process.env.NEXT_PUBLIC_ORDER_Api_BaseUrl || "",
  orderAppUrl: process.env.NEXT_PUBLIC_ORDERAPP_URL || "",

  minioEndpoint: process.env.MINIO_ENDPOINT || "",
  minioAcceptKeyId: process.env.MINIO_ACCESS_KEY || "",
  minioSecretAcceptKey: process.env.MINIO_SECRET_KEY || "",
};
