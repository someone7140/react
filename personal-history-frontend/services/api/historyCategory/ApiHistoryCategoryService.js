import axios from "axios";

// 自分のカテゴリー情報を取得
export async function getMyCategory(authToken) {
  try {
    const result = await axios.get(
      `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/historyCategory/getMyCategory`,
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

// カテゴリー情報を登録
export async function registerCategory(
  authToken,
  categories,
  deleteCategoryIds
) {
  try {
    await axios.post(
      `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/historyCategory/registerCategory`,
      { categories: categories, deleteCategoryIds: deleteCategoryIds },
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        withCredentials: true,
      }
    );
    return { status: 200, data: true };
  } catch (e) {
    return { status: e.response.status };
  }
}
