import React, { useState } from "react";
import Modal from "react-modal";
import { Button } from "react-bootstrap";
import ShopDeleteComponent from "./ShopDeleteComponent";

export default function ShopDeleteModal(prop) {
  const [shopDeleteModalOpen, setShopDeletetModalOpen] = useState(false);

  const modalStyle = {
    content: {
      top: "35%",
      left: "5%",
      right: "5%",
      bottom: "35%",
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
          setShopDeletetModalOpen(true);
        }}
      >
        削除
      </Button>
      <Modal isOpen={shopDeleteModalOpen} style={modalStyle}>
        {shopDeleteModalOpen && (
          <ShopDeleteComponent
            setShopDeletetModalOpen={setShopDeletetModalOpen}
            shopSettingId={prop?.shopInfo?.shop_setting_id}
            name={prop?.shopInfo?.name}
            setRefetchTime={prop.setRefetchTime}
          />
        )}
      </Modal>
    </>
  );
}
