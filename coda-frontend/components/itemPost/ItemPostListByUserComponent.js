import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { toast } from "react-toastify";
import { loginUserState } from "../../atoms/LoginUser";
import { getSearchItemPosts } from "../../services/api/ApiItemPostService";
import ItemPostRegisterModal from "./register/ItemPostRegisterModal";
import ItemPostSearchModal from "./search/ItemPostSearchModal";
import CommonItemPostListComponent from "./show/CommonItemPostListComponent";

export default function ItemPostListByUserComponent(prop) {
  const [user, setUser] = useRecoilState(loginUserState);
  const [refetchTime, setRefetchTime] = useState(0);
  const [error, setError] = useState(false);
  const [itemPosts, setItemPosts] = useState(undefined);
  const [searchInfo, setSearchInfo] = useState(undefined);
  const [marginLeft, setMarginLeft] = useState("10%");
  const [loading, setLoading] = useState(false);
  const [modalFlag, setModalFlag] = useState(false);
  const [imageCacheNoUse, setImageCacheNoUse] = useState(false);

  function displaySearchClearFlag(inputSearchInfo) {
    return (
      inputSearchInfo &&
      Object.entries(inputSearchInfo).some(([key, value]) => {
        return key != "user_setting_id" && value;
      })
    );
  }

  function getMarginLeftButton() {
    if (user?.loginUser?.user_setting_id == prop?.userSettingId) {
      if (displaySearchClearFlag(searchInfo)) {
        return "10%";
      } else {
        return "50%";
      }
    } else {
      if (displaySearchClearFlag(searchInfo)) {
        return "50%";
      } else {
        return "70%";
      }
    }
  }

  useEffect(() => {
    if (refetchTime != 0) {
      setImageCacheNoUse(true);
      toast("アイテム投稿を更新しました");
    }
    setSearchInfo({
      user_setting_id: prop.userSettingId,
    });
  }, [refetchTime]);

  useEffect(() => {
    if (searchInfo) {
      if (displaySearchClearFlag()) {
        toast("検索結果を表示します");
      }
      getSearchItemPosts(searchInfo, setError, setItemPosts, user, setLoading);
    }
    setMarginLeft(getMarginLeftButton());
  }, [searchInfo]);

  return (
    <>
      <div
        className={modalFlag ? "" : "fixed-top"}
        style={{
          maxWidth: "600px",
          marginTop: "150px",
          backgroundColor: "white",
        }}
      >
        <div className="row">
          <div style={{ marginLeft: marginLeft }} className="mt-3">
            <ItemPostSearchModal
              searchInfo={searchInfo}
              setSearchInfo={setSearchInfo}
              topPosition={"25%"}
              userSettingId={prop?.userSettingId}
              displaySearchClearFlag={displaySearchClearFlag}
              setModalFlag={setModalFlag}
            />
          </div>
          {user?.loginUser?.user_setting_id == prop?.userSettingId && (
            <div className="ml-4 mt-3">
              <ItemPostRegisterModal
                setRefetchTime={setRefetchTime}
                topPosition={"25%"}
                setModalFlag={setModalFlag}
              />
            </div>
          )}
        </div>
      </div>
      {!error && !loading && (
        <div style={{ marginTop: "50px" }}>
          <CommonItemPostListComponent
            itemPosts={itemPosts}
            managementDisplayFlag={
              user?.loginUser?.user_setting_id == prop?.userSettingId ||
              user?.loginUser?.user_type == "admin"
            }
            setRefetchTime={setRefetchTime}
            imageCacheNoUse={imageCacheNoUse}
          />
        </div>
      )}
      {loading && (
        <div style={{ marginTop: "50px" }}>
          <img src="/loading.gif" />
        </div>
      )}
      {error && !loading && (
        <div className="text-danger" style={{ marginTop: "50px" }}>
          投稿取得時にエラーが発生しました。再度トップ画面からアクセスしてください。
        </div>
      )}
    </>
  );
}
