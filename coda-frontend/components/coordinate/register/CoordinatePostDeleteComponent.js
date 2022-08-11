import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWindowClose } from "@fortawesome/free-regular-svg-icons";
import { Button } from "react-bootstrap";
import { deleteCoordinatePost } from "../../../services/api/ApiCoordinateService";
import { loginUserState } from "../../../atoms/LoginUser";

export default function CoordinatePostDeleteComponent(prop) {
  const [user, setUser] = useRecoilState(loginUserState);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  function onClickDelete() {
    deleteCoordinatePost(
      prop.coordinatePostId,
      setSuccess,
      setError,
      setLoading,
      user
    );
  }

  useEffect(() => {
    if (success) {
      const date = new Date();
      prop.setRefetchTime(date.getTime());
      prop.setCoordinatePostDeleteModalOpen(false);
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
            prop.setCoordinatePostDeleteModalOpen(false);
          }}
        />
      </div>
      <div style={{ textAlign: "center" }}>
        「{prop.title}」のコーデ投稿を削除します。
        <div style={{ paddingTop: "15px" }}>
          <Button
            variant={"primary"}
            onClick={onClickDelete}
            disabled={loading}
          >
            コーデ投稿削除
            {loading && <img src="/loading.gif" />}
          </Button>
        </div>
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
