interface ConfigType {
  googleId: string;
  googleSecret: string;
  backOfficeAppApiBaseUrl: string;
}
export const config: ConfigType = {
  googleId: process.env.GOOGLE_CLIENT_ID || "",
  googleSecret: process.env.GOOGLE_CLIENT_SECRET || "",
  backOfficeAppApiBaseUrl: process.env.NEXT_PUBLIC_Backoffice_Api_BaseUrl || "",
};
