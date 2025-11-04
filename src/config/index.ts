interface ConfigType {
  googleId: string;
  googleSecret: string;
  backOfficeAppApiBaseUrl: string;
  minioEndpoint: string;
  minioAcceptKeyId: string;
  minioSecretAcceptKey: string;
  minioBucket: string;
}
export const config: ConfigType = {
  googleId: process.env.GOOGLE_CLIENT_ID || "",
  googleSecret: process.env.GOOGLE_CLIENT_SECRET || "",
  backOfficeAppApiBaseUrl: process.env.NEXT_PUBLIC_Backoffice_Api_BaseUrl || "",
  minioEndpoint: "http://127.0.0.1:9000", // ✅ Must be API port
  minioAcceptKeyId: "minioadmin",
  minioSecretAcceptKey: "minioadmin",
  minioBucket: "miniohtet",
};
