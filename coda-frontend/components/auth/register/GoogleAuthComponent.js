import React, { useState } from "react";
import Router from "next/router";
import GoogleLogin from "react-google-login";

export default function GoogleAuthComponent() {
  const [socialLoginErr, setSocialLoginErr] = useState(false);

  const handleSocialLogin = (user) => {
    Router.push(
      "/user/newUserRegister?googleIdToken=" + user?.tokenObj?.id_token
    );
  };

  const handleSocialLoginFailure = (err) => {
    setSocialLoginErr(true);
  };

  return (
    <div class="text-center">
      <GoogleLogin
        clientId={process.env.GOOGLE_LOGIN_APP_ID}
        render={(renderProps) => (
          <button
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
            class="btn btn-outline-dark"
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
      {socialLoginErr && (
        <div className="text-danger">Google認証ができませんでした</div>
      )}
    </div>
  );
}
