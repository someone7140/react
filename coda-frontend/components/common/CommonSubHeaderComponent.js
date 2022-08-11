import React from "react";

export default function CommonSubHeaderComponent(prop) {
  const headerBarStyle = {
    background: "white",
    position: "relative sticky",
    height: prop.height ? prop.height : "40px",
    width: "100%",
    marginTop: "70px",
  };

  return (
    <div
      style={{
        background: "white",
      }}
    >
      <header>
        <div className="fixed-top" style={headerBarStyle}>
          <div
            style={{
              position: "relative sticky",
              left: "10px",
              bottom: "10px",
              zIndex: 100,
            }}
            class="mt-1"
          >
            <div
              style={{
                position: "relative",
                bottom: "15px",
                width: "50px",
                zIndex: "101",
                background: "white",
              }}
            >
              <a href="/">
                <img src="/leftArrow.png" width="35px" />
              </a>
            </div>
          </div>
          <div
            class="text-center h2"
            style={{
              position: "relative",
              bottom: "49px",
              left: "40px",
              background: "white",
            }}
          >
            <div
              style={{
                position: "relative",
                right: "40px",
              }}
            >
              {prop.title}
            </div>
          </div>
          <hr
            color="#e6e6fa"
            style={{
              position: "relative",
              bottom: "55px",
            }}
          />
        </div>
      </header>
      <br />
      <br />
      <br />
    </div>
  );
}
