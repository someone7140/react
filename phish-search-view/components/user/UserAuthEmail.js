import { useState } from "react";
import Router from "next/router";
import { useRecoilState } from "recoil";
import { authUser } from "../../services/api/ApiUserService";

const inputPasswordStyle = {
  marginTop: 10,
};

export default function UserAuthEmail(prop) {
  const [password, setPassword] = useState(undefined);
  const [user, setUser] = useRecoilState(loginUserState);
  const [error, setError] = useState(undefined);

  if (typeof window !== "undefined") {
    if (!prop.userId || !prop.token) {
      Router.push("/");
    }
  }

  function onChangeInputPassword(e) {
    setPassword(e.target.value);
  }

  function onClickAuthButton() {
    authUser(prop.userId, prop.token, password, setError, setUser);
    if (user && user.loginUser) {
      Router.push("/");
    }
  }

  return (
    <div>
      <div className="text-center">
        <h2>メール認証</h2>
        <br />
        パスワード
        <br />
        <input
          type="password"
          name="password"
          onChange={onChangeInputPassword}
          style={inputPasswordStyle}
        />
        <br />
        <input
          type="button"
          name="authButton"
          value="認証する"
          disabled={!password}
          onClick={onClickAuthButton}
        />
        <br />
        <br />
        {error && (
          <span style={{ color: "red" }}>
            パスワードが違う、もしくは認証期限が切れている可能性があります。
            <br />
            認証が通らない場合は、再度会員登録画面から登録をお願いします。
          </span>
        )}
      </div>
    </div>
  );
}
