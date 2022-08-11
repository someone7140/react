import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

import { loginUserState } from "../../../atoms/LoginUser";
import PurchaseRequestModalComponent from "./PurchaseRequestModalComponent";
import { updatePurchaseRequestCountToCoordinatePost } from "../../../services/api/ApiCoordinateService";

export default function PurchaseRequestIconComponent(prop) {
  const [user, setUser] = useRecoilState(loginUserState);
  const [displayModal, setDisplayModal] = useState(false);

  function onClickPurchaseRequest() {
    if (prop.coordinatePost && user.loginUser?.user_type !== "admin") {
      updatePurchaseRequestCountToCoordinatePost(prop.coordinatePost._id);
    }
    setDisplayModal(true);
  }

  return (
    <>
      <FontAwesomeIcon
        icon={faShoppingCart}
        className="fa-2x"
        style={{ width: "30px", height: "30px", color: "blue" }}
        role={"button"}
        color="black"
        onClick={onClickPurchaseRequest}
      />
      <div
        style={{
          fontSize: "10px",
          width: "50px",
          transform: "scale(0.8)",
          color: "black",
        }}
      >
        購入申請
      </div>
      {displayModal && (
        <PurchaseRequestModalComponent
          coordinatePost={prop.coordinatePost}
          displayModal={displayModal}
          setDisplayModal={setDisplayModal}
          modalTop={prop.modalTop}
        />
      )}
    </>
  );
}
