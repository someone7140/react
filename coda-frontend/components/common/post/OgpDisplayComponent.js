import React from "react";
import { useRecoilState } from "recoil";
import { Card } from "react-bootstrap";
import FavoriteComponent from "./FavoriteComponent";
import { loginUserState } from "../../../atoms/LoginUser";
import { updateClickCountToItemPost } from "../../../services/api/ApiItemPostService";

export default function OgpDisplayComponent(prop) {
  const [user, setUser] = useRecoilState(loginUserState);
  const ogpDisplayFlag = prop.imageUrl || prop.title;

  const ogpClick = (url) => {
    if (
      prop.id &&
      (!user?.loginUser || user?.loginUser._id != prop.postUserId)
    ) {
      updateClickCountToItemPost(prop.id);
    }
    window.open(url, "_blank");
  };

  function getShortenedDisplay(target) {
    if (target && target.length > 80) {
      return target.substr(0, 80) + "…";
    }
    return target;
  }

  return (
    <>
      {prop.displayFavorite && (
        <div
          style={{
            maxWidth: "500px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <div></div>
          {prop.displayFavorite && (
            <FavoriteComponent
              id={prop.id}
              postUserId={prop.postUserId}
              favorited={prop.favorited}
              favoriteCount={prop.favoriteCount}
              itemPostFlag={prop.itemPostFlag}
              heartMargin={"0px"}
            />
          )}
        </div>
      )}

      {ogpDisplayFlag && (
        <div className="mx-auto" style={{ maxWidth: "400px" }}>
          <Card
            style={{ maxWidth: "400px" }}
            onClick={() => {
              ogpClick(prop.url);
            }}
            role={"button"}
          >
            {prop.imageUrl && (
              <Card.Img
                style={{ maxWidth: "400px", height: "200px" }}
                src={prop.imageUrl}
              />
            )}
            <Card.Body>
              <Card.Title>{prop.title}</Card.Title>
              {/* <Card.Text>{getShortenedDisplay(prop.description)}</Card.Text> */}
            </Card.Body>
          </Card>
        </div>
      )}
      {!ogpDisplayFlag && (
        <div
          onClick={() => {
            ogpClick(prop.url);
          }}
          role={"button"}
          style={{ color: "#0000FF" }}
        >
          {getShortenedDisplay(prop.url)}
        </div>
      )}
    </>
  );
}
