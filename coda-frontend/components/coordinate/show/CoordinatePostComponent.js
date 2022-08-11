import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";

import { loginUserState } from "../../../atoms/LoginUser";
import CoordinatePostImageRegisterComponent from "../register/CoordinatePostImageRegisterComponent";
import CoordinatePostRegisterModal from "../register/CoordinatePostRegisterModal";
import CoordinatePostDeleteModal from "../register/CoordinatePostDeleteModal";
import FavoriteComponent from "../../common/post/FavoriteComponent";
import PurchaseRequestIconComponent from "../icon/PurchaseRequestIconComponent";
import UrlCopyIconComponent from "../icon/UrlCopyIconComponent";
import { masterState } from "../../../atoms/Master";
import {
  updateClickCountToCoordinatePost,
  updateImpressionCountToCoordinatePost,
} from "../../../services/api/ApiCoordinateService";
import { getDateStrForItemPostDisplay } from "../../../services/common/DateService";
import PriceDisplayComponent from "./PriceDisplayComponent";

export default function CoordinatePostComponent(prop) {
  const coordinatePost = prop?.coordinatePost;
  const [user, setUser] = useRecoilState(loginUserState);
  const [master, setMaster] = useRecoilState(masterState);

  useEffect(() => {
    if (prop.directAccess && user.loginUser?.user_type !== "admin") {
      updateImpressionCountToCoordinatePost([coordinatePost._id]);
    }
  }, [prop.directAccess]);

  function getCategryModel(
    genderKey,
    silhouetteKey,
    height,
    weight,
    size,
    categoryKey
  ) {
    const gender = master?.master?.gender.find((g) => g.value == genderKey);
    const silhouette = master?.master?.silhouette.find(
      (g) => g.value == silhouetteKey
    );
    const category = master?.master?.coordinate_category.find(
      (g) => g.value == categoryKey
    )?.label;

    if (!gender && !silhouette && !height && !weight && !size && !category) {
      return "指定なし";
    } else {
      var result = "";
      if (gender) {
        result =
          result +
          "性別：" +
          gender.label +
          (silhouette || silhouette || height || weight || size || category
            ? "<br/>"
            : "");
      }
      if (silhouette) {
        result =
          result +
          "体型：" +
          silhouette.label +
          (height || weight || size || category ? "<br/>" : "");
      }
      if (height) {
        result =
          result +
          "身長：" +
          height +
          "cm" +
          (weight || size || category ? "<br/>" : "");
      }
      if (weight) {
        result =
          result + "体重：" + weight + "kg" + (size || category ? "<br/>" : "");
      }
      if (size) {
        result = result + "着用サイズ：" + size + (category ? "<br/>" : "");
      }
      if (category) {
        result = result + "カテゴリー：" + category;
      }
      return result;
    }
  }

  function linkClick(coordinatePostId) {
    if (coordinatePostId && user.loginUser?.user_type !== "admin") {
      updateClickCountToCoordinatePost(coordinatePostId);
    }
  }

  return (
    <div>
      {coordinatePost && (
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
          <div
            style={{
              height: "60px",
              width: "90%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
            }}
          >
            <div className="ml-3">
              <div>
                <a
                  href={
                    "/coordinate/coordinateList?shopSettingId=" +
                    coordinatePost.shop_setting_id
                  }
                  target="_blank"
                >
                  {coordinatePost.shop_name}
                </a>
              </div>
              <div className="text-left">
                {getDateStrForItemPostDisplay(coordinatePost.post_date)}
              </div>
            </div>
            <div>
              <PurchaseRequestIconComponent
                coordinatePost={coordinatePost}
                modalTop="20%"
              />
            </div>
          </div>
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
              className={
                coordinatePost.url ? "col-10 text-left" : "col-12 text-left"
              }
            >
              <b className="h3">{coordinatePost.title}</b>
            </div>
            {coordinatePost.url && (
              <div className="col-2 text-right">
                <a
                  href={coordinatePost.url}
                  target="_blank"
                  onClick={() => linkClick(coordinatePost._id)}
                >
                  <FontAwesomeIcon
                    icon={faExternalLinkAlt}
                    className="fa-2x ml-3"
                    color="black"
                  />
                  <div
                    style={{
                      fontSize: "10px",
                      width: "70px",
                      transform: "scale(0.8)",
                      color: "black",
                    }}
                  >
                    ショップページ
                  </div>
                </a>
              </div>
            )}
          </div>
          {coordinatePost?.images?.length > 0 && (
            <CoordinatePostImageRegisterComponent
              coordinatePost={coordinatePost}
              showOnly={true}
              imageCacheNoUse={prop.imageCacheNoUse}
            />
          )}
          {(!coordinatePost?.images || coordinatePost?.images?.length == 0) && (
            <div style={{ width: "100%", height: "30px" }}>&nbsp;</div>
          )}
          <div
            style={{
              width: "80%",
            }}
            className="row"
          >
            <div className="col-7 text-left">
              【モデル情報】
              <br />
              <span
                dangerouslySetInnerHTML={{
                  __html: getCategryModel(
                    coordinatePost?.model_attribute?.gender,
                    coordinatePost?.model_attribute?.silhouette,
                    coordinatePost?.model_attribute?.height,
                    coordinatePost?.model_attribute?.weight,
                    coordinatePost?.model_attribute?.size,
                    coordinatePost?.category
                  ),
                }}
              />
            </div>
            <div className="col-2 text-right">
              <FavoriteComponent
                id={coordinatePost._id}
                favorited={coordinatePost.favorited_flg}
                favoriteCount={coordinatePost.favorite_count}
                coordinatePostFlag={true}
                postUserId={coordinatePost.post_user_id}
                heartMargin={"0px"}
                heartMinusMargin={"15px"}
              />
            </div>
            <div className="col-2 text-right">
              <UrlCopyIconComponent
                coordinateId={coordinatePost._id}
                iconMarginLeft="20px"
                urlLabelClassName="mr-1"
              />
            </div>
          </div>
          {(coordinatePost.detail || coordinatePost.price > 0) && (
            <>
              <hr
                style={{
                  width: "100%",
                }}
              />
              {coordinatePost.price > 0 && (
                <>
                  <div
                    className="mb-3 text-left"
                    style={{
                      width: "90%",
                    }}
                  >
                    <div>
                      <b>Price</b>
                    </div>
                    <div
                      className="text-left ml-3 mt-1"
                      style={{
                        width: "100%",
                      }}
                    >
                      <PriceDisplayComponent
                        price={coordinatePost.price}
                        sale={coordinatePost.sale}
                        salePriceFontSize={20}
                        suffix={"（送料・関税・手数料込み）"}
                      />
                    </div>
                  </div>
                </>
              )}
              {coordinatePost.detail && (
                <>
                  <div
                    className="text-left"
                    style={{
                      width: "90%",
                    }}
                  >
                    <b>Other Data</b>
                  </div>
                  <div
                    className="text-left ml-3 mt-1"
                    style={{
                      width: "90%",
                      whiteSpace: "pre-wrap",
                    }}
                  >
                    {coordinatePost.detail}
                  </div>
                </>
              )}
            </>
          )}
          {prop.adminFlag && (
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
                      (s) => s.value == coordinatePost.status
                    )?.label
                  }
                  <br />
                  インプレッション数：{coordinatePost.impression_count}
                  <br />
                  クリック数：
                  {coordinatePost.click_count}
                  <br />
                  購入申請数：
                  {coordinatePost.purchase_request_count}
                </div>
                <div className="col-4 text-right">
                  <div>
                    <CoordinatePostRegisterModal
                      coordinatePost={coordinatePost}
                      setRefetchTime={prop.setRefetchTime}
                      topPosition={"25%"}
                      setModalFlag={prop.setModalFlag}
                      shops={prop.shops}
                    />
                  </div>
                  <div className="mt-3">
                    <CoordinatePostDeleteModal
                      coordinatePost={coordinatePost}
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
