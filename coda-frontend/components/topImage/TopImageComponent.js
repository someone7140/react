import React, { useState } from "react";
import { useRecoilState } from "recoil";

import { masterState } from "../../atoms/Master";
import TopImageDetailModalComponent from "./TopImageDetailModalComponent";
import FavoriteComponent from "../common/post/FavoriteComponent";
import PriceDisplayComponent from "../coordinate/show/PriceDisplayComponent";

export default function TopImageComponent(prop) {
  const [displayModal, setDisplayModal] = useState(false);
  const displayImage = prop.displayImage;
  const [master, setMaster] = useRecoilState(masterState);
  const coordinateCategory =
    displayImage.category === "coordinate"
      ? master?.master?.coordinate_category.find((c) => {
          return c.value === displayImage.coordinate_category;
        })?.label
      : "";

  const displayDetailModal = () => {
    setDisplayModal(true);
    document.body.style.overflow = "hidden";
  };
  return (
    <>
      <div
        style={{
          position: "relative",
          paddingTop: "100%",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
          }}
        >
          <img
            src={displayImage.image_url}
            style={{ width: "100%", height: "100%" }}
            onClick={displayDetailModal}
            role={"button"}
          />
        </div>
      </div>
      <div
        className="mt-2 row"
        style={{ fontSize: "0.6em", marginLeft: "5px" }}
      >
        <div style={{ width: "70%" }}>
          {displayImage.category === "coordinate" && (
            <>
              {coordinateCategory && <div>{coordinateCategory}</div>}
              <a
                href={
                  "/coordinate/coordinateList?shopSettingId=" +
                  displayImage.shop_setting_id
                }
                target="_blank"
              >
                {displayImage.shop_name}
              </a>
              {(displayImage.price > 0 || displayImage.sale) && (
                <div className="mb-2">
                  <PriceDisplayComponent
                    price={displayImage.price}
                    sale={displayImage.sale}
                    salePriceFontSize={12}
                  />
                </div>
              )}
            </>
          )}
          {displayImage.category === "item" && (
            <>
              [投稿者]
              <br />
              <a
                href={
                  "/itemPost/userPosts?userSettingId=" +
                  displayImage.post_user_setting_id
                }
                target="_blank"
              >
                {displayImage.post_user_name}
              </a>
            </>
          )}
        </div>
        <div style={{ width: "30%" }}>
          <FavoriteComponent
            id={displayImage._id}
            favorited={displayImage.favorited_flg}
            coordinatePostFlag={displayImage.category === "coordinate"}
            itemPostFlag={displayImage.category === "item"}
            postUserId={displayImage.post_user_id}
            hideCircle={true}
          />
        </div>
        <TopImageDetailModalComponent
          displayModal={displayModal}
          setDisplayModal={setDisplayModal}
          displayImage={displayImage}
          shops={prop.shops}
        />
        <br />
        <br />
        <br />
      </div>
    </>
  );
}
