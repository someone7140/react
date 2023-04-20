import axios from "axios";

// 小説設定のリストを取得
export async function getNovelSettingList(token, novelId) {
  const result = await axios.get(
    `${process.env.NEXT_PUBLIC_API_DOMAIN}/novel/novel_list?novelId=${novelId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return result.data;
}

// 小説設定のレコードを作成
export async function createNovelSetting(token, novelId, name, order) {
  await axios.post(
    `${process.env.NEXT_PUBLIC_API_DOMAIN}/novel/setting/create_novel`,
    {
      novelId,
      name,
      order,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}
