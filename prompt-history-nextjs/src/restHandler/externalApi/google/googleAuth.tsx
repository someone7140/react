import * as GoogleAuth from "google-auth-library";

export const googleAuthByCode = async (authCode: string) => {
  const oAuth2Client = new GoogleAuth.OAuth2Client(
    process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
    process.env.GOOGLE_AUTH_SECRET,
    process.env.NEXT_PUBLIC_API_NEXTJS_DOMAIN
  );
  const tokenResponse = await oAuth2Client.getToken(authCode);
  oAuth2Client.setCredentials(tokenResponse.tokens);

  return await oAuth2Client.getTokenInfo(
    oAuth2Client.credentials.access_token ?? ""
  );
};
