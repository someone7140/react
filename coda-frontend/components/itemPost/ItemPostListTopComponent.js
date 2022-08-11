import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { toast } from "react-toastify";

import { loginUserState } from "../../atoms/LoginUser";
import ItemPostRegisterModal from "./register/ItemPostRegisterModal";
import ItemPostSearchModal from "./search/ItemPostSearchModal";
import {
  getRecommendItemPosts,
  getSearchItemPosts,
} from "../../services/api/ApiItemPostService";
import CommonItemPostListComponent from "./show/CommonItemPostListComponent";

export default function ItemPostListTopComponent() {
  const [user, setUser] = useRecoilState(loginUserState);
  const [error, setError] = useState(false);
  const [itemPosts, setItemPosts] = useState(undefined);
  const [refetchTime, setRefetchTime] = useState(undefined);
  const [searchInfo, setSearchInfo] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [marginLeftButton, setMarginLeftButton] = useState("10%");
  const [modalFlag, setModalFlag] = useState(false);

  useEffect(() => {
    if (!searchInfo) {
      getRecommendItemPosts(setError, setItemPosts, user, setLoading);
    } else {
      toast("検索結果を表示します");
      getSearchItemPosts(searchInfo, setError, setItemPosts, user, setLoading);
    }
  }, [searchInfo]);

  useEffect(() => {
    if (refetchTime && typeof window !== "undefined") {
      const userItemPostListUrl =
        "/itemPost/userPosts?userSettingId=" + user?.loginUser?.user_setting_id;

      toast(
        <span>
          アイテムを投稿しました。確認を行う場合は
          <a href={userItemPostListUrl}>こちら</a>
        </span>
      );
    }
  }, [refetchTime]);

  function displaySearchClearFlag(inputSearchInfo) {
    return inputSearchInfo != undefined;
  }

  useEffect(() => {
    if (user?.loginUser) {
      if (searchInfo) {
        setMarginLeftButton("10%");
      } else {
        setMarginLeftButton("50%");
      }
    } else {
      if (searchInfo) {
        setMarginLeftButton("50%");
      } else {
        setMarginLeftButton("70%");
      }
    }
  }, [user]);

  return (
    <>
      <span>
        <div
          className={modalFlag ? "" : "fixed-top"}
          style={{
            maxWidth: "600px",
            marginTop: "111px",
            backgroundColor: "white",
          }}
        >
          <div className="row">
            <div style={{ marginLeft: marginLeftButton }} className="mt-3">
              <ItemPostSearchModal
                searchInfo={searchInfo}
                setSearchInfo={setSearchInfo}
                topPosition={"20%"}
                displaySearchClearFlag={displaySearchClearFlag}
                setModalFlag={setModalFlag}
              />
            </div>
            {user?.loginUser && (
              <div className="ml-4 mt-3">
                <ItemPostRegisterModal
                  setRefetchTime={setRefetchTime}
                  topPosition={"20%"}
                  setModalFlag={setModalFlag}
                />
              </div>
            )}
          </div>
        </div>
      </span>
      {!error && itemPosts && !loading && (
        <div style={{ marginTop: "90px" }}>
          <CommonItemPostListComponent itemPosts={itemPosts} />
        </div>
      )}
      {loading && (
        <div style={{ marginTop: "90px" }}>
          <img src="/loading.gif" />
        </div>
      )}
      {error && !loading && (
        <div className="text-danger" style={{ marginTop: "90px" }}>
          投稿が取得できませんでした。再度トップ画面からアクセスしてください。
        </div>
      )}
    </>
  );
}
