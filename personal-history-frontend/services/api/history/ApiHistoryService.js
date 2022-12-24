import axios from "axios";

// 自分の経歴情報を取得
export async function getMyHistory(authToken) {
  try {
    const result = await axios.get(
      `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/history/getOwnHistories`,
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

// 経歴情報を登録
export async function registerHistory(
  authToken,
  id,
  categoryId,
  historyRecords
) {
  try {
    await axios.post(
      `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/history/registerHistory`,
      { id: id, categoryId: categoryId, historyRecords: historyRecords },
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
