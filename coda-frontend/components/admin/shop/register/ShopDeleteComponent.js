import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWindowClose } from "@fortawesome/free-regular-svg-icons";
import { Button } from "react-bootstrap";
import { deleteShop } from "../../../../services/api/ApiShopService";
import { loginUserState } from "../../../../atoms/LoginUser";

export default function ShopDeleteComponent(prop) {
  const [user, setUser] = useRecoilState(loginUserState);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  function onClickDelete() {
    deleteShop(prop.shopSettingId, setSuccess, setError, setLoading, user);
  }

  useEffect(() => {
    if (success) {
      const date = new Date();
      prop.setRefetchTime(date.getTime());
      prop.setShopDeletetModalOpen(false);
    }
  }, [success]);

  return (
    <>
      <div style={{ textAlign: "right" }}>
        <FontAwesomeIcon
          icon={faWindowClose}
          className="fa-2x"
          style={{ width: "30px", height: "30px" }}
          role={"button"}
          color="black"
          onClick={() => {
            prop.setShopDeletetModalOpen(false);
          }}
        />
      </div>
      <div style={{ textAlign: "center" }}>
        「{prop.name}」のショップを削除します。
        <br />
        ショップに紐付けたコーデ投稿も削除されます。
        <br />
        <br />
        <Button variant={"primary"} onClick={onClickDelete} disabled={loading}>
          ショップ削除
          {loading && <img src="/loading.gif" />}
        </Button>
        {error && (
          <div>
            <br />
            <div className="text-danger">
              削除時にエラーが発生しました。再度削除操作をお試しください。
            </div>
          </div>
        )}
      </div>
    </>
  );
}
