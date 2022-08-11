import React, { useState } from "react";
import Modal from "react-modal";
import { Button } from "react-bootstrap";
import ShopRegisterComponent from "./ShopRegisterComponent";

export default function ShopRegisterModal(prop) {
  const [shopModalOpen, setShopModalOpen] = useState(false);
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
        variant={prop.shopInfo ? "success" : "primary"}
        onClick={() => {
          setShopModalOpen(true);
          if (prop.setModalFlag) {
            prop.setModalFlag(true);
          }
          document.body.style.overflow = "hidden";
        }}
      >
        {!prop.shopInfo && <> 新規登録</>}
        {prop.shopInfo && <> 編集</>}
      </Button>
      <Modal isOpen={shopModalOpen} style={modalStyle}>
        {shopModalOpen && (
          <ShopRegisterComponent
            shopInfo={prop.shopInfo}
            setShopModalOpen={setShopModalOpen}
            setModalFlag={prop.setModalFlag}
            setRefetchTime={prop.setRefetchTime}
          />
        )}
      </Modal>
    </>
  );
}
