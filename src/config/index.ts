interface ConfigType {
  googleId: string;
  googleSecret: string;
}
export const config: ConfigType = {
  googleId: process.env.GOOGLE_CLIENT_ID || "",
  googleSecret: process.env.GOOGLE_CLIENT_SECRET || "",
};
