import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { loginUserState } from "../../atoms/LoginUser";
import { getCoordinateById } from "../../services/api/ApiCoordinateService";
import CoordinatePostListComponent from "./show/CoordinatePostListComponent";

export default function CoordinateByItemIdComponent(prop) {
  const [user, setUser] = useRecoilState(loginUserState);
  const [error, setError] = useState(false);
  const [coordinatePost, setCoordinatePost] = useState(undefined);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getCoordinateById(
      prop?.coordinateId,
      setError,
      setCoordinatePost,
      setLoading,
      user
    );
  }, []);

  return (
    <>
      {!error && !loading && coordinatePost && (
        <CoordinatePostListComponent coordinatePosts={[coordinatePost]} />
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
