import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { toast } from "react-toastify";

import { loginUserState } from "../../atoms/LoginUser";
import { masterState } from "../../atoms/Master";
import {
  getRecentCoordinateList,
  getSearchCoordinateList,
} from "../../services/api/ApiCoordinateService";
import { getShopList } from "../../services/api/ApiShopService";
import CoordinatePostRegisterModal from "./register/CoordinatePostRegisterModal";
import CoordinateSearchModal from "./search/CoordinateSearchModal";
import CoordinatePostListComponent from "./show/CoordinatePostListComponent";
import ShopShowComponent from "../common/shop/ShopShowComponent";

export default function CoordinateTopComponent(prop) {
  const [user, setUser] = useRecoilState(loginUserState);
  const [master, setMaster] = useRecoilState(masterState);
  const [error, setError] = useState(false);
  const [coordinatePosts, setCoordinatePosts] = useState(undefined);
  const [shops, setShops] = useState(undefined);
  const [selectShop, setSelectShop] = useState(undefined);
  const [refetchTime, setRefetchTime] = useState(undefined);
  const [searchInfo, setSearchInfo] = useState(
    prop.shopSettingId ? { shop_setting_id: prop.shopSettingId } : undefined
  );
  const [loading, setLoading] = useState(false);
  const [loadingShop, setLoadingShop] = useState(false);
  const [marginLeftButton, setMarginLeftButton] = useState("10%");
  const [modalFlag, setModalFlag] = useState(false);

  useEffect(() => {
    getShopList(setError, setShops, setLoadingShop);
  }, []);

  useEffect(() => {
    if (shops && shops.length > 0) {
      setSelectShop(
        shops.find((s) => s.shop_setting_id === prop.shopSettingId)
      );
    }
  }, [shops]);

  useEffect(() => {
    if (!searchInfo) {
      getRecentCoordinateList(
        setError,
        setCoordinatePosts,
        setLoading,
        prop.adminFlag,
        user
      );
    } else {
      getSearchCoordinateList(
        searchInfo,
        setError,
        setCoordinatePosts,
        setLoading,
        prop.adminFlag,
        user
      );
    }
  }, [searchInfo]);

  useEffect(() => {
    if (refetchTime && typeof window !== "undefined") {
      setSearchInfo(undefined);
      toast(<span>コーデ投稿を更新しました。</span>);
      getRecentCoordinateList(
        setError,
        setCoordinatePosts,
        setLoading,
        prop.adminFlag,
        user
      );
    }
  }, [refetchTime]);

  function displaySearchClearFlag(inputSearchInfo) {
    return inputSearchInfo != undefined;
  }

  useEffect(() => {
    if (prop.adminFlag) {
      if (searchInfo) {
        setMarginLeftButton("20%");
      } else {
        setMarginLeftButton("50%");
      }
    } else {
      if (searchInfo) {
        setMarginLeftButton("40%");
      } else {
        setMarginLeftButton("70%");
      }
    }
  }, [user, searchInfo]);

  return (
    <>
      <span>
        {selectShop && (
          <div style={{ maxWidth: "500px" }}>
            <ShopShowComponent shopInfo={selectShop} />
          </div>
        )}
        {!prop.shopSettingId && !loadingShop && (
          <div
            className={modalFlag ? "" : "fixed-top"}
            style={{
              maxWidth: "600px",
              marginTop: prop.adminFlag ? "110px" : "111px",
              backgroundColor: "white",
            }}
          >
            <div className="row">
              <div style={{ marginLeft: marginLeftButton }} className="mt-3">
                <CoordinateSearchModal
                  searchInfo={searchInfo}
                  setSearchInfo={setSearchInfo}
                  topPosition={"20%"}
                  displaySearchClearFlag={displaySearchClearFlag}
                  setModalFlag={setModalFlag}
                  master={master?.master}
                  shops={shops}
                />
              </div>
              {prop.adminFlag && (
                <div className="ml-4 mt-3">
                  <CoordinatePostRegisterModal
                    setRefetchTime={setRefetchTime}
                    topPosition={"20%"}
                    setModalFlag={setModalFlag}
                    shops={shops}
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </span>
      {!error && coordinatePosts && !loading && (
        <div style={{ marginTop: prop.shopSettingId ? "20px" : "65px" }}>
          <CoordinatePostListComponent
            coordinatePosts={coordinatePosts}
            adminFlag={prop.adminFlag}
            setModalFlag={setModalFlag}
            setRefetchTime={setRefetchTime}
            shops={shops}
          />
        </div>
      )}
      {loading && (
        <div style={{ marginTop: "90px" }}>
          <img src="/loading.gif" />
        </div>
      )}
      {error && !loading && (
        <div className="text-danger" style={{ marginTop: "100px" }}>
          投稿が取得できませんでした。再度トップ画面からアクセスしてください。
        </div>
      )}
    </>
  );
}
