import randomstring from "randomstring";
import base64url from "base64url";
import jsSha256 from "js-sha256";

export function redirectTwitterAuth(redirectPath) {
  const state = randomstring.generate(50);
  const codeVerifier = randomstring.generate(50);
  // リダイレクトで戻る時に使いたいのでsessionStorageに保存
  sessionStorage.setItem("codeVerifier", codeVerifier);

  const twitterOAuth2Url =
    `https://twitter.com/i/oauth2/authorize?` +
    `response_type=code&` +
    `client_id=${process.env.NEXT_PUBLIC_TWITTER_CLIENT_ID}&` +
    `redirect_uri=${location.protocol}//${location.host}/${redirectPath}&` +
    `scope=tweet.read%20users.read&` +
    `state=${state}&` +
    `code_challenge=${base64url(jsSha256.arrayBuffer(codeVerifier))}&` +
    `code_challenge_method=s256`;
  window.location.href = twitterOAuth2Url;
}
