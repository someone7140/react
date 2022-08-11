import axios from "axios";

// メール認証登録
export async function registerEmailAuthApi(
  email,
  password,
  setError,
  setEmailRegistered,
  setLoading
) {
  try {
    setLoading(true);
    const result = await axios.post(
      `${process.env.API_DOMAIN}/authEmailRegister`,
      {
        email: email,
        password: password,
      },
      {
        withCredentials: true,
      }
    );
    if (result.status === 200) {
      setEmailRegistered(true);
    } else {
      setError(true);
    }
    setLoading(false);
  } catch (_) {
    setLoading(false);
    setError(true);
  }
}

// メールトークン認証
export async function emailTokenAuthApi(
  userId,
  password,
  token,
  setError,
  setAuth
) {
  try {
    const result = await axios.post(
      `${process.env.API_DOMAIN}/authEmailToken`,
      {
        user_id: userId,
        password: password,
        token: token,
      },
      {
        withCredentials: true,
      }
    );
    if (result.status === 200) {
      setAuth(true);
    } else {
      setError(true);
    }
  } catch (_) {
    setError(true);
  }
}

// パスワード変更
export async function changePassswordApi(
  password,
  setError,
  setSuccess,
  user,
  setLoading
) {
  try {
    setLoading(true);
    const result = await axios.post(
      `${process.env.API_DOMAIN}/loggedIn/changePassword`,
      {
        password: password,
      },
      {
        withCredentials: true,
        headers: { Authorization: user?.loginUser?.token },
      }
    );
    if (result.status === 200) {
      setSuccess(true);
    } else {
      setError(true);
    }
    setLoading(false);
  } catch (_) {
    setLoading(false);
    setError(true);
  }
}

// パスワードリセット登録
export async function registerPasswordResetApi(
  email,
  setError,
  setSuccess,
  setLoading
) {
  try {
    setLoading(true);
    const result = await axios.post(
      `${process.env.API_DOMAIN}/registerPasswordReset`,
      {
        email: email,
      },
      {
        withCredentials: true,
      }
    );
    if (result.status === 200) {
      setSuccess(true);
    } else {
      setError(true);
    }
    setLoading(false);
  } catch (_) {
    setLoading(false);
    setError(true);
  }
}

// パスワードリセット更新
export async function passwordResetUpdateApi(
  password,
  userId,
  token,
  setError,
  setSuccess,
  setLoading
) {
  try {
    setLoading(true);
    const result = await axios.post(
      `${process.env.API_DOMAIN}/passwordResetUpdate`,
      {
        user_id: userId,
        password: password,
        token: token,
      },
      {
        withCredentials: true,
      }
    );
    if (result.status === 200) {
      setSuccess(true);
    } else {
      setError(true);
    }
    setLoading(false);
  } catch (_) {
    setLoading(false);
    setError(true);
  }
}
