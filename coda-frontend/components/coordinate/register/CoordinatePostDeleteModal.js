import React, { useState } from "react";
import Modal from "react-modal";
import { Button } from "react-bootstrap";
import CoordinatePostDeleteComponent from "./CoordinatePostDeleteComponent";

export default function CoordinatePostDeleteModal(prop) {
  const [coordinatePostDeleteModalOpen, setCoordinatePostDeleteModalOpen] =
    useState(false);

  const modalStyle = {
    content: {
      top: "40%",
      left: "5%",
      right: "5%",
      bottom: "40%",
    },
    overlay: {
      backgroundColor: "rgba(0,0,0,.4)",
      zIndex: 20,
    },
  };

  return (
    <>
      <Button
        variant={"secondary"}
        onClick={() => {
          setCoordinatePostDeleteModalOpen(true);
        }}
      >
        削除
      </Button>
      <Modal isOpen={coordinatePostDeleteModalOpen} style={modalStyle}>
        {coordinatePostDeleteModalOpen && (
          <CoordinatePostDeleteComponent
            setCoordinatePostDeleteModalOpen={setCoordinatePostDeleteModalOpen}
            coordinatePostId={prop.coordinatePost._id}
            title={prop.coordinatePost.title}
            setRefetchTime={prop.setRefetchTime}
          />
        )}
      </Modal>
    </>
  );
}
