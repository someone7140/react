import axios from "axios";

// 会員登録
export async function registerUserAccount(
  userId,
  name,
  isAccountOpen,
  occupation,
  description,
  twitterUserName,
  instagramId,
  gitHubId,
  googleToken,
  twitterToken,
  emailToken,
  iconImage
) {
  try {
    const submitData = getFormDataForRegister(
      userId,
      name,
      isAccountOpen,
      occupation,
      description,
      twitterUserName,
      instagramId,
      gitHubId,
      googleToken,
      twitterToken,
      emailToken,
      iconImage
    );

    const result = await axios.post(
      `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/userAccount/registerUserAccount`,
      submitData,
      {
        headers: {
          "content-type": "multipart/form-data",
        },
        withCredentials: true,
      }
    );
    return { status: 200, data: result.data };
  } catch (e) {
    return { status: e.response.status };
  }
}

// 会員編集
export async function editUserAccount(
  authToken,
  userId,
  name,
  isAccountOpen,
  occupation,
  description,
  twitterUserName,
  instagramId,
  gitHubId,
  googleToken,
  twitterToken,
  emailToken,
  iconImage
) {
  try {
    const submitData = getFormDataForRegister(
      userId,
      name,
      isAccountOpen,
      occupation,
      description,
      twitterUserName,
      instagramId,
      gitHubId,
      googleToken,
      twitterToken,
      emailToken,
      iconImage
    );

    const result = await axios.post(
      `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/userAccount/editUserAccount`,
      submitData,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
          "content-type": "multipart/form-data",
        },
        withCredentials: true,
      }
    );
    return { status: 200, data: result.data };
  } catch (e) {
    return { status: e.response.status };
  }
}

// ユーザ登録用のフォーム取得
function getFormDataForRegister(
  userId,
  name,
  isAccountOpen,
  occupation,
  description,
  twitterUserName,
  instagramId,
  gitHubId,
  googleToken,
  twitterToken,
  emailToken,
  iconImage
) {
  const formDataForRegister = new FormData();
  formDataForRegister.append("userId", userId);
  formDataForRegister.append("name", name);
  formDataForRegister.append("isAccountOpen", isAccountOpen);
  if (occupation) {
    formDataForRegister.append("occupation", occupation);
  }
  if (description) {
    formDataForRegister.append("description", description);
  }
  if (twitterUserName) {
    formDataForRegister.append("twitterUserName", twitterUserName);
  }
  if (instagramId) {
    formDataForRegister.append("instagramId", instagramId);
  }
  if (gitHubId) {
    formDataForRegister.append("gitHubId", gitHubId);
  }
  if (googleToken) {
    formDataForRegister.append("googleToken", googleToken);
  }
  if (twitterToken) {
    formDataForRegister.append("twitterToken", twitterToken);
  }
  if (emailToken) {
    formDataForRegister.append("emailToken", emailToken);
  }
  if (iconImage) {
    formDataForRegister.append("iconImage", iconImage);
  }
  return formDataForRegister;
}

// 自分の会員情報を取得
export async function getMyUserInfo(authToken) {
  try {
    const result = await axios.get(
      `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/userAccount/getMyUserInfo`,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        withCredentials: true,
      }
    );
    return { status: 200, data: result.data };
  } catch (e) {
    return { status: e.response.status };
  }
}

// 公開されている情報を取得
export async function getOpenUserList() {
  try {
    const result = await axios.get(
      `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/userAccount/getOpenUserList`,
      {
        withCredentials: true,
      }
    );
    return { status: 200, data: result.data };
  } catch (e) {
    return { status: e.response.status };
  }
}
