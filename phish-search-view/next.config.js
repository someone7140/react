const withCSS = require("@zeit/next-css");

module.exports = withCSS({
  // 設定を"withCSS"に渡す
  // 各種設定
});

module.exports = {
  env: {
    API_DOMAIN: process.env.API_DOMAIN,
  },
};
