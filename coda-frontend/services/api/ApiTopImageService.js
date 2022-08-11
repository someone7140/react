import axios from "axios";

// トップの画像一覧を取得
export async function getTopRecentImages(
  setError,
  setTopImages,
  setLoading,
  user
) {
  try {
    const result = await axios.get(
      `${process.env.API_DOMAIN}/getTopRecentImages`,
      {
        withCredentials: true,
        headers: { Authorization: user?.loginUser?.token },
      }
    );
    if (result.status === 200) {
      setTopImages(result.data);
    } else {
      setError(true);
    }
  } catch (_) {
    setError(true);
  }
  setLoading(false);
}
