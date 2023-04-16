import axios from "axios";

// tokenによる認証
export async function authByToken(token) {
  const result = await axios.get(
    `${process.env.NEXT_PUBLIC_API_DOMAIN}/auth/auth_by_token`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return result.data;
}

// google認証による会員登録
export async function registerAuthByGoogleAuthCode(authCode) {
  const result = await axios.post(
    `${process.env.NEXT_PUBLIC_API_DOMAIN}/auth/register_by_google_auth_code`,
    {
      authCode,
    }
  );
  return result.data;
}

// google認証によるログイン
export async function loginByGoogleAuthCode(authCode) {
  const result = await axios.post(
    `${process.env.NEXT_PUBLIC_API_DOMAIN}/auth/login_by_google_auth_code`,
    {
      authCode,
    }
  );
  return result.data;
}
