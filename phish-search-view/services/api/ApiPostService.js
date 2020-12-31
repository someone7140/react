import { getClient } from "./CommonApiService";

// postIdを指定した投稿取得
export async function getPostByPostId(postId, setErrorFlg, setPostDataList) {
  try {
    const result = await getClient().get(
      `${process.env.API_DOMAIN}/ref_post_phish_site?post_id=${postId}`
    );
    if (result.status === 200) {
      setErrorFlg(false);
      const data = result.data;
      setPostDataList({
        url: data.phishUrl,
        userId: data.postInfos[0].userId,
        userName: data.postInfos[0].userName,
        postContents: data.postInfos[0].postContents,
        postRegisterAt: data.postInfos[0].postRegisterAt,
      });
    } else {
      setErrorFlg(true);
    }
  } catch (_) {
    setErrorFlg(true);
  }
}

// userIdを指定した投稿取得
export async function getPostListByUserId(
  userId,
  setErrorFlg,
  setPostDataList
) {
  try {
    const result = await getClient().get(
      `${process.env.API_DOMAIN}/ref_user_posts?user_id=${userId}`
    );
    if (result.status === 200) {
      setErrorFlg(false);
      const data = result.data;
      setPostDataList(
        data.map((d) => {
          return {
            url: d.phishUrl,
            userId: d.postInfos[0].userId,
            userName: d.postInfos[0].userName,
            postContents: d.postInfos[0].postContents,
            postRegisterAt: d.postInfos[0].postRegisterAt,
          };
        })
      );
    } else {
      setErrorFlg(true);
    }
  } catch (_) {
    setErrorFlg(true);
  }
}
