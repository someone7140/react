import axios from "axios";

// 小説内容を取得
export async function getNovelContents(token, novelId) {
  const result = await axios.get(
    `${process.env.NEXT_PUBLIC_API_DOMAIN}/novel/contents/contents_by_novel_id?novelId=${novelId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return result.data;
}

// 小説内容の更新
export async function updateNovelContents(
  token,
  contentId,
  contentRecords,
  contentHeadlines
) {
  await axios.post(
    `${process.env.NEXT_PUBLIC_API_DOMAIN}/novel/contents/update_contents`,
    {
      contentId,
      contentRecords,
      contentHeadlines,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}
