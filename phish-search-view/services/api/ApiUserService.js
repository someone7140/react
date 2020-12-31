import { getClient } from "./CommonApiService";

// ログイン
export async function loginUser(email, password, setErrorFlg, setUser) {
  try {
    const params = new URLSearchParams();
    params.append("email", email);
    params.append("password", password);
    const resultLogin = await getClient().post(
      `${process.env.API_DOMAIN}/login`,
      params,
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        withCredentials: true,
      }
    );
    if (resultLogin.status === 200) {
      const resultUser = await getClient().get(
        `${process.env.API_DOMAIN}/login_user_info`
      );
      if (resultUser.status === 200) {
        setUser({ loginUser: resultUser.data });
      } else {
        setErrorFlg(true);
      }
    } else {
      setErrorFlg(true);
    }
  } catch (_) {
    setErrorFlg(true);
  }
}

// ログアウト
export async function logoutUser() {
  try {
    await getClient().post(
      `${process.env.API_DOMAIN}/logout`,
      {},
      {
        withCredentials: true,
      }
    );
  } catch (_) {
    // エラー発生時は何もしない
  }
}

// 会員登録
export async function createUser(email, name, password, setErrorFlg) {
  try {
    const result = await getClient().post(
      `${process.env.API_DOMAIN}/user_registration`,
      {
        email: email,
        name: name,
        password: password,
      },
      {
        withCredentials: true,
      }
    );
    if (result.status === 200) {
      setErrorFlg(false);
    } else {
      setErrorFlg(true);
    }
  } catch (_) {
    setErrorFlg(true);
  }
}

// メール認証
export async function authUser(userId, token, password, setErrorFlg, setUser) {
  try {
    const result = await getClient().post(
      `${process.env.API_DOMAIN}/user_email_auth`,
      {
        userId: userId,
        token: token,
        password: password,
      },
      {
        withCredentials: true,
      }
    );
    if (result.status === 200) {
      setUser(result.data);
      setErrorFlg(false);
    } else {
      setErrorFlg(true);
    }
  } catch (_) {
    setErrorFlg(true);
  }
}

// userIdを指定した情報取得
export async function getUserInfoByUserId(userId, setErrorFlg, setUserInfo) {
  try {
    const result = await axios.get(
      `${process.env.API_DOMAIN}/user_info_ref?user_id=${userId}`,
      { withCredentials: true }
    );
    if (result.status === 200) {
      setErrorFlg(false);
      setUserInfo(result.data);
    } else {
      setErrorFlg(true);
    }
  } catch (_) {
    setErrorFlg(true);
  }
}
