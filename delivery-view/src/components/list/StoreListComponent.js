import React, { useContext, useState } from "react";
import Modal from "react-modal";
import styled from "styled-components";
import { MapStore } from "../../store/MapStore";

const modalStyle = {
  content: {
    top: "50%",
    left: "50%",
    height: "75%",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: "0px",
  },
};

const closeBoxStyle = {
  top: "0px",
  height: "30px",
  textAlign: "right",
  position: "sticky",
  width: "100%",
  backgroundColor: "#ffffff",
  zIndex: "10",
};

const storeListStyle = {
  marginTop: "10px",
  marginBottom: "30px",
  listStyle: "none",
  fontSize: "16px",
  margin: "0",
  padding: "0",
};

const StoreStyle = styled.li`
  padding: 10px 0 10px 0;
  border-bottom: 1px solid #d8d8d8;
  position: relative;
  margin: 0;
  :hover {
    opacity: 0.5;
  }
  :after {
    content: "ぐるなびへ〉";
    position: absolute;
    color: #d8d8d8;
    right: 5px;
    top: 50px;
  }
`;

const storeLinkStyle = {
  display: "block",
  width: "100%",
  textDecoration: "none",
  color: "#000",
};

export default function StoreListComponent() {
  const { state } = useContext(MapStore);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  function openModal() {
    setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false);
  }

  return (
    <div>
      <button onClick={openModal}>店舗の一覧を表示</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={modalStyle}
        contentLabel="店舗一覧"
        ariaHideApp={false}
      >
        <div style={closeBoxStyle}>
          <button onClick={closeModal}>閉じる</button>
        </div>
        <div>
          <ul style={storeListStyle}>
            {state.displayStoreList.map((s) => {
              return (
                <StoreStyle>
                  <a
                    style={storeLinkStyle}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {s.name}
                    <br />
                    {s.category}
                    <br />
                    {s.image && s.image.length > 0 && (
                      <img src={s.image} alt={s.name} />
                    )}
                    <br />
                    {s.type === "all" && (
                      <span>テイクアウト・デリバリー可</span>
                    )}
                    {s.type === "deliverly" && <span>デリバリー可</span>}
                    {s.type === "takeout" && <span>テイクアウト可</span>}
                    <br />
                    【営業日】{s.opentime}
                    <br />
                    【休日】{s.holiday}
                    <br />
                    {s.pr}
                  </a>
                </StoreStyle>
              );
            })}
          </ul>
        </div>
      </Modal>
    </div>
  );
}
