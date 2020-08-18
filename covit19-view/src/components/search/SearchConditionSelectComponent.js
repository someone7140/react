import React, { useState } from "react";
import { toast } from "react-toastify";
import Modal from "react-modal";
import { useRecoilState, useSetRecoilState } from "recoil";
import { searchConditionState } from "../../atoms/SearchCondition";
import { searchConditionSelectState } from "../../atoms/SearchConditionSelectList";
import {
  deleteSearchConditionFromLocalStorage,
  resetConditionState,
  updateSelected,
} from "../../service/StorageService";
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

export default function SearchConditionSelectComponent() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [searchConditionSelect, setSearchConditionSelectState] = useRecoilState(
    searchConditionSelectState
  );
  const setSearchConditionState = useSetRecoilState(searchConditionState);

  function getSelectedSearchCondition() {
    const selectedFind = searchConditionSelect.find((s) => {
      return s.selected;
    });
    if (selectedFind) {
      return selectedFind.key;
    } else {
      return undefined;
    }
  }

  function setConditionSelect(e) {
    const selectedFind = searchConditionSelect.find((s) => {
      return s.key === e.target.value;
    });
    if (selectedFind) {
      resetConditionState(
        {
          ...selectedFind,
          selected: true,
        },
        setSearchConditionState
      );
      updateSelected(selectedFind.key, setSearchConditionSelectState);
      toast("グラフを更新しました");
    }
  }

  function openModal() {
    setModalIsOpen(true);
  }
  function closeModal() {
    setModalIsOpen(false);
  }

  function deleteCondition() {
    deleteSearchConditionFromLocalStorage(
      getSelectedSearchCondition(),
      setSearchConditionSelectState
    );
    const selectedFind = searchConditionSelect.find((s) => {
      return s.selected;
    });
    if (selectedFind) {
      toast("検索条件を削除しました");
      resetConditionState(selectedFind, setSearchConditionState);
    }
    closeModal();
  }

  return (
    <div>
      <select
        value={getSelectedSearchCondition()}
        onChange={setConditionSelect}
      >
        {searchConditionSelect.map((s) => (
          <option value={s.key} key={s.key}>
            {s.conditionName}
          </option>
        ))}
      </select>
      &nbsp;&nbsp;
      <button onClick={openModal}>選択した検索条件を削除</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={modalStyle}
        contentLabel="検索条件保存"
        ariaHideApp={false}
      >
        <div className={classes.AlignCenter}>
          検索条件を削除します。
          <br />
          <br />
          <button onClick={deleteCondition}>削除する</button>&nbsp;&nbsp;
          <button onClick={closeModal}>キャンセル</button>
        </div>
      </Modal>
    </div>
  );
}
