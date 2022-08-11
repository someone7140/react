import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { useRecoilState } from "recoil";
import { loginUserState } from "../../atoms/LoginUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWindowClose } from "@fortawesome/free-regular-svg-icons";

import { getCoordinateById } from "../../services/api/ApiCoordinateService";
import { getItemPostByItemId } from "../../services/api/ApiItemPostService";
import CoordinatePostWithIconComponent from "../coordinate/show/CoordinatePostWithIconComponent";
import CommonItemPostComponent from "../itemPost/show/CommonItemPostComponent";

export default function TopImageDetailModalComponent(prop) {
  const displayImage = prop.displayImage;
  const [user, setUser] = useRecoilState(loginUserState);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [coordinatePost, setCoordinatePost] = useState(false);
  const [itemPost, setItemPost] = useState(false);

  const modalStyle = {
    content: {
      top: "10%",
      left: "1%",
      right: "1%",
      bottom: "10%",
      maxWidth: "600px",
    },
    overlay: {
      backgroundColor: "rgba(0,0,0,.4)",
      zIndex: 20,
    },
  };

  useEffect(() => {
    if (prop.displayModal && displayImage.category === "coordinate") {
      getCoordinateById(
        displayImage._id,
        setError,
        setCoordinatePost,
        setLoading,
        user
      );
    }
    if (prop.displayModal && displayImage.category === "item") {
      getItemPostByItemId(
        displayImage._id,
        setError,
        setItemPost,
        user,
        setLoading
      );
    }
  }, [prop.displayModal]);

  return (
    <Modal isOpen={prop.displayModal} style={modalStyle}>
      <div style={{ maxWidth: "550px", position: "relative" }}>
        <FontAwesomeIcon
          icon={faWindowClose}
          className="fa-2x"
          style={{
            width: "30px",
            height: "30px",
            backgroundColor: "white",
            zIndex: 120,
            position: "sticky",
            top: "0%",
            marginLeft: "90%",
          }}
          role={"button"}
          color="black"
          onClick={() => {
            prop.setDisplayModal(false);
            setLoading(true);
            document.body.style.overflow = "unset";
          }}
        />
        {prop.displayModal &&
          !loading &&
          !error &&
          displayImage.category === "coordinate" && (
            <>
              <CoordinatePostWithIconComponent
                id={coordinatePost._id}
                coordinatePost={coordinatePost}
                setModalFlag={prop.setDisplayModal}
                shops={prop.shops}
                directAccess={true}
              />
            </>
          )}
        {prop.displayModal &&
          !loading &&
          !error &&
          displayImage.category === "item" && (
            <>
              <CommonItemPostComponent id={itemPost._id} postInfo={itemPost} />
            </>
          )}
        {error && <>投稿取得時にエラーが発生しました</>}
        {loading && (
          <div>
            <img src="/loading.gif" />
          </div>
        )}
      </div>
    </Modal>
  );
}
