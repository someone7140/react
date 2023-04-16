import axios from "axios";

// 小説のリストを取得
export async function getNovelList(token) {
  const result = await axios.get(
    `${process.env.NEXT_PUBLIC_API_DOMAIN}/novel/novel_list`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return result.data;
}

// 小説のレコードを作成
export async function createNovel(token, title) {
  await axios.post(
    `${process.env.NEXT_PUBLIC_API_DOMAIN}/novel/create_novel`,
    {
      title,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

// 小説のタイトルを編集
export async function updateNovelTitle(token, id, title) {
  await axios.post(
    `${process.env.NEXT_PUBLIC_API_DOMAIN}/novel/update_novel`,
    {
      id,
      title,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}
