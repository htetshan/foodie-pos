interface ConfigType {
  googleId: string;
  googleSecret: string;
  backOfficeAppApiBaseUrl: string;
  minioEndpoint: string;
  minioAcceptKeyId: string;
  minioSecretAcceptKey: string;
}
export const config: ConfigType = {
  googleId: process.env.GOOGLE_CLIENT_ID || "",
  googleSecret: process.env.GOOGLE_CLIENT_SECRET || "",
  backOfficeAppApiBaseUrl: process.env.NEXT_PUBLIC_Backoffice_Api_BaseUrl || "",
  minioEndpoint: process.env.MINIO_ENDPOINT || "",
  minioAcceptKeyId: process.env.MINIO_ACCESS_KEY_ID || "",
  minioSecretAcceptKey: process.env.MINIO_SECRET_ACCESS_KEY || "",
};
