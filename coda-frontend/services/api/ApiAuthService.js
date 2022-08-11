import axios from "axios";
import { setCookie } from "nookies";

// メールログイン
export async function loginEmailApi(
  email,
  password,
  setError,
  setUser,
  setLoading
) {
  try {
    setLoading(true);
    const result = await axios.post(
      `${process.env.API_DOMAIN}/authByEmail`,
      {
        email: email,
        password: password,
      },
      {
        withCredentials: true,
      }
    );
    if (result.status === 200) {
      setUser({ loginUser: result.data });
    } else {
      setError(true);
    }
    setLoading(false);
  } catch (_) {
    setLoading(false);
    setError(true);
  }
}

// Googleログイン
export async function loginGoogleApi(idToken, setError, setUser) {
  try {
    const result = await axios.post(
      `${process.env.API_DOMAIN}/authByGoogle`,
      {
        google_id_token: idToken,
      },
      {
        withCredentials: true,
      }
    );
    if (result.status === 200) {
      setUser({ loginUser: result.data });
    } else {
      setError(true);
    }
  } catch (_) {
    setError(true);
  }
}

// Facebookログイン
export async function loginFacebookApi(accessToken, setError, setUser) {
  try {
    const result = await axios.post(
      `${process.env.API_DOMAIN}/authByFacebook`,
      {
        facebook_access_token: accessToken,
      },
      {
        withCredentials: true,
      }
    );
    if (result.status === 200) {
      setUser({ loginUser: result.data });
    } else {
      setError(true);
    }
  } catch (_) {
    setError(true);
  }
}

// ログインチェック
export async function authCheckApi(user, setUser, ctx, setAuthCheck) {
  if (user?.loginUser) {
    try {
      const result = await axios.post(
        `${process.env.API_DOMAIN}/loggedIn/authCheck`,
        {},
        {
          withCredentials: true,
          headers: { Authorization: user?.loginUser?.token },
        }
      );
      if (result.status === 200) {
        // 何もしない
      } else {
        setUser("");
        authCookieDelete(ctx);
      }
    } catch (_) {
      setUser("");
      authCookieDelete(ctx);
    }
  }
  setAuthCheck({ checked: true });
}

export function authCookieDelete(ctx) {
  setCookie(ctx, "user", undefined, {
    path: "/",
    maxAge: 0, // 削除
  });
}
