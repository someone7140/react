import axios from "axios";

// GoogleIdTokenでユーザ登録可能かチェック
export async function registrationCheckByGoogleIdToken(
  googleIdToken,
  setCheckUserResult
) {
  try {
    const result = await axios.get(
      `${process.env.API_DOMAIN}/checkRegisterByGoogleLogin?id_token=${googleIdToken}`,
      {
        withCredentials: true,
      }
    );
    if (result.status === 200) {
      setCheckUserResult(true);
    } else {
      setCheckUserResult(false);
    }
  } catch (_) {
    setCheckUserResult(false);
  }
}

// facebookTokenでユーザ登録可能かチェック
export async function registrationCheckByFacebookAccessToken(
  facebookAccessToken,
  setCheckUserResult
) {
  try {
    const result = await axios.get(
      `${process.env.API_DOMAIN}/checkRegisterByFacebookLogin?access_token=${facebookAccessToken}`,
      {
        withCredentials: true,
      }
    );
    if (result.status === 200) {
      setCheckUserResult(true);
    } else {
      setCheckUserResult(false);
    }
  } catch (_) {
    setCheckUserResult(false);
  }
}

// ユーザの登録
export async function newRegistUser(
  request,
  setErrorCode,
  setUser,
  setLoading
) {
  try {
    setLoading(true);
    var result = undefined;
    const submitData = new FormData();
    submitData.append(
      "user_info[user_setting_id]",
      request?.userInput?.userSettingID
    );
    submitData.append("user_info[name]", request?.userInput?.name);
    submitData.append("user_info[gender]", request?.userInput?.gender);
    if (
      request?.userInput?.year &&
      request?.userInput?.month &&
      request?.userInput?.day
    ) {
      submitData.append(
        "user_info[birth_date]",
        request?.userInput?.year +
          "-" +
          request?.userInput?.month +
          "-" +
          request?.userInput?.day
      );
    }
    if (request?.userInput?.silhouette) {
      submitData.append(
        "user_info[silhouette]",
        request?.userInput?.silhouette
      );
    }
    if (request?.userInput?.height) {
      submitData.append(
        "user_info[height]",
        parseInt(request?.userInput?.height)
      );
    }
    if (request?.userInput?.weight) {
      submitData.append(
        "user_info[weight]",
        parseInt(request?.userInput?.weight)
      );
    }
    if (request?.userInput?.genres?.length > 0) {
      request?.userInput?.genres.forEach((g) => {
        submitData.append("user_info[genres][]", g);
      });
    }
    if (request?.userInput?.complexes?.length > 0) {
      request?.userInput?.complexes.forEach((c) => {
        submitData.append("user_info[complexes][]", c);
      });
    }
    if (request?.userInput?.iconImage?.length > 0) {
      submitData.append(
        "user_info[icon_image]",
        request?.userInput?.iconImage[0]
      );
    }
    // 経路によってAPIの投げ先をかえる
    if (request.userDetail) {
      result = await axios.post(
        `${process.env.API_DOMAIN}/loggedIn/updateUserInfo`,
        submitData,
        {
          headers: {
            "content-type": "multipart/form-data",
            Authorization: request?.userAuth?.loginUser?.token,
          },
          withCredentials: true,
        }
      );
    } else if (request.googleIdToken) {
      submitData.append("google_id_token", request.googleIdToken);
      result = await axios.post(
        `${process.env.API_DOMAIN}/registerByGoogleLogin`,
        submitData,
        {
          headers: {
            "content-type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
    } else if (request.facebookAccessToken) {
      submitData.append("facebook_access_token", request.facebookAccessToken);
      result = await axios.post(
        `${process.env.API_DOMAIN}/registerByFacebookLogin`,
        submitData,
        {
          headers: {
            "content-type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
    } else {
      submitData.append("user_id", request.userId);
      submitData.append("token", request.token);
      result = await axios.post(
        `${process.env.API_DOMAIN}/registerByEmailAuth`,
        submitData,
        {
          headers: {
            "content-type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
    }
    if (result.status === 200) {
      setUser({ loginUser: result.data });
      setErrorCode(undefined);
    } else {
      setErrorCode(result.status);
    }
    setLoading(false);
  } catch (e) {
    setLoading(false);
    setErrorCode(e.response.status);
  }
}

// ユーザの詳細を取得するAPI
export async function getUserDetail(setUserDetail, setError, user, setLoading) {
  setLoading(true);
  try {
    const result = await axios.get(
      `${process.env.API_DOMAIN}/loggedIn/getMyUserInfoDetail`,
      {
        withCredentials: true,
        headers: { Authorization: user?.loginUser?.token },
      }
    );
    if (result.status === 200) {
      setUserDetail(result.data);
    } else {
      setError(true);
    }
    setLoading(false);
  } catch (_) {
    setLoading(false);
    setError(true);
  }
}

// ユーザの削除を行うAPI
export async function deleteUser(setSuccess, user, setLoading) {
  try {
    setLoading(true);
    const result = await axios.post(
      `${process.env.API_DOMAIN}/loggedIn/deleteUser`,
      {},
      {
        withCredentials: true,
        headers: { Authorization: user?.loginUser?.token },
      }
    );
    if (result.status === 200) {
      setSuccess(true);
    } else {
      setSuccess(false);
    }
    setLoading(false);
  } catch (_) {
    setLoading(false);
    setSuccess(false);
  }
}
