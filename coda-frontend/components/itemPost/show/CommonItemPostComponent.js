import React from "react";
import { useRecoilState } from "recoil";
import { Button } from "react-bootstrap";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";

import ItemPostRegisterModal from "../register/ItemPostRegisterModal";
import ItemPostDeleteModal from "../register/ItemPostDeleteModal";
import FavoriteComponent from "../../common/post/FavoriteComponent";
import { loginUserState } from "../../../atoms/LoginUser";
import { masterState } from "../../../atoms/Master";
import { getDateStrForItemPostDisplay } from "../../../services/common/DateService";
import { updateClickCountToItemPost } from "../../../services/api/ApiItemPostService";

export default function CommonItemPostComponent(prop) {
  const postInfo = prop?.postInfo;
  const [user, setUser] = useRecoilState(loginUserState);
  const [master, setMaster] = useRecoilState(masterState);

  function getCategryUser(genderKey, silhouetteKey, complexKey) {
    const gender = master?.master?.gender.find((g) => g.value == genderKey);
    const silhouette = master?.master?.silhouette.find(
      (g) => g.value == silhouetteKey
    );
    const complex = master?.master?.complex.find((g) => g.value == complexKey);

    if (!gender && !silhouette && !complex) {
      return "指定なし";
    } else {
      var result = "";
      if (gender) {
        result =
          result +
          "性別：" +
          gender.label +
          (silhouette || complex ? "<br/>" : "");
      }
      if (silhouette) {
        result =
          result + "体型：" + silhouette.label + (complex ? "<br/>" : "");
      }
      if (complex) {
        result = result + "コンプレックス：" + complex.label;
      }
      return result;
    }
  }

  function getItemUrl(itemPostId) {
    if (typeof window !== "undefined") {
      return (
        "https://" +
        window.location.hostname +
        "/itemPost/itemPost?itemPostId=" +
        itemPostId
      );
    } else {
      return "";
    }
  }

  function linkClick(itemPostId, postUserId) {
    if (itemPostId && (!user?.loginUser || user?.loginUser._id != postUserId)) {
      updateClickCountToItemPost(itemPostId);
    }
  }

  const nowDate = new Date();

  return (
    <div>
      {postInfo && (
        <div
          className="row"
          style={{
            display: "flex",
            justifyContent: "center",
            overflowX: "hidden",
          }}
        >
          <hr
            style={{
              width: "100%",
              borderWidth: "2px",
              borderColor: "lightsteelblue",
            }}
          />
          <span
            style={{
              width: "90%",
            }}
          >
            <table
              style={{
                width: "100%",
              }}
              className="ml-2"
            >
              <tr>
                <td className="mt-2" style={{ width: "20%" }}>
                  {!postInfo.user_icon_url && (
                    <FontAwesomeIcon icon={faUser} className="fa-2x" />
                  )}
                  {postInfo.user_icon_url && (
                    <img
                      src={postInfo.user_icon_url}
                      className="rounded-circle"
                      style={{ width: "40px", height: "40px" }}
                    />
                  )}
                </td>
                <td className="text-left" style={{ width: "80%" }}>
                  <div>
                    {postInfo.user_name}(
                    {
                      <a
                        href={
                          "/itemPost/userPosts?userSettingId=" +
                          postInfo.user_setting_id
                        }
                        target="_blank"
                      >
                        @{postInfo.user_setting_id}
                      </a>
                    }
                    )
                  </div>
                  <div>
                    <span style={{ position: "absolute", marginBottom: "5px" }}>
                      {getDateStrForItemPostDisplay(postInfo.post_date)}
                    </span>
                    {postInfo.status != "close" && (
                      <span style={{ marginLeft: "50%" }}>
                        <CopyToClipboard
                          text={getItemUrl(postInfo._id)}
                          onCopy={() =>
                            toast(
                              "クリップボードへ、アイテム投稿のURLをコピーしました"
                            )
                          }
                        >
                          <Button
                            variant={"primary"}
                            style={{ marginTop: "10px" }}
                          >
                            <span style={{ fontSize: "0.8em" }}>
                              投稿URLをコピー
                            </span>
                          </Button>
                        </CopyToClipboard>
                      </span>
                    )}
                  </div>
                </td>
              </tr>
            </table>
          </span>
          <hr
            style={{
              width: "100%",
            }}
          />
          <div
            style={{
              width: "80%",
            }}
            className="row"
          >
            <div
              className={postInfo.url ? "col-10 text-left" : "col-12 text-left"}
            >
              <b className="h3">{postInfo.title}</b>
            </div>
            {postInfo.url && (
              <div className="col-2 text-right">
                <a
                  href={postInfo.url}
                  target="_blank"
                  onClick={() => linkClick(postInfo._id, postInfo.user_id)}
                >
                  <FontAwesomeIcon
                    icon={faExternalLinkAlt}
                    className="fa-2x ml-3"
                    color="black"
                  />
                  <div
                    style={{
                      fontSize: "10px",
                      width: "60px",
                      transform: "scale(0.8)",
                      color: "black",
                    }}
                  >
                    アイテム詳細
                  </div>
                </a>
              </div>
            )}
          </div>
          {postInfo.image_url && (
            <span
              style={{
                width: "100%",
                marginLeft: "3%",
              }}
              className="text-center"
            >
              <img
                src={
                  prop.imageCacheNoUse
                    ? postInfo.image_url + "?var=" + nowDate.getTime()
                    : postInfo.image_url
                }
                style={{
                  width: "300px",
                  height: "300px",
                  marginTop: "20px",
                  marginBottom: "10px",
                }}
              />
            </span>
          )}
          {!postInfo.image_url && (
            <div style={{ width: "100%", height: "30px" }}>&nbsp;</div>
          )}
          <div
            style={{
              width: "80%",
            }}
            className="row"
          >
            <div className="col-9 text-left">
              【想定ユーザ】
              <br />
              <span
                dangerouslySetInnerHTML={{
                  __html: getCategryUser(
                    postInfo.gender,
                    postInfo.silhouette,
                    postInfo.complex
                  ),
                }}
              />
            </div>
            <div className="col-2 text-right">
              <FavoriteComponent
                id={postInfo._id}
                postUserId={postInfo.user_id}
                favorited={postInfo.favorited_flg}
                favoriteCount={postInfo.favorite_count}
                itemPostFlag={true}
                heartMargin={"0px"}
                heartMinusMargin={"15px"}
              />
            </div>
          </div>
          {postInfo.detail && (
            <>
              <hr
                style={{
                  width: "100%",
                }}
              />
              <div
                className="text-left ml-4"
                style={{
                  width: "80%",
                  whiteSpace: "pre-wrap",
                }}
              >
                {postInfo.detail}
              </div>
            </>
          )}
          {prop.managementDisplayFlag && (
            <>
              <hr
                style={{
                  width: "100%",
                }}
              />
              <div
                style={{
                  width: "80%",
                }}
                className="row"
              >
                <div className="col-8 text-left">
                  【管理情報】
                  <br />
                  公開ステータス：
                  {
                    master?.master?.post_status.find(
                      (s) => s.value == postInfo.status
                    )?.label
                  }
                  <br />
                  インプレッション数：{postInfo.impression_count}
                  <br />
                  クリック数：
                  {postInfo.click_count}
                </div>
                <div className="col-4 text-right">
                  <div>
                    <ItemPostRegisterModal
                      itemPost={postInfo}
                      setRefetchTime={prop.setRefetchTime}
                      topPosition={"25%"}
                    />
                  </div>
                  <div className="mt-3">
                    <ItemPostDeleteModal
                      itemPost={postInfo}
                      setRefetchTime={prop.setRefetchTime}
                    />
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
