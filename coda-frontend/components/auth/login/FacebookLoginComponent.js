import React, { useEffect, useState } from "react";
import Router from "next/router";
import { FacebookProvider, Login } from "react-facebook";

import { useRecoilState } from "recoil";
import { toast } from "react-toastify";

import { loginUserState } from "../../../atoms/LoginUser";
import { loginFacebookApi } from "../../../services/api/ApiAuthService";

export default function FacebookLoginComponent() {
  const [user, setUser] = useRecoilState(loginUserState);
  const [authUser, setAuthUser] = useState(undefined);
  const [apiError, setApiError] = useState(undefined);
  const [socialLoginErr, setSocialLoginErr] = useState(false);

  const handleSocialLogin = (user) => {
    setUser("");
    loginFacebookApi(user?.tokenDetail?.accessToken, setApiError, setUser);
  };

  const handleSocialLoginFailure = (err) => {
    setSocialLoginErr(true);
  };

  useEffect(() => {
    if (authUser && authUser.loginUser) {
      setUser(authUser);
      Router.push("/");
      toast("ログインしました");
    }
  }, [authUser]);

  return (
    <div class="text-center">
      <FacebookProvider appId={process.env.FACEBOOK_LOGIN_APP_ID}>
        <Login
          onCompleted={handleSocialLogin}
          onError={handleSocialLoginFailure}
        >
          {({ handleClick }) => (
            <button
              onClick={handleClick}
              style={{ width: "300px" }}
              class="btn btn-outline-dark"
            >
              <img
                style={{ width: "20px", height: "20px" }}
                alt="Facebook sign-in"
                src="/facebook_logo.png"
              />
              <span class="ml-3">Facebookで続行</span>
            </button>
          )}
        </Login>
      </FacebookProvider>
      {(socialLoginErr || apiError) && (
        <div className="text-danger">
          Facebook認証ができませんでした。再度ログインをお試しください。
          <br />
          なお、会員登録されていない場合は
          <a href="/auth/authUserForRegister">こちら</a>より登録してください。
        </div>
      )}
    </div>
  );
}
