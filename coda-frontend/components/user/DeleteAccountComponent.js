import React, { useEffect, useState } from "react";
import Router from "next/router";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { useRecoilState } from "recoil";

import { loginUserState } from "../../atoms/LoginUser";
import { deleteUser } from "../../services/api/ApiUserService";

export default function DeleteAccountComponent() {
  const [user, setUser] = useRecoilState(loginUserState);
  const [success, setSuccess] = useState(undefined);
  const [loading, setLoading] = useState(false);

  function deleteAccount() {
    deleteUser(setSuccess, user, setLoading);
  }

  useEffect(() => {
    if (success === true) {
      toast("退会しました。");
      setUser("");
      Router.push("/");
    }
  }, [success]);

  return (
    <div className="ml-3 mt-5">
      退会するとデータが全て削除されます。
      <br />
      問題なければ下記のボタンを押してください。 <br /> <br />
      <Button variant={"primary"} onClick={deleteAccount} disabled={loading}>
        退会する{loading && <img src="/loading.gif" />}
      </Button>
      {success === false && (
        <div>
          <br />
          <div className="text-danger">
            退会処理に失敗しました。再度操作してエラーとなる場合はお問い合わせください。
          </div>
        </div>
      )}
    </div>
  );
}
