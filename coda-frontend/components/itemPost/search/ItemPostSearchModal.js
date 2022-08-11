import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { Button } from "react-bootstrap";
import ItemPostSearchComponent from "./ItemPostSearchComponent";

export default function ItemPostSearchModal(prop) {
  const [itemPostSearchModalOpen, setItemPostSearchModalOpen] = useState(false);
  const [clearDisplayFlag, setClearDisplayFlag] = useState(false);

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

  useEffect(() => {
    if (prop.searchInfo) {
      setClearDisplayFlag(prop.displaySearchClearFlag(prop.searchInfo));
    } else {
      setClearDisplayFlag(false);
    }
  }, [prop.searchInfo]);

  return (
    <div className="row">
      <div>
        <Button
          variant={"success"}
          onClick={() => {
            setItemPostSearchModalOpen(true);
            if (prop.setModalFlag) {
              prop.setModalFlag(true);
            }
            document.body.style.overflow = "hidden";
          }}
        >
          投稿検索
        </Button>
      </div>
      {clearDisplayFlag && (
        <div className="ml-2">
          <Button
            variant={"secondary"}
            onClick={() => {
              if (prop.userSettingId) {
                prop.setSearchInfo({
                  user_setting_id: prop.userSettingId,
                });
              } else {
                prop.setSearchInfo(undefined);
              }
            }}
          >
            検索条件クリア
          </Button>
        </div>
      )}
      <Modal isOpen={itemPostSearchModalOpen} style={modalStyle}>
        {itemPostSearchModalOpen && (
          <ItemPostSearchComponent
            setItemPostSearchModalOpen={setItemPostSearchModalOpen}
            setModalFlag={prop.setModalFlag}
            searchInfo={prop.searchInfo}
            setSearchInfo={prop.setSearchInfo}
            userSettingId={prop.userSettingId}
            displaySearchClearFlag={prop.displaySearchClearFlag}
          />
        )}
      </Modal>
    </div>
  );
}
