import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
import CoordinateSearchComponent from "./CoordinateSearchComponent";

export default function CoordinateSearchModal(prop) {
  const [coordinateSearchModalOpen, setCoordinateSearchModalOpen] =
    useState(false);
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

  const afterSearch = () => {
    toast("コーデ一覧の表示を更新しました");
  };

  return (
    <div className="row">
      <div>
        <Button
          variant={"success"}
          onClick={() => {
            setCoordinateSearchModalOpen(true);
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
              prop.setSearchInfo(undefined);
              toast("検索条件をクリアしました");
            }}
          >
            検索条件クリア
          </Button>
        </div>
      )}
      <Modal isOpen={coordinateSearchModalOpen} style={modalStyle}>
        {coordinateSearchModalOpen && (
          <CoordinateSearchComponent
            setCoordinateSearchModalOpen={setCoordinateSearchModalOpen}
            setModalFlag={prop.setModalFlag}
            searchInfo={prop.searchInfo}
            setSearchInfo={prop.setSearchInfo}
            displaySearchClearFlag={prop.displaySearchClearFlag}
            afterSearch={afterSearch}
            master={prop.master}
            shops={prop.shops}
          />
        )}
      </Modal>
    </div>
  );
}
