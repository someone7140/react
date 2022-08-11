import axios from "axios";

// コーデの最新投稿一覧を取得
export async function getRecentCoordinateList(
  setError,
  setCoordinates,
  setLoading,
  adminFlag,
  user
) {
  setLoading(true);
  try {
    const header = user?.loginUser
      ? {
          withCredentials: true,
          headers: { Authorization: user?.loginUser?.token },
        }
      : {};
    const result = adminFlag
      ? await axios.get(
          `${process.env.API_DOMAIN}/admin/getRecentCoordinatePostsForAdmin`,
          header
        )
      : await axios.get(
          `${process.env.API_DOMAIN}/getRecentCoordinatePosts`,
          header
        );
    if (result.status === 200) {
      setCoordinates(result.data);
      setError(false);
    } else {
      setError(true);
    }
  } catch (_) {
    setError(true);
  }
  setLoading(false);
}

// コーデの投稿を検索
export async function getSearchCoordinateList(
  searchInfo,
  setError,
  setCoordinates,
  setLoading,
  adminFlag,
  user
) {
  setLoading(true);
  try {
    const header = user?.loginUser
      ? {
          withCredentials: true,
          headers: { Authorization: user?.loginUser?.token },
        }
      : {};
    const result = adminFlag
      ? await axios.post(
          `${process.env.API_DOMAIN}/admin/getCoordinatePostsSearchForAdmin`,
          searchInfo,
          header
        )
      : await axios.post(
          `${process.env.API_DOMAIN}/getCoordinatePostsSearch`,
          searchInfo,
          header
        );
    if (result.status === 200) {
      setCoordinates(result.data);
      setError(false);
    } else {
      setError(true);
    }
  } catch (_) {
    setError(true);
  }
  setLoading(false);
}

// ID指定してコーデ投稿を取得
export async function getCoordinateById(
  coordinateId,
  setError,
  setCoordinate,
  setLoading,
  user
) {
  setLoading(true);
  try {
    const result = await axios.get(
      `${process.env.API_DOMAIN}/getCoordinateByPostID?post_id=${coordinateId}`,
      user?.loginUser
        ? {
            withCredentials: true,
            headers: { Authorization: user?.loginUser?.token },
          }
        : {}
    );
    if (result.status === 200) {
      if (result.data) {
        setCoordinate(result.data);
      }
    } else {
      setError(true);
    }
  } catch (_) {
    setError(true);
  }
  setLoading(false);
}

// いいねしたコーデの投稿一覧を取得
export async function getFavoritedCoordinatePosts(
  setError,
  setCoordinates,
  user,
  setLoading
) {
  setLoading(true);
  try {
    const header = user?.loginUser
      ? {
          withCredentials: true,
          headers: { Authorization: user?.loginUser?.token },
        }
      : {};
    const result = await axios.get(
      `${process.env.API_DOMAIN}/loggedIn/getFavoritedCoordinatePosts`,
      header
    );
    if (result.status === 200) {
      setCoordinates(result.data);
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
export async function updateImpressionCountToCoordinatePost(request) {
  try {
    await axios.post(
      `${process.env.API_DOMAIN}/updateImpressionPostCoordinate`,
      {
        post_ids: request,
      }
    );
  } catch (_) {
    // エラーはスルー
  }
}

// クリックのカウント
export async function updateClickCountToCoordinatePost(request) {
  try {
    await axios.post(`${process.env.API_DOMAIN}/updateClickPostCoordinate`, {
      post_id: request,
    });
  } catch (_) {
    // エラーはスルー
  }
}

// 購入申請のカウント
export async function updatePurchaseRequestCountToCoordinatePost(request) {
  try {
    await axios.post(`${process.env.API_DOMAIN}/updatePurchaseRequestCount`, {
      post_id: request,
    });
  } catch (_) {
    // エラーはスルー
  }
}

// いいねの更新
export async function updteCoordinateFavorite(postId, user) {
  try {
    await axios.post(
      `${process.env.API_DOMAIN}/loggedIn/updateFavoriteCoordinatePost`,
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

// コーデの新規投稿
export async function newCoordinatePost(
  request,
  setSuccess,
  setError,
  setLoading,
  user
) {
  setLoading(true);
  try {
    const formData = registerRequestToSubmitData(request);
    const result = await axios.post(
      `${process.env.API_DOMAIN}/admin/addCoordinatePost`,
      formData,
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
      setError(false);
    } else {
      setError(true);
    }
  } catch (e) {
    setError(true);
  }
  setLoading(false);
}

// コーデ投稿の更新
export async function updateCoordinatePost(
  request,
  setSuccess,
  setError,
  setLoading,
  user
) {
  setLoading(true);
  try {
    const formData = registerRequestToSubmitData(request);
    const result = await axios.post(
      `${process.env.API_DOMAIN}/admin/updateCoordinatePost`,
      formData,
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
      setError(false);
    } else {
      setError(true);
    }
  } catch (_) {
    setError(true);
  }
  setLoading(false);
}

function registerRequestToSubmitData(request) {
  const submitData = new FormData();
  if (request._id) {
    submitData.append("_id", request._id);
  }
  if (request.title) {
    submitData.append("title", request.title);
  }
  if (request.shopSettingId) {
    submitData.append("shop_setting_id", request.shopSettingId);
  }
  if (request.url) {
    submitData.append("url", request.url);
  }
  if (request.status) {
    submitData.append("status", request.status);
  }
  if (request.detail) {
    submitData.append("detail", request.detail);
  }
  if (request.gender) {
    submitData.append("gender", request.gender);
  }
  if (request.silhouette) {
    submitData.append("silhouette", request.silhouette);
  }
  if (request.height) {
    submitData.append("height", request.height);
  }
  if (request.weight) {
    submitData.append("weight", request.weight);
  }
  if (request.deleteImageKeys && request.deleteImageKeys.length > 0) {
    submitData.append("delete_image_keys", request.deleteImageKeys);
  }
  if (request.size) {
    submitData.append("size", request.size);
  }
  if (request.price) {
    submitData.append("price", request.price);
  }
  if (request.category) {
    submitData.append("category", request.category);
  }
  if (request?.coordinateImages?.length > 0) {
    request.coordinateImages.forEach((c) => {
      const imageFile = c.file;
      const fileName = c.file.name;
      const fileExtention = fileName.substring(fileName.lastIndexOf(".") + 1);
      const blob = imageFile.slice(0, imageFile.size, imageFile.type);
      submitData.append(
        "coordinate_images[]",
        new File([blob], c.key + "." + fileExtention, {
          type: imageFile.type,
        })
      );
    });
  }
  if (
    request?.salePrice > 0 &&
    request?.saleStartDate &&
    request?.saleEndDate
  ) {
    submitData.append("sale[sale_price]", request?.salePrice);
    submitData.append("sale[start_date]", request?.saleStartDate.toISOString());
    submitData.append("sale[end_date]", request?.saleEndDate.toISOString());
  }
  return submitData;
}

// コーデ投稿の削除
export async function deleteCoordinatePost(
  coordinatePostId,
  setSuccess,
  setError,
  setLoading,
  user
) {
  try {
    setLoading(true);
    const result = await axios.post(
      `${process.env.API_DOMAIN}/admin/deleteCoordinatePost`,
      { coordinate_id: coordinatePostId },
      {
        withCredentials: true,
        headers: { Authorization: user?.loginUser?.token },
      }
    );
    if (result.status === 200) {
      setSuccess(true);
      setError(false);
    } else {
      setSuccess(false);
      setError(true);
    }
  } catch (_) {
    setSuccess(false);
    setError(true);
  }
  setLoading(false);
}
