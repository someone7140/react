import React, { useEffect, useRef } from "react";
import { useRecoilState } from "recoil";

import CoordinatePostImageRegisterComponent from "../register/CoordinatePostImageRegisterComponent";
import CoordinatePostRegisterModal from "../register/CoordinatePostRegisterModal";
import CoordinatePostDeleteModal from "../register/CoordinatePostDeleteModal";
import PurchaseRequestIconComponent from "../icon/PurchaseRequestIconComponent";
import UrlCopyIconComponent from "../icon/UrlCopyIconComponent";
import FavoriteComponent from "../../common/post/FavoriteComponent";
import { loginUserState } from "../../../atoms/LoginUser";
import { masterState } from "../../../atoms/Master";
import {
  updateClickCountToCoordinatePost,
  updateImpressionCountToCoordinatePost,
} from "../../../services/api/ApiCoordinateService";
import { getDateStrForItemPostDisplay } from "../../../services/common/DateService";
import PriceDisplayComponent from "./PriceDisplayComponent";

export default function CoordinatePostWithIconComponent(prop) {
  const coordinatePost = prop?.coordinatePost;
  const [user, setUser] = useRecoilState(loginUserState);
  const [master, setMaster] = useRecoilState(masterState);
  const imageChildRef = useRef(null);

  const onSizeClick = () => {
    imageChildRef.current?.setSelectLastImage();
  };

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
    const renderHtml = [];
    const gender = master?.master?.gender.find((g) => g.value == genderKey);
    const silhouette = master?.master?.silhouette.find(
      (g) => g.value == silhouetteKey
    );
    const category = master?.master?.coordinate_category.find(
      (g) => g.value == categoryKey
    )?.label;

    if (!gender && !silhouette && !height && !weight && !size && !category) {
      renderHtml.push(<>指定なし</>);
    } else {
      if (gender) {
        renderHtml.push(
          <div className="row col-4">
            <div className="mb-2">
              <img
                style={{
                  width: "30px",
                  height: "30px",
                }}
                alt="gender"
                src="/gender_icon.jpeg"
              />
              <div
                style={{
                  fontSize: "10px",
                  transform: "scale(0.8)",
                  color: "black",
                  marginLeft: "5px",
                }}
              >
                性別
              </div>
            </div>
            <div className="ml-2 mt-2">{gender.label}</div>
          </div>
        );
      }
      if (silhouette) {
        // ぽちゃりの場合は列幅を広げる
        const classNameSilhouette =
          "row mb-2 " + (silhouette.value === "chubby" ? "col-5" : "col-4");
        renderHtml.push(
          <div className={classNameSilhouette}>
            <div>
              <img
                style={{
                  width: "10px",
                  height: "23px",
                  marginLeft: "5px",
                }}
                alt="silhouette"
                src="/silhouette_icon.png"
              />
              <div
                style={{
                  fontSize: "10px",
                  transform: "scale(0.8)",
                  color: "black",
                  marginTop: "3px",
                }}
              >
                体型
              </div>
            </div>
            <div className="ml-2 mt-2">{silhouette.label}</div>
          </div>
        );
      }
      if (height) {
        renderHtml.push(
          <div className="row col-4 mb-2">
            <div>
              <img
                style={{
                  width: "15px",
                  height: "25px",
                  marginLeft: "5px",
                }}
                alt="height"
                src="/height_icon.png"
              />
              <div
                style={{
                  fontSize: "10px",
                  transform: "scale(0.8)",
                  color: "black",
                  marginTop: "3px",
                  marginLeft: "3px",
                }}
              >
                身長
              </div>
            </div>
            <div className="ml-2 mt-2">{height}cm</div>
          </div>
        );
      }
      if (weight) {
        renderHtml.push(
          <div className="row col-4 mb-2">
            <div>
              <img
                style={{
                  width: "22px",
                  height: "25px",
                  marginLeft: "5px",
                }}
                alt="weight"
                src="/weight_icon.png"
              />
              <div
                style={{
                  fontSize: "10px",
                  transform: "scale(0.8)",
                  color: "black",
                  marginTop: "3px",
                  marginLeft: "5px",
                }}
              >
                体重
              </div>
            </div>
            <div className="ml-2 mt-2">{weight}kg</div>
          </div>
        );
      }
      if (size) {
        renderHtml.push(
          <div className="row col-4 mb-2">
            <div>
              <img
                style={{
                  width: "22px",
                  height: "25px",
                }}
                alt="wear_size_icon"
                src="/wear_size_icon.png"
                className="ml-1"
              />
              <div
                style={{
                  fontSize: "10px",
                  transform: "scale(0.8)",
                  color: "black",
                  marginTop: "3px",
                }}
              >
                <span className="ml-1">着用</span>
                <div>サイズ</div>
              </div>
            </div>
            <div className="ml-2 mt-2">{size}</div>
          </div>
        );
      }
    }
    if (category) {
      renderHtml.push(
        <div className="row col-7 mb-2">
          <div>
            <img
              style={{
                width: "20px",
                height: "25px",
                marginLeft: "3px",
              }}
              alt="coordinate_category_icon"
              src="/coordinate_category_icon.jpg"
            />
            <div
              style={{
                fontSize: "10px",
                transform: "scale(0.8)",
                color: "black",
                marginTop: "10px",
              }}
            >
              カテゴリー
            </div>
          </div>
          <div
            className="mt-2"
            style={{
              position: "absolute",
              marginLeft: "30px",
            }}
          >
            {category}
          </div>
        </div>
      );
    }
    return renderHtml;
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
          <table style={{ width: "330px" }}>
            <tr>
              <td>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <div className="mt-1 ml-3">
                    <PurchaseRequestIconComponent
                      coordinatePost={coordinatePost}
                      modalTop="10%"
                    />
                  </div>
                  <div
                    style={{
                      height: "40px",
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "flex-end",
                    }}
                  >
                    {coordinatePost.url && (
                      <div>
                        <a
                          href={coordinatePost.url}
                          target="_blank"
                          onClick={() => linkClick(coordinatePost._id)}
                        >
                          <img
                            style={{
                              width: "25px",
                              height: "25px",
                              marginLeft: "8px",
                              marginTop: "4px",
                            }}
                            alt="shop"
                            src="/shop_icon.png"
                          />
                          <div
                            style={{
                              fontSize: "10px",
                              width: "50px",
                              transform: "scale(0.8)",
                              color: "black",
                            }}
                          >
                            ショップ
                            <div>ページ</div>
                          </div>
                        </a>
                      </div>
                    )}
                    <div className="ml-2" role="button">
                      <FavoriteComponent
                        id={coordinatePost._id}
                        favorited={coordinatePost.favorited_flg}
                        favoriteCount={coordinatePost.favorite_count}
                        coordinatePostFlag={true}
                        postUserId={coordinatePost.post_user_id}
                        hideCircle={true}
                        customHeartStyle={{
                          width: "25px",
                          heifht: "25px",
                        }}
                        customCountStyle={{
                          position: "relative",
                          bottom: "7px",
                          left: "8px",
                        }}
                        customStyle={{
                          height: "45px",
                        }}
                      />
                    </div>
                    <div className="mr-1">
                      <UrlCopyIconComponent
                        coordinateId={coordinatePost._id}
                        iconMarginLeft="15px"
                        urlLabelClassName="ml-3"
                        copyLabelClassName="ml-3"
                      />
                    </div>
                    <div role="button" onClick={onSizeClick}>
                      <img
                        style={{
                          width: "25px",
                          height: "25px",
                          marginTop: "4px",
                        }}
                        className="ml-2"
                        alt="size"
                        src="/size_icon.png"
                      />
                      <div
                        style={{
                          fontSize: "10px",
                          transform: "scale(0.8)",
                          color: "black",
                        }}
                        className="mt-1"
                      >
                        サイズ表
                      </div>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
            {coordinatePost?.images?.length > 0 && (
              <tr>
                <td>
                  <CoordinatePostImageRegisterComponent
                    ref={imageChildRef}
                    coordinatePost={coordinatePost}
                    showOnly={true}
                    imageCacheNoUse={prop.imageCacheNoUse}
                  />
                </td>
              </tr>
            )}
          </table>
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
                <td className="text-left">{coordinatePost.shop_name}</td>
              </tr>
              <tr>
                <td className="text-left">
                  <b style={{ fontSize: "1.2em" }}>{coordinatePost.title}</b>
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
            className="text-left"
            style={{
              width: "95%",
            }}
          >
            <b>Model Data</b>
          </div>
          <div
            style={{
              width: "95%",
            }}
            className="text-left row ml-1 mt-1"
          >
            {getCategryModel(
              coordinatePost?.model_attribute?.gender,
              coordinatePost?.model_attribute?.silhouette,
              coordinatePost?.model_attribute?.height,
              coordinatePost?.model_attribute?.weight,
              coordinatePost?.model_attribute?.size,
              coordinatePost?.category
            )}
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
                      width: "95%",
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
                      width: "95%",
                    }}
                  >
                    <b>Other Data</b>
                  </div>
                  <div
                    className="text-left ml-3 mt-1"
                    style={{
                      width: "100%",
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
          <div
            className="text-right mr-1"
            style={{
              width: "100%",
            }}
          >
            {getDateStrForItemPostDisplay(coordinatePost.post_date)}投稿
          </div>
        </div>
      )}
    </div>
  );
}
