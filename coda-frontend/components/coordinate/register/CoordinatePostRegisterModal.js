import React, { useState } from "react";
import Modal from "react-modal";
import { Button } from "react-bootstrap";
import CoordinatePostRegisterComponent from "./CoordinatePostRegisterComponent";

export default function CoordinatePostRegisterModal(prop) {
  const [coordinatePostRegisterModalOpen, setCoordinatePostRegisterModalOpen] =
    useState(false);
  const modalStyle = {
    content: {
      top: prop.topPosition ? prop.topPosition : "0%",
      left: "2%",
      right: "2%",
    },
    overlay: {
      backgroundColor: "rgba(0,0,0,.4)",
      zIndex: 20,
    },
  };

  return (
    <>
      <Button
        variant={prop.coordinatePost ? "success" : "primary"}
        onClick={() => {
          setCoordinatePostRegisterModalOpen(true);
          if (prop.setModalFlag) {
            prop.setModalFlag(true);
          }
          document.body.style.overflow = "hidden";
        }}
      >
        {!prop.coordinatePost && <> 新規投稿</>}
        {prop.coordinatePost && <> 編集</>}
      </Button>
      <Modal isOpen={coordinatePostRegisterModalOpen} style={modalStyle}>
        {coordinatePostRegisterModalOpen && (
          <CoordinatePostRegisterComponent
            coordinatePost={prop.coordinatePost}
            setCoordinatePostRegisterModalOpen={
              setCoordinatePostRegisterModalOpen
            }
            setModalFlag={prop.setModalFlag}
            setRefetchTime={prop.setRefetchTime}
            shops={prop.shops}
          />
        )}
      </Modal>
    </>
  );
}
