const withCSS = require("@zeit/next-css");

module.exports = withCSS({});

const withTM = require("next-transpile-modules")([
  "react-calendar",
  "react-datetime-picker",
]);

module.exports = withTM({
  future: {
    webpack5: true,
  },
  env: {
    API_DOMAIN: process.env.API_DOMAIN,
    GOOGLE_LOGIN_APP_ID: process.env.GOOGLE_LOGIN_APP_ID,
    FACEBOOK_LOGIN_APP_ID: process.env.FACEBOOK_LOGIN_APP_ID,
    ROBOT_ALLOW: process.env.ROBOT_ALLOW,
    DEVELOP_MODE: process.env.DEVELOP_MODE,
    GOOGE_ANALYTICS_URL: process.env.GOOGE_ANALYTICS_URL,
    CODA_INSTAGRAM_URL: process.env.CODA_INSTAGRAM_URL,
    CODA_TWITTER_URL: process.env.CODA_TWITTER_URL,
  },
});
