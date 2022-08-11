import axios from "axios";

// ショップの一覧を取得
export async function getShopList(setError, setShops, setLoading) {
  setLoading(true);
  try {
    const result = await axios.get(`${process.env.API_DOMAIN}/getShopList`, {
      withCredentials: true,
    });
    if (result.status === 200) {
      setShops(result.data);
      setError(false);
    } else {
      setError(true);
    }
  } catch (_) {
    setError(true);
  }
  setLoading(false);
}

// ショップの追加
export async function addShop(
  request,
  setSuccess,
  setErrorCode,
  setLoading,
  user
) {
  setLoading(true);
  try {
    const result = await axios.post(
      `${process.env.API_DOMAIN}/admin/addShop`,
      request,
      {
        withCredentials: true,
        headers: { Authorization: user?.loginUser?.token },
      }
    );
    if (result.status === 200) {
      setSuccess(true);
      setErrorCode(false);
    } else {
      setSuccess(false);
      setErrorCode(true);
    }
  } catch (_) {
    setSuccess(false);
    setErrorCode(true);
  }
  setLoading(false);
}

// ショップの更新
export async function updateShop(
  request,
  setErrorCode,
  setSuccess,
  setLoading,
  user
) {
  setLoading(true);
  try {
    const result = await axios.post(
      `${process.env.API_DOMAIN}/admin/updateShop`,
      request,
      {
        withCredentials: true,
        headers: { Authorization: user?.loginUser?.token },
      }
    );
    if (result.status === 200) {
      setSuccess(true);
      setErrorCode(false);
    } else {
      setSuccess(false);
      setErrorCode(true);
    }
  } catch (_) {
    setSuccess(false);
    setErrorCode(true);
  }
  setLoading(false);
}

// ショップの削除
export async function deleteShop(
  shopSettingId,
  setSuccess,
  setError,
  setLoading,
  user
) {
  try {
    setLoading(true);
    const result = await axios.post(
      `${process.env.API_DOMAIN}/admin/deleteShop`,
      { shop_setting_id: shopSettingId },
      {
        withCredentials: true,
        headers: { Authorization: user?.loginUser?.token },
      }
    );
    if (result.status === 200) {
      setSuccess(true);
      setError(false);
    } else {
      setSuccess(false);
      setError(true);
    }
  } catch (_) {
    setSuccess(false);
    setError(true);
  }
  setLoading(false);
}
