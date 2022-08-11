import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

import { loginUserState } from "../../atoms/LoginUser";
import { getFavoritedCoordinatePosts } from "../../services/api/ApiCoordinateService";
import { getShopList } from "../../services/api/ApiShopService";
import CoordinatePostListComponent from "./show/CoordinatePostListComponent";

export default function CoordinateFavoriteComponent() {
  const [user, setUser] = useRecoilState(loginUserState);
  const [error, setError] = useState(false);
  const [coordinatePosts, setCoordinatePosts] = useState(undefined);
  const [shops, setShops] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [loadingShop, setLoadingShop] = useState(false);

  useEffect(() => {
    getShopList(setError, setShops, setLoadingShop);
    getFavoritedCoordinatePosts(setError, setCoordinatePosts, user, setLoading);
  }, []);

  return (
    <>
      <h4>【いいねした投稿】</h4>
      {!error && !loading && !loadingShop && coordinatePosts && (
        <CoordinatePostListComponent
          coordinatePosts={coordinatePosts}
          shops={shops}
        />
      )}
      {loading && (
        <div>
          <img src="/loading.gif" />
        </div>
      )}
      {error && !loading && (
        <div className="text-danger mt-2">
          投稿が取得できませんでした。再度トップ画面からアクセスしてください。
        </div>
      )}
    </>
  );
}
