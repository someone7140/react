import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { toast } from "react-toastify";
import { loginUserState } from "../../../atoms/LoginUser";
import ShopListComponent from "./show/ShopListComponent";
import ShopRegisterModal from "./register/ShopRegisterModal";
import { getShopList } from "../../../services/api/ApiShopService";

export default function ShopTopComponent() {
  const [user, setUser] = useRecoilState(loginUserState);
  const [error, setError] = useState(false);
  const [shops, setShops] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [refetchTime, setRefetchTime] = useState(0);
  const [modalFlag, setModalFlag] = useState(false);

  //ロード中に表示する項目
  const loader = (
    <div>
      <img src="/loading.gif" />
    </div>
  );

  useEffect(() => {
    if (refetchTime && typeof window !== "undefined") {
      getShopList(setError, setShops, setLoading);
      toast(<span>ショップの更新を行いました。</span>);
    }
  }, [refetchTime]);

  useEffect(() => {
    getShopList(setError, setShops, setLoading);
  }, []);

  return (
    <>
      <span>
        <div
          className={modalFlag ? "" : "fixed-top"}
          style={{
            maxWidth: "510px",
            marginTop: "110px",
            backgroundColor: "white",
          }}
        >
          {user?.loginUser && (
            <div className="mt-3 mr-2 text-right">
              <ShopRegisterModal
                setRefetchTime={setRefetchTime}
                topPosition={"15%"}
                setModalFlag={setModalFlag}
              />
            </div>
          )}
        </div>
      </span>
      {!error && shops && !loading && (
        <div style={{ marginTop: "20px" }}>
          <ShopListComponent
            shops={shops}
            setRefetchTime={setRefetchTime}
            setModalFlag={setModalFlag}
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
          ショップが取得できませんでした。
        </div>
      )}
    </>
  );
}
