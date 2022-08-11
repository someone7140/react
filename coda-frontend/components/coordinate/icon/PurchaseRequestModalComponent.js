import React from "react";
import Modal from "react-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWindowClose } from "@fortawesome/free-regular-svg-icons";

import LineAccountLink, { CODA_LINE_URL } from "../../common/LineAccountLink";

import UrlCopyIconComponent from "./UrlCopyIconComponent";

export default function PurchaseRequestModalComponent(prop) {
  const modalStyle = {
    content: {
      top: prop.modalTop,
      left: "1%",
      right: "1%",
      bottom: "10%",
      zIndex: 3000,
      maxWidth: "600px",
    },
    overlay: {
      backgroundColor: "rgba(0,0,0,.4)",
      zIndex: 20,
    },
  };

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
          }}
        />
        <div className="mt-3">
          <b>{prop.coordinatePost.title}</b>の購入に進まれる際は、
          <br />
          <LineAccountLink />
          のメッセージにて
          <br />
          ・氏名
          <br />
          ・住所
          <br />
          ・電話番号 <br />
          ・商品URL
          <br />
          ・サイズ <br />
          をご連絡ください。
          <div
            className="mt-1"
            style={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <div className="mt-2">商品URLは</div>
            <div>
              <UrlCopyIconComponent
                coordinateId={prop.coordinatePost._id}
                iconMarginLeft="10px"
                urlLabelClassName="ml-2"
                copyLabelClassName="ml-2"
              />
            </div>
            <div className="mt-2">を押してコピーください。</div>
          </div>
          <div
            className="text-center"
            style={{
              marginTop: "40px",
            }}
          >
            <div>
              <a href={CODA_LINE_URL} target="_blank">
                <img
                  src="/line_icon.png"
                  style={{ width: "100px", height: "100px" }}
                />
              </a>
            </div>
            <div className="mt-2">CODA公式LINEへ</div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
