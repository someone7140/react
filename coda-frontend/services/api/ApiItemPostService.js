import axios from "axios";

//  URLからOGPを取得する
export async function getOgpFromUrl(url, setOgp) {
  try {
    const result = await axios.post(`${process.env.API_DOMAIN}/getOgpByURL`, {
      url: url,
    });
    if (result.status === 200) {
      setOgp(result.data);
    } else {
      setOgp(undefined);
    }
  } catch (_) {
    setOgp(undefined);
  }
}

//  URLとアイテム投稿IDからOGPを取得する
export async function getOgpsFromItemPostIdAndUrl(
  request,
  setOgpInfo,
  setError,
  setLoading,
  loadingFlag
) {
  setError(false);
  if (loadingFlag) {
    setLoading(true);
  }

  try {
    const result = await axios.post(
      `${process.env.API_DOMAIN}/getOgpsByItempostIDAndURL`,
      request
    );
    if (result.status === 200) {
      setOgpInfo(result.data);
    } else {
      setOgpInfo(undefined);
    }
    if (loadingFlag) {
      setLoading(false);
    }
  } catch (_) {
    setOgpInfo(undefined);
    setError(true);
    if (loadingFlag) {
      setLoading(false);
    }
  }
}

// 新規アイテム投稿
export async function newItemPost(
  request,
  setSuccess,
  setError,
  setPostLoading,
  user
) {
  try {
    setPostLoading(true);
    const result = await axios.post(
      `${process.env.API_DOMAIN}/loggedIn/addItemPost`,
      registerRequestToSubmitData(request),
      {
        withCredentials: true,
        headers: {
          "content-type": "multipart/form-data",
          Authorization: user?.loginUser?.token,
        },
      }
    );
    if (result.status === 200) {
      setSuccess(true);
      setPostLoading(false);
    } else {
      setSuccess(false);
      setError(true);
      setPostLoading(false);
    }
  } catch (_) {
    setSuccess(false);
    setError(true);
    setPostLoading(false);
  }
}

// アイテム編集
export async function uodateItemPost(
  request,
  setSuccess,
  setError,
  setPostLoading,
  user
) {
  try {
    setPostLoading(true);
    const result = await axios.post(
      `${process.env.API_DOMAIN}/loggedIn/updateItemPost`,
      registerRequestToSubmitData(request),
      {
        withCredentials: true,
        headers: {
          "content-type": "multipart/form-data",
          Authorization: user?.loginUser?.token,
        },
      }
    );
    if (result.status === 200) {
      setSuccess(true);
      setPostLoading(false);
    } else {
      setSuccess(false);
      setError(true);
      setPostLoading(false);
    }
  } catch (_) {
    setSuccess(false);
    setError(true);
    setPostLoading(false);
  }
}

//
function registerRequestToSubmitData(request) {
  const submitData = new FormData();
  if (request.title) {
    submitData.append("title", request.title);
  }
  if (request.detail) {
    submitData.append("detail", request.detail);
  }
  if (request.item_type) {
    submitData.append("item_type", request.item_type);
  }
  if (request.url) {
    submitData.append("url", request.url);
  }
  if (request.status) {
    submitData.append("status", request.status);
  }
  if (request.gender) {
    submitData.append("gender", request.gender);
  }
  if (request.silhouette) {
    submitData.append("silhouette", request.silhouette);
  }
  if (request.complex) {
    submitData.append("complex", request.complex);
  }
  if (request._id) {
    submitData.append("_id", request._id);
  }
  if (request?.itemImage?.length > 0) {
    submitData.append("item_image", request?.itemImage[0]);
  }
  return submitData;
}

// アイテム削除
export async function deleteItemPost(
  itemPostId,
  setSuccess,
  setError,
  setPostLoading,
  user
) {
  try {
    setPostLoading(true);
    const result = await axios.post(
      `${process.env.API_DOMAIN}/loggedIn/deleteItemPost`,
      { post_id: itemPostId },
      {
        withCredentials: true,
        headers: { Authorization: user?.loginUser?.token },
      }
    );
    if (result.status === 200) {
      setSuccess(true);
      setPostLoading(false);
    } else {
      setSuccess(false);
      setError(true);
      setPostLoading(false);
    }
  } catch (_) {
    setSuccess(false);
    setError(true);
    setPostLoading(false);
  }
}

// ユーザ指定の投稿を取得
export async function getItemPostsByUser(
  userSettingId,
  setError,
  setItemPosts,
  user,
  setLoading
) {
  setLoading(true);
  try {
    const result = await axios.get(
      `${process.env.API_DOMAIN}/getItemsByUserID?user_setting_id=${userSettingId}`,
      user?.loginUser
        ? {
            withCredentials: true,
            headers: { Authorization: user?.loginUser?.token },
          }
        : {}
    );
    if (result.status === 200) {
      if (result.data) {
        setItemPosts(result.data);
      } else {
        setItemPosts([]);
      }
    } else {
      setError(true);
    }
  } catch (_) {
    setError(true);
  }
  setLoading(false);
}

// アイテムID指定の投稿を取得
export async function getItemPostByItemId(
  itemPostId,
  setError,
  setItemPost,
  user,
  setLoading
) {
  setLoading(true);
  try {
    const result = await axios.get(
      `${process.env.API_DOMAIN}/getItemByItemPostID?item_post_id=${itemPostId}`,
      user?.loginUser
        ? {
            withCredentials: true,
            headers: { Authorization: user?.loginUser?.token },
          }
        : {}
    );
    if (result.status === 200) {
      if (result.data) {
        setItemPost(result.data);
      } else {
        setItemPost(undefined);
        setError(true);
      }
    } else {
      setError(true);
    }
  } catch (_) {
    setError(true);
  }
  setLoading(false);
}

// ユーザに提示するアイテム投稿を取得
export async function getRecommendItemPosts(
  setError,
  setItemPosts,
  user,
  setLoading
) {
  setLoading(true);
  try {
    const result = await axios.get(
      `${process.env.API_DOMAIN}/getRecommendItemPosts`,
      {
        withCredentials: true,
        headers: { Authorization: user?.loginUser?.token },
      }
    );
    if (result.status === 200) {
      setItemPosts(result.data);
      setError(false);
    } else {
      setError(true);
    }
  } catch (_) {
    setError(true);
  }
  setLoading(false);
}

// アイテム投稿の検索
export async function getSearchItemPosts(
  searchInfo,
  setError,
  setItemPosts,
  user,
  setLoading
) {
  setLoading(true);
  try {
    const result = await axios.post(
      `${process.env.API_DOMAIN}/getItemPostsSearch`,
      searchInfo,
      {
        withCredentials: true,
        headers: { Authorization: user?.loginUser?.token },
      }
    );
    if (result.status === 200) {
      setItemPosts(result.data);
      setError(false);
    } else {
      setError(true);
    }
  } catch (_) {
    setError(true);
  }
  setLoading(false);
}

// いいねしたアイテム投稿を取得
export async function getFavoritedItemPosts(
  setError,
  setItemPosts,
  user,
  setLoading
) {
  setLoading(true);
  try {
    const result = await axios.get(
      `${process.env.API_DOMAIN}/loggedIn/getFavoritedItemPosts`,
      {
        withCredentials: true,
        headers: { Authorization: user?.loginUser?.token },
      }
    );
    if (result.status === 200) {
      setItemPosts(result.data);
      setError(false);
    } else {
      setError(true);
    }
  } catch (_) {
    setError(true);
  }
  setLoading(false);
}

// インプレッションのカウント
export async function updateImpressionCountToItemPosts(request) {
  try {
    await axios.post(`${process.env.API_DOMAIN}/updateImpressionPostItem`, {
      item_post_ids: request,
    });
  } catch (_) {
    // エラーはスルー
  }
}

// クリックのカウント
export async function updateClickCountToItemPost(request) {
  try {
    await axios.post(`${process.env.API_DOMAIN}/updateClickPostItem`, {
      item_post_id: request,
    });
  } catch (_) {
    // エラーはスルー
  }
}

// アイテム投稿のいいね更新
export async function updteItemPostFavorite(itemPostId, user) {
  try {
    await axios.post(
      `${process.env.API_DOMAIN}/loggedIn/updateFavoriteItemPost`,
      {
        item_post_id: itemPostId,
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
