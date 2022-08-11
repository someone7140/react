import React from "react";

const getRobots = () => {
  if (process.env.ROBOT_ALLOW === "true") {
    return `User-agent: *
Allow: /`;
  } else {
    return `User-agent: *
Disallow: /`;
  }
};

class Robots extends React.Component {
  static async getInitialProps({ res }) {
    res.setHeader("Content-Type", "text/plain");
    res.write(getRobots());
    res.end();
  }
}

export default Robots;
