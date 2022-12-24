import axios from "axios";

// google認証による会員登録
export async function registerAuthByGoogleAuthCode(authCode) {
  try {
    const result = await axios.post(
      `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/userAccount/registerByGoogleAuthCode`,
      {
        authCode,
      },
      {
        withCredentials: true,
      }
    );
    return { status: 200, data: result.data };
  } catch (e) {
    return { status: e.response.status };
  }
}

// google認証によるログイン
export async function loginByGoogleAuthCode(authCode) {
  try {
    const result = await axios.post(
      `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/login/loginByGoogleAuthCode`,
      {
        authCode,
      },
      {
        withCredentials: true,
      }
    );
    return { status: 200, data: result.data };
  } catch (e) {
    return { status: e.response.status };
  }
}

// twitter認証による会員登録
export async function registerAuthByTwitter(authCode, codeVerifier) {
  try {
    const result = await axios.post(
      `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/userAccount/registerByTwitterAuthCode`,
      {
        authCode,
        codeVerifier,
      },
      {
        withCredentials: true,
      }
    );
    return { status: 200, data: result.data };
  } catch (e) {
    return { status: e.response.status };
  }
}

// twitter認証によるログイン
export async function loginAuthByTwitter(authCode, codeVerifier) {
  try {
    const result = await axios.post(
      `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/login/loginByTwitterAuthCode`,
      {
        authCode,
        codeVerifier,
      },
      {
        withCredentials: true,
      }
    );
    return { status: 200, data: result.data };
  } catch (e) {
    return { status: e.response.status };
  }
}

// email認証による会員登録
export async function registerAuthByEmail(email, password) {
  try {
    const result = await axios.post(
      `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/userAccount/registerByEmail`,
      {
        email,
        password,
      },
      {
        withCredentials: true,
      }
    );
    return { status: 200, data: result.data };
  } catch (e) {
    return { status: e.response.status };
  }
}

// emailによるログイン
export async function loginByEmail(email, password) {
  try {
    const result = await axios.post(
      `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/login/loginByEmail`,
      {
        email,
        password,
      },
      {
        withCredentials: true,
      }
    );
    return { status: 200, data: result.data };
  } catch (e) {
    return { status: e.response.status };
  }
}

// 登録したemailの認証
export async function authRegisteredEmail(id, password) {
  try {
    const result = await axios.post(
      `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/userAccount/authEmailRegistered`,
      {
        id,
        password,
      },
      {
        withCredentials: true,
      }
    );
    return { status: 200, data: result.data };
  } catch (e) {
    return { status: e.response.status };
  }
}

// パスワード変更
export async function changePassword(authToken, password) {
  try {
    await axios.post(
      `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/userAccount/changePassword`,
      {
        password,
      },
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        withCredentials: true,
      }
    );
    return { status: 200 };
  } catch (e) {
    return { status: e.response.status };
  }
}
