import axios from "axios";

// 小説設定のリストを取得
export async function getNovelSettingList(token, novelId) {
  const result = await axios.get(
    `${process.env.NEXT_PUBLIC_API_DOMAIN}/novel/setting/setting_list?novelId=${novelId}`,
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

// 設定の名称を編集
export async function updateNovelSettingName(token, id, name) {
  await axios.post(
    `${process.env.NEXT_PUBLIC_API_DOMAIN}/novel/setting/update_setting_name`,
    {
      id,
      name,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

// ID指定で設定情報を編集
export async function getNovelSettingById(token, id, novelId) {
  const result = await axios.get(
    `${process.env.NEXT_PUBLIC_API_DOMAIN}/novel/setting/setting_by_id?id=${id}&novelId=${novelId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return result.data;
}
