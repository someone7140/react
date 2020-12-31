import { useState } from "react";
import { createUser } from "../../services/api/ApiUserService";

const inputTextStyle = {
  marginTop: 10,
  width: "300px",
};

const inputPasswordStyle = {
  marginTop: 10,
};

export default function UserCreate() {
  const [mailAddress, setMailAddress] = useState(undefined);
  const [name, setName] = useState(undefined);
  const [password, setPassword] = useState(undefined);
  const [passwordReinput, setPasswordReinput] = useState(undefined);
  const [error, setError] = useState(undefined);
  const [sendFlag, setSendFlag] = useState(undefined);

  function checkEmail() {
    return !mailAddress || mailAddress.match(/^\S+@\S+\.\S+$/);
  }

  function checkPassword() {
    return !password || password.length >= 6;
  }

  function checkPasswordReinput() {
    return !passwordReinput || password === passwordReinput;
  }

  function onChangeInputMailAddress(e) {
    setMailAddress(e.target.value);
  }

  function onChangeInputName(e) {
    setName(e.target.value);
  }

  function onChangeInputPassword(e) {
    setPassword(e.target.value);
  }

  function onChangeReInputPassword(e) {
    setPasswordReinput(e.target.value);
  }

  function onClickRegistButton() {
    createUser(mailAddress, name, password, setError);
    if (!error) {
      setSendFlag(true);
    }
  }

  return (
    <div>
      <div className="text-center">
        <h2>会員登録</h2>
        {!sendFlag && (
          <>
            <br />
            <br />
            メールアドレス
            <br />
            <input
              type="text"
              name="mailAddress"
              placeholder="sample@example.com"
              onChange={onChangeInputMailAddress}
              style={inputTextStyle}
            />
            <br />
            {!checkEmail() && (
              <span style={{ color: "red" }}>
                メールアドレスの形式で入力してください
              </span>
            )}
            <br />
            名前
            <br />
            <input
              type="text"
              name="name"
              placeholder="表示する名前を入力"
              onChange={onChangeInputName}
              style={inputTextStyle}
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
            {!checkPassword() && (
              <span style={{ color: "red" }}>
                パスワードは6文字以上で入力してください
              </span>
            )}
            <br />
            パスワード（再入力）
            <br />
            <input
              type="password"
              name="passwordReinput"
              onChange={onChangeReInputPassword}
              style={inputPasswordStyle}
            />
            <br />
            {!checkPasswordReinput() && (
              <span style={{ color: "red" }}>
                パスワードの入力と同じ内容を入力してください
              </span>
            )}
            <br />
            <input
              type="button"
              name="loginButton"
              value="登録する"
              disabled={
                !mailAddress ||
                !checkEmail() ||
                !name ||
                !password ||
                !checkPassword() ||
                !passwordReinput ||
                !checkPasswordReinput()
              }
              onClick={onClickRegistButton}
            />
            <br />
            <br />
            {error && (
              <span style={{ color: "red" }}>
                メールアドレスがすでに登録されています
              </span>
            )}
          </>
        )}
        {sendFlag && (
          <>
            <br />
            <br />
            メールアドレス宛に登録用のリンクを送信しました。
          </>
        )}
      </div>
    </div>
  );
}
