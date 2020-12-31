import { useState, useEffect } from "react";
import Router from "next/router";
import { useRecoilState } from "recoil";
import { loginUser } from "../../services/api/ApiUserService";
import { loginUserState } from "../../atoms/LoginUser";

const inputMailAddresStyle = {
  marginTop: 10,
  width: "300px",
};

const inputPasswordStyle = {
  marginTop: 10,
};

export default function Login() {
  const [mailAddress, setMailAddress] = useState(undefined);
  const [password, setPassword] = useState(undefined);
  const [error, setError] = useState(undefined);
  const [user, setUser] = useRecoilState(loginUserState);

  function onChangeInputMailAddress(e) {
    setMailAddress(e.target.value);
  }

  function onChangeInputPassword(e) {
    setPassword(e.target.value);
  }

  function onClickLoginButton() {
    setUser(undefined);
    loginUser(mailAddress, password, setError, setUser);
  }

  useEffect(() => {
    if (user && user.loginUser) {
      Router.push("/");
    }
  }, [user]);

  return (
    <div>
      <div className="text-center">
        <h2>ログイン</h2>
        <br />
        <br />
        メールアドレス
        <br />
        <input
          type="text"
          name="mailAddress"
          placeholder="sample@example.com"
          onChange={onChangeInputMailAddress}
          style={inputMailAddresStyle}
        />
        <br />
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
        <br />
        <input
          type="button"
          name="loginButton"
          value="ログイン"
          disabled={!mailAddress || !password}
          onClick={onClickLoginButton}
        />
        <br />
        <br />
        {error && (
          <span style={{ color: "red" }}>
            メールアドレスかパスワードに誤りがあります
          </span>
        )}
      </div>
    </div>
  );
}
