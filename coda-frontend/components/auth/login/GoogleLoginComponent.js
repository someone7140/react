import React, { useEffect, useState } from "react";
import Router from "next/router";
import GoogleLogin from "react-google-login";

import { useRecoilState } from "recoil";
import { toast } from "react-toastify";

import { loginUserState } from "../../../atoms/LoginUser";
import { loginGoogleApi } from "../../../services/api/ApiAuthService";

export default function GoogleLoginComponent() {
  const [user, setUser] = useRecoilState(loginUserState);
  const [authUser, setAuthUser] = useState(undefined);
  const [apiError, setApiError] = useState(undefined);
  const [socialLoginErr, setSocialLoginErr] = useState(false);

  const handleSocialLogin = (user) => {
    setUser("");
    loginGoogleApi(user?.tokenObj?.id_token, setApiError, setAuthUser);
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
      <GoogleLogin
        clientId={process.env.GOOGLE_LOGIN_APP_ID}
        render={(renderProps) => (
          <button
            class="btn btn-outline-dark"
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
            style={{ width: "300px" }}
          >
            <img
              style={{ width: "20px", height: "20px" }}
              alt="Google sign-in"
              src="/google_log.webp"
            />
            <span class="ml-3">Googleで続行</span>
          </button>
        )}
        buttonText="Login"
        onSuccess={handleSocialLogin}
        onFailure={handleSocialLoginFailure}
        cookiePolicy={"single_host_origin"}
      />
      {(socialLoginErr || apiError) && (
        <div className="text-danger">
          Google認証ができませんでした。再度ログインをお試しください。
          <br />
          なお、会員登録されていない場合は
          <a href="/auth/authUserForRegister">こちら</a>より登録してください。
        </div>
      )}
    </div>
  );
}
