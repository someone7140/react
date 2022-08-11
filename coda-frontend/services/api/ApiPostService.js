import axios from "axios";

// 公開設定未設定の投稿を取得
export async function getNotsetPosts(
  limit,
  setError,
  setPosts,
  setPostLoading,
  user
) {
  try {
    const result = await axios.get(
      `${process.env.API_DOMAIN}/admin/getNotsetAllPosts?limit=${limit}`,
      {
        withCredentials: true,
        headers: { Authorization: user?.loginUser?.token },
      }
    );
    if (result.status === 200) {
      setPosts(result.data);
    } else {
      setError(true);
    }
    setPostLoading(false);
  } catch (_) {
    setError(true);
    setPostLoading(false);
  }
}

// 投稿のステータス更新
export async function updateStatusPosts(request, setSuccess, user) {
  try {
    const result = await axios.post(
      `${process.env.API_DOMAIN}/admin/setStatusPosts`,
      request,
      {
        withCredentials: true,
        headers: { Authorization: user?.loginUser?.token },
      }
    );
    if (result.status === 200) {
      setSuccess(true);
    } else {
      setSuccess(false);
    }
  } catch (_) {
    setSuccess(true);
  }
}

// ユーザに提示する投稿を取得
export async function getRecommendPosts(
  setError,
  setPosts,
  setPostLoading,
  user,
  selectGenre
) {
  setPostLoading(true);
  try {
    const result = await axios.get(
      selectGenre
        ? `${process.env.API_DOMAIN}/getRecommendPosts?genre=${selectGenre}`
        : `${process.env.API_DOMAIN}/getRecommendPosts`,
      {
        withCredentials: true,
        headers: { Authorization: user?.loginUser?.token },
      }
    );
    if (result.status === 200) {
      setPosts(result.data);
    } else {
      setError(true);
    }
    setPostLoading(false);
  } catch (_) {
    setError(true);
    setPostLoading(false);
  }
}

// いいねされた投稿を取得
export async function getFavoritedPosts(
  setError,
  setPosts,
  setPostLoading,
  user
) {
  try {
    const result = await axios.get(
      `${process.env.API_DOMAIN}/loggedIn/getFavoritedPosts`,
      {
        withCredentials: true,
        headers: { Authorization: user?.loginUser?.token },
      }
    );
    if (result.status === 200) {
      setPosts(result.data);
    } else {
      setError(true);
    }
    setPostLoading(false);
  } catch (_) {
    setError(true);
    setPostLoading(false);
  }
}

// いいねの更新
export async function updteFavorite(postId, user) {
  try {
    await axios.post(
      `${process.env.API_DOMAIN}/loggedIn/updateFavoritePost`,
      {
        post_id: postId,
      },
      {
        withCredentials: true,
        headers: { Authorization: user?.loginUser?.token },
      }
    );
  } catch (_) {
    // 何もしない
  }
}
