import React, { useEffect } from "react";
import Router from "next/router";
import { useRecoilState } from "recoil";

import { loginUserState } from "../../../atoms/LoginUser";
import EmailLoginComponent from "./EmailLoginComponent";
import FacebookLoginComponent from "./FacebookLoginComponent";
import GoogleLoginComponent from "./GoogleLoginComponent";

export default function LoginComponent() {
  const [user, setUser] = useRecoilState(loginUserState);

  const separateStyle = {
    overflow: "hidden",
    textAlign: "center",
    color: "gray",
  };

  useEffect(() => {
    if (user && user.loginUser) {
      Router.push("/");
    }
  }, [user]);

  return (
    <div>
      <style>
        {`.separateSpanStyle {
    display: inline-block;
    padding: 0 0.5em;
    position: relative;
}
 
.separateSpanStyle:before,
.separateSpanStyle:after {
    border-top: 1px solid;
    content: "";
    position: absolute;
    top: 50%;
    width: 15em;
}
 
.separateSpanStyle:before {
    right: 100%;
}
 
.separateSpanStyle:after {
    left: 100%;
}`}
      </style>
      <GoogleLoginComponent />
      <br />
      <FacebookLoginComponent />
      <br />
      <div className="text-center" style={{ fontSize: "small" }}>
        ※アプリ経由でCODA利用の際、Google、Facebook認証が出来ない場合があります。
        <br />
        その際はブラウザでCODAを開き再度、認証を行って下さい。
      </div>
      <br />
      <div style={separateStyle}>
        <span class="separateSpanStyle">または</span>
      </div>
      <br />
      <EmailLoginComponent />
    </div>
  );
}
