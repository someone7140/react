import React, { useState } from "react";
import Router from "next/router";
import { FacebookProvider, Login } from "react-facebook";

export default function FacebookAuthComponent() {
  const [socialLoginErr, setSocialLoginErr] = useState(false);

  const handleSocialLogin = (user) => {
    Router.push(
      "/user/newUserRegister?facebookAccessToken=" +
        user?.tokenDetail?.accessToken
    );
  };

  const handleSocialLoginFailure = (err) => {
    setSocialLoginErr(true);
  };

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
      {socialLoginErr && (
        <div className="text-danger">Facebook認証ができませんでした</div>
      )}
    </div>
  );
}
