import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { loginUserState } from "../../atoms/LoginUser";
import { getItemPostByItemId } from "../../services/api/ApiItemPostService";
import CommonItemPostListComponent from "./show/CommonItemPostListComponent";

export default function ItemPostListByItemIdComponent(prop) {
  const [user, setUser] = useRecoilState(loginUserState);
  const [error, setError] = useState(false);
  const [itemPost, setItemPost] = useState(undefined);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getItemPostByItemId(
      prop?.itemPostId,
      setError,
      setItemPost,
      user,
      setLoading
    );
  }, []);

  return (
    <>
      {!error && !loading && itemPost && (
        <CommonItemPostListComponent itemPosts={[itemPost]} />
      )}
      {loading && (
        <div>
          <img src="/loading.gif" />
        </div>
      )}
      {error && !loading && (
        <div className="text-danger">
          投稿が取得できませんでした。再度トップ画面からアクセスしてください。
        </div>
      )}
    </>
  );
}
