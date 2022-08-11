import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWindowClose } from "@fortawesome/free-regular-svg-icons";
import { Button } from "react-bootstrap";
import { deleteItemPost } from "../../../services/api/ApiItemPostService";
import { loginUserState } from "../../../atoms/LoginUser";

export default function ItemPostDeleteComponent(prop) {
  const [user, setUser] = useRecoilState(loginUserState);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  function deletePost() {
    deleteItemPost(prop.itemPostId, setSuccess, setError, setLoading, user);
  }

  useEffect(() => {
    if (success) {
      const date = new Date();
      prop.setRefetchTime(date.getTime());
      prop.setItemPostDeletetModalOpen(false);
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
            prop.setItemPostDeletetModalOpen(false);
          }}
        />
      </div>
      <div style={{ textAlign: "center" }}>
        「{prop.title}」のアイテム投稿を削除します。
        <br />
        削除して問題なければボタンを押してください。
        <br />
        <br />
        <Button variant={"primary"} onClick={deletePost} disabled={loading}>
          アイテム削除
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
