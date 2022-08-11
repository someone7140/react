import React from "react";
import { useRecoilState } from "recoil";

import { masterState } from "../../../atoms/Master";

import ShopRegisterModal from "../../admin/shop/register/ShopRegisterModal";
import ShopDeleteModal from "../../admin/shop/register/ShopDeleteModal";
import { getDateStrDisplay } from "../../../services/common/DateService";

export default function ShopShowComponent(prop) {
  const shopInfo = prop?.shopInfo;
  const [master, setMaster] = useRecoilState(masterState);

  function getTargetUser(inputShopInfo) {
    const gender = master?.master?.gender.find(
      (g) => g.value == inputShopInfo.gender
    );
    const silhouette = master?.master?.silhouette.find(
      (g) => g.value == inputShopInfo.silhouette
    );
    const minHeight = inputShopInfo.min_height;
    const maxHeight = inputShopInfo.max_height;
    const minWeight = inputShopInfo.min_weight;
    const maxWeight = inputShopInfo.max_weight;

    if (
      !gender &&
      !silhouette &&
      !minHeight &&
      !maxHeight &&
      !minWeight &&
      !maxWeight
    ) {
      return "指定なし";
    } else {
      var result = "";
      if (gender) {
        result =
          result +
          "性別：" +
          gender.label +
          (silhouette || minHeight || maxHeight || minWeight || maxWeight
            ? "<br/>"
            : "");
      }
      if (silhouette) {
        result =
          result +
          "体型：" +
          silhouette.label +
          (minHeight || maxHeight || minWeight || maxWeight ? "<br/>" : "");
      }
      if (minHeight || maxHeight) {
        if (minHeight && maxHeight) {
          result = result + `身長：${minHeight}cm 〜 ${maxHeight}cm`;
        } else if (minHeight) {
          result = result + `身長：${minHeight}cm 〜`;
        } else {
          result = result + `身長：〜 ${maxHeight}cm`;
        }
        if (minWeight || maxWeight) {
          result = result + "<br/>";
        }
      }
      if (minWeight || maxWeight) {
        if (minWeight && maxWeight) {
          result = result + `体重：${minWeight}kg 〜 ${maxWeight}kg`;
        } else if (minWeight) {
          result = result + `体重：${minWeight}kg 〜`;
        } else {
          result = result + `体重：〜 ${maxWeight}kg`;
        }
      }

      return result;
    }
  }

  return (
    <div>
      {shopInfo && (
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
          <span>
            <div className="text-center">
              <div>【ショップ名】</div>
              {shopInfo?.shop_url && (
                <a href={shopInfo.shop_url} target="_blank">
                  {shopInfo.name}
                </a>
              )}
              {!shopInfo?.shop_url && <>{shopInfo.name}</>}
            </div>
            {prop.adminFlag && (
              <div className="mt-2">
                登録日時：{getDateStrDisplay(shopInfo?.create_date)}
              </div>
            )}
          </span>
          <hr
            style={{
              width: "100%",
            }}
          />
          <div
            style={{
              width: "100%",
            }}
            className="row"
          >
            <div className="col-12 text-center">
              【主なユーザ層】
              <br />
              <span
                dangerouslySetInnerHTML={{
                  __html: getTargetUser(shopInfo?.shop_target_user),
                }}
              />
            </div>
          </div>
          {shopInfo.detail && (
            <>
              <hr
                style={{
                  width: "100%",
                }}
              />
              <div
                className="text-center"
                style={{
                  width: "100%",
                  whiteSpace: "pre-wrap",
                }}
              >
                {shopInfo.detail}
              </div>
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
                <div
                  className="row mx-auto"
                  style={{
                    width: "500px",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <div>
                    <ShopRegisterModal
                      shopInfo={shopInfo}
                      setRefetchTime={prop.setRefetchTime}
                      topPosition={"15%"}
                      setModalFlag={prop.setModalFlag}
                    />
                  </div>
                  <div style={{ marginLeft: "30px" }}>
                    <ShopDeleteModal
                      shopInfo={shopInfo}
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
