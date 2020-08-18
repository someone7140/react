import React, { useState } from "react";
import Modal from "react-modal";
import { useRecoilState } from "recoil";
import { searchConditionState } from "../../atoms/SearchCondition";
import { PREFECTURE_LIST } from "../../constants/Covit19Constants";
import classes from "../../css/Common.module.css";

const modalStyle = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const checkBoxStyle = {
  marginRight: "15px",
};

export default function PrefectureSelectComponent(prop) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [prefectures, setPrefectures] = useState([]);
  const [searchCondition, setSearchConditionState] = useRecoilState(
    searchConditionState
  );

  function openModal() {
    if (searchCondition.prefectures && searchCondition.prefectures.length > 0) {
      setPrefectures(searchCondition.prefectures);
    }
    setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false);
  }

  function cancelSelect() {
    setPrefectures([]);
    closeModal();
  }
  function isPrefectureSelect(prefectureValue) {
    return prefectures.find((p) => p === prefectureValue) !== undefined;
  }

  function onCheckBoxChange(e) {
    const targetPrefectureCode = parseInt(e.target.value);
    if (isPrefectureSelect(targetPrefectureCode)) {
      setPrefectures(prefectures.filter((c) => c !== targetPrefectureCode));
    } else {
      setPrefectures([...prefectures, targetPrefectureCode]);
    }
  }

  function setSelectedPrefectures() {
    setSearchConditionState({
      ...searchCondition,
      ...prop.input,
      prefectures: prefectures.slice().sort(),
    });
    closeModal();
  }

  return (
    <div>
      <button onClick={openModal}>都道府県選択</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={modalStyle}
        contentLabel="都道府県選択"
        ariaHideApp={false}
      >
        <div className={classes.AlignRight}>
          <button onClick={cancelSelect}>閉じる</button>
        </div>
        <br />
        <br />
        <div>
          {PREFECTURE_LIST.map((p) => {
            return (
              <span key={p.value} style={checkBoxStyle}>
                <input
                  type="checkbox"
                  name={p.value}
                  value={p.value}
                  defaultChecked={isPrefectureSelect(p.value)}
                  onChange={onCheckBoxChange}
                />
                {p.label}
              </span>
            );
          })}
        </div>
        <br />
        <div className={classes.AlignCenter}>
          <button onClick={setSelectedPrefectures}>設定する</button>
        </div>
      </Modal>
    </div>
  );
}
