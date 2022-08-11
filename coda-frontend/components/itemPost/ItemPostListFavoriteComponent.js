import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

import { loginUserState } from "../../atoms/LoginUser";
import { getFavoritedItemPosts } from "../../services/api/ApiItemPostService";
import CommonItemPostListComponent from "./show/CommonItemPostListComponent";

export default function ItemPostListFavoriteComponent() {
  const [user, setUser] = useRecoilState(loginUserState);
  const [error, setError] = useState(false);
  const [itemPosts, setItemPosts] = useState(undefined);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getFavoritedItemPosts(setError, setItemPosts, user, setLoading);
  }, []);

  return (
    <>
      <h4>【いいねした投稿】</h4>
      {!error && !loading && itemPosts && (
        <CommonItemPostListComponent itemPosts={itemPosts} />
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
