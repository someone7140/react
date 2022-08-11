import axios from "axios";
import { separateCategoryKey } from "../common/CategoryService";

// アカウント情報を取得
export async function getInstagramAccount(
  instagramUserName,
  setError,
  setAccountInfo,
  user
) {
  try {
    const result = await axios.get(
      `${process.env.API_DOMAIN}/admin/getInstagramAccountInfo?instagram_user_name=${instagramUserName}`,
      {
        withCredentials: true,
        headers: { Authorization: user?.loginUser?.token },
      }
    );
    if (result.status === 200) {
      const data = result.data;
      setAccountInfo({
        ...separateCategoryKey(data.category),
        id: data._id,
        instagram_user_name: data.instagram_user_name,
        status: data.status,
      });
    } else {
      setError(true);
    }
  } catch (_) {
    setError(true);
  }
}

// 投稿付きのアカウント情報を取得
export async function getInstagramAccountWithPosts(
  instagramUserName,
  fiteringStatus,
  limit,
  setError,
  setAccountInfo,
  setPostLoading,
  user
) {
  try {
    const result = await axios.get(
      `${process.env.API_DOMAIN}/admin/getInstagramAccountWithPosts?limit=${limit}&instagram_user_name=${instagramUserName}&post_status=${fiteringStatus}`,
      {
        withCredentials: true,
        headers: { Authorization: user?.loginUser?.token },
      }
    );
    if (result.status === 200) {
      setAccountInfo(result.data);
    } else {
      setError(true);
    }
    setPostLoading(false);
  } catch (_) {
    setError(true);
    setPostLoading(false);
  }
}

// インスタグラムアカウントの追加
export async function addInstagramAccount(
  instagramUserName,
  gatherStatus,
  gender,
  silhouette,
  height,
  genre,
  setSuccess,
  user
) {
  try {
    const result = await axios.post(
      `${process.env.API_DOMAIN}/admin/addInstagramAccount`,
      {
        instagram_user_name: instagramUserName,
        status: gatherStatus,
        gender: gender,
        silhouette: silhouette,
        height: height,
        genre: genre,
      },
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
    setSuccess(false);
  }
}

// インスタグラムアカウントの編集
export async function editInstagramAccount(
  id,
  gatherStatus,
  gender,
  silhouette,
  height,
  genre,
  setSuccess,
  user
) {
  try {
    const result = await axios.post(
      `${process.env.API_DOMAIN}/admin/editInstagramAccount`,
      {
        id: id,
        status: gatherStatus,
        gender: gender,
        silhouette: silhouette,
        height: height,
        genre: genre,
      },
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
    setSuccess(false);
  }
}
