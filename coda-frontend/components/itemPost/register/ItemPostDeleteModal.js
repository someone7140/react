import React, { useState } from "react";
import Modal from "react-modal";
import { Button } from "react-bootstrap";
import ItemPostDeleteComponent from "./ItemPostDeleteComponent";

export default function ItemPostDeleteModal(prop) {
  const [itemPostDeleteModalOpen, setItemPostDeletetModalOpen] =
    useState(false);

  const modalStyle = {
    content: {
      top: "30%",
      left: "5%",
      right: "5%",
      bottom: "30%",
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
          setItemPostDeletetModalOpen(true);
        }}
      >
        削除
      </Button>
      <Modal isOpen={itemPostDeleteModalOpen} style={modalStyle}>
        {itemPostDeleteModalOpen && (
          <ItemPostDeleteComponent
            setItemPostDeletetModalOpen={setItemPostDeletetModalOpen}
            itemPostId={prop.itemPost._id}
            title={prop.itemPost.title}
            setRefetchTime={prop.setRefetchTime}
          />
        )}
      </Modal>
    </>
  );
}
