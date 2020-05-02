import React, { useContext, useState } from "react";
import Modal from "react-modal";
import { MapStore } from "../../store/MapStore";
import { setSelectedCategoryDispatch } from "../../util/DispatchUtil";

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

const closeBoxStyle = {
  textAlign: "right",
};

const setBoxStyle = {
  textAlign: "center",
};

const checkBoxStyle = {
  marginRight: "15px",
};

export default function CategoryComponent() {
  const { state, dispatch } = useContext(MapStore);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [categorySetFlg, setCategorySetFlg] = useState(false);
  const [categorySelect, setCategorySelect] = useState([]);

  function openModal() {
    setModalIsOpen(true);
    setCategorySetFlg(state.selectedCategory.length > 0);
    setCategorySelect(state.selectedCategory);
  }

  function closeModal() {
    setModalIsOpen(false);
  }

  function setSelectedCategory() {
    setSelectedCategoryDispatch(dispatch, categorySelect);
    setModalIsOpen(false);
  }

  function onCategorySelect() {
    setCategorySetFlg(true);
  }

  function onCheckBoxChange(e) {
    const targetCategoryCode = e.target.value;
    if (isIncludeCategorySelect(targetCategoryCode)) {
      setCategorySelect(categorySelect.filter((c) => c !== targetCategoryCode));
    } else {
      setCategorySelect([...categorySelect, targetCategoryCode]);
    }
  }

  function isIncludeCategorySelect(categoryCode) {
    return categorySelect.find((cs) => cs === categoryCode) !== undefined;
  }

  return (
    <div>
      <button onClick={openModal}>カテゴリー設定</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={modalStyle}
        contentLabel="カテゴリー設定"
        ariaHideApp={false}
      >
        <div style={closeBoxStyle}>
          <button onClick={closeModal}>閉じる</button>
        </div>
        <div>
          カテゴリーを指定しない
          <input
            type="radio"
            name="nonCategorySelect"
            value="nonCategorySelect"
            checked={!categorySetFlg}
            onChange={() => setCategorySetFlg(false)}
          />
          <br />
          カテゴリーを指定する
          <input
            type="radio"
            name="categorySelect"
            value="categorySelect"
            checked={categorySetFlg}
            onChange={onCategorySelect}
          />
          <br />
        </div>
        {categorySetFlg &&
          state.categoryLList.map((cl) => {
            return (
              <span key={cl.code} style={checkBoxStyle}>
                <input
                  type="checkbox"
                  name={cl.code}
                  value={cl.code}
                  defaultChecked={isIncludeCategorySelect(cl.code)}
                  onChange={onCheckBoxChange}
                />
                {cl.name}
              </span>
            );
          })}
        <div style={setBoxStyle}>
          <button onClick={setSelectedCategory}>設定する</button>
        </div>
      </Modal>
    </div>
  );
}
