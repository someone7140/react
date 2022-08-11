import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as fasHeart } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { loginUserState } from "../../../atoms/LoginUser";
import { updteCoordinateFavorite } from "../../../services/api/ApiCoordinateService";
import { updteItemPostFavorite } from "../../../services/api/ApiItemPostService";
import { updteFavorite } from "../../../services/api/ApiPostService";

export default function FavoriteComponent(prop) {
  const [user, setUser] = useRecoilState(loginUserState);
  const [favorite, setFavorite] = useState(prop.favorited);
  const [favoriteCount, setFavoriteCount] = useState(prop.favoriteCount);

  function updateFavoriteApi() {
    if (prop.itemPostFlag) {
      updteItemPostFavorite(prop.id, user);
    } else if (prop.coordinatePostFlag) {
      updteCoordinateFavorite(prop.id, user);
    } else {
      updteFavorite(prop.id, user);
    }
  }

  function clickHeartNotFavorite() {
    if (!user?.loginUser) {
      toast(
        "いいね機能は会員限定の機能です。ログインもしくは会員登録の上、再度タップしてください。"
      );
    } else if (user?.loginUser._id == prop.postUserId) {
      toast("自分の投稿はいいねが出来ません。");
    } else {
      // いいねの更新
      updateFavoriteApi();
      setFavorite(true);
      setFavoriteCount(favoriteCount + 1);
    }
  }

  function clickHeartFavorite() {
    if (!user?.loginUser) {
      toast(
        "いいね機能は会員限定の機能です。ログインもしくは会員登録の上、再度タップしてください。"
      );
    } else if (user?.loginUser._id == prop.postUserId) {
      toast("自分の投稿はいいねが出来ません。");
    } else {
      // いいねの更新
      updateFavoriteApi();
      setFavorite(false);
      setFavoriteCount(favoriteCount - 1);
    }
  }

  const circleStyle = {
    width: 65,
    height: 65,
    borderRadius: "50%",
    background: "white",
    border: "1px solid #000000",
  };

  const heartStyle = {
    marginTop: "6px",
    marginLeft: prop.heartMargin,
    marginRight: prop.heartMinusMargin ? prop.heartMinusMargin : "0px",
  };

  const counstStyle = {
    position: "relative",
    bottom: "5px",
    textAlign: "center",
  };

  return (
    <>
      <div
        style={
          prop.hideCircle
            ? prop.customStyle
              ? prop.customStyle
              : {}
            : circleStyle
        }
      >
        {!favorite && (
          <FontAwesomeIcon
            icon={faHeart}
            className="fa-2x"
            style={prop.customHeartStyle ? prop.customHeartStyle : heartStyle}
            onClick={clickHeartNotFavorite}
            role={user?.loginUser ? "button" : ""}
          />
        )}
        {favorite && (
          <FontAwesomeIcon
            icon={fasHeart}
            className="fa-2x"
            style={prop.customHeartStyle ? prop.customHeartStyle : heartStyle}
            color="red"
            onClick={clickHeartFavorite}
            role={user?.loginUser ? "button" : ""}
          />
        )}
        {prop.favoriteCount !== undefined && (
          <div
            style={prop.customCountStyle ? prop.customCountStyle : counstStyle}
          >
            {favoriteCount}
          </div>
        )}
      </div>
    </>
  );
}
