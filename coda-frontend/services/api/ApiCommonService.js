import axios from "axios";

// masterの取得
export async function getMasterApi(setMaster) {
  try {
    const result = await axios.get(`${process.env.API_DOMAIN}/getMaster`, {
      withCredentials: true,
    });
    if (result.status === 200) {
      setMaster({ master: result.data });
    }
  } catch (_) {
    // エラーの時は何もしない
  }
}
