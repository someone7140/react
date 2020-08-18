import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Modal from "react-modal";
import { useRecoilState, useSetRecoilState } from "recoil";
import ja from "date-fns/locale/ja";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker, { registerLocale } from "react-datepicker";
import { searchConditionState } from "../../atoms/SearchCondition";
import { searchConditionSelectState } from "../../atoms/SearchConditionSelectList";
import { RANGE_DATE } from "../../constants/Covit19Constants";
import PrefectureSelectComponent from "./PrefectureSelectComponent";
import {
  getEndDateFromRange,
  getStartDateFromRange,
} from "../../service/DateService";
import {
  addSearchConditionData,
  resetConditionState,
} from "../../service/StorageService";
import classes from "../../css/Common.module.css";

registerLocale("ja", ja);

const defaultRange = "1week";

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

const textStyle = {
  width: "250px",
  height: "18px",
};

export default function SearchInputComponent() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [input, setInput] = useState({});
  const [initialFlg, setInitialFlg] = useState(true);
  const [searchCondition, setSearchConditionState] = useRecoilState(
    searchConditionState
  );
  const setSearchConditionSelectState = useSetRecoilState(
    searchConditionSelectState
  );

  useEffect(() => {
    if (searchCondition.key) {
      setInput({
        startDate: searchCondition.startDate,
        endDate: searchCondition.endDate,
        selectRange: searchCondition.selectRange,
      });
      if (initialFlg) {
        setInitialFlg(false);
        setSearchConditionState({
          ...searchCondition,
          graphDisplayFlg: true,
        });
      }
    } else {
      if (!input.selectRange) {
        setInput({
          selectRange: defaultRange,
        });
      }
    }
  }, [initialFlg, setInitialFlg, searchCondition, setSearchConditionState]);

  function setDateRangeSelect(e) {
    setInput({
      ...input,
      startDate: getStartDateFromRange(input.selectRange, input.startDate),
      endDate: getEndDateFromRange(input.selectRange, input.endDate),
      selectRange: e.target.value,
    });
  }

  function getStartDate() {
    return getStartDateFromRange(input.selectRange, input.startDate);
  }

  function handleChangeStartDate(selectedDate) {
    setInput({
      ...input,
      startDate: selectedDate,
      selectRange: "directInput",
    });
  }

  function getEndDate() {
    return getEndDateFromRange(input.selectRange, input.endDate);
  }

  function handleChangeEndDate(selectedDate) {
    setInput({
      ...input,
      endDate: selectedDate,
      selectRange: "directInput",
    });
  }

  function handleChangeConditionName(e) {
    setInput({
      ...input,
      conditionName: e.target.value,
    });
  }

  function storeSearchCondition() {
    addSearchConditionData(
      getForStoreCondition(),
      setSearchConditionSelectState
    );
    closeStoreModal();
    toast("検索条件を保存しました");
  }

  function execSearch() {
    resetConditionState(getForStoreCondition(), setSearchConditionState);
    toast("グラフを更新しました");
  }

  function getForStoreCondition() {
    return input.selectRange === "directInput"
      ? {
          ...searchCondition,
          conditionName: input.conditionName,
          startDate: input.startDate,
          endDate: input.endDate,
          selectRange: input.selectRange,
        }
      : {
          ...searchCondition,
          conditionName: input.conditionName,
          selectRange: input.selectRange,
        };
  }

  function openStoreModal() {
    setModalIsOpen(true);
  }

  function closeStoreModal() {
    setModalIsOpen(false);
  }

  function checkEnableStore() {
    return (
      input.selectRange !== "directInput" || input.startDate <= input.endDate
    );
  }

  return (
    <div>
      <div>
        <div>
          【集計期間】
          <select value={input.selectRange} onChange={setDateRangeSelect}>
            {RANGE_DATE.map((d) => (
              <option value={d.value} key={d.value}>
                {d.label}
              </option>
            ))}
          </select>
          <br />
          開始日付：
          <DatePicker
            locale="ja"
            selected={getStartDate()}
            onChange={handleChangeStartDate}
          />
          <br />
          終了日付：
          <DatePicker
            locale="ja"
            selected={getEndDate()}
            onChange={handleChangeEndDate}
          />
        </div>
        <br />
        <PrefectureSelectComponent input={input} />
        <br />
        <button onClick={execSearch} disabled={!checkEnableStore()}>
          検索する
        </button>
        &nbsp;&nbsp;
        <button onClick={openStoreModal} disabled={!checkEnableStore()}>
          この検索条件を保存する
        </button>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeStoreModal}
          style={modalStyle}
          contentLabel="検索条件保存"
          ariaHideApp={false}
        >
          <div className="align-right">
            <button onClick={closeStoreModal}>閉じる</button>
          </div>
          <br />
          <br />
          <input
            type="text"
            name="conditionName"
            value={input.conditionName}
            onChange={handleChangeConditionName}
            placeholder="条件名を入力してください"
            style={textStyle}
          />
          <br />
          <br />
          <div className={classes.AlignCenter}>
            <button
              onClick={storeSearchCondition}
              disabled={!input.conditionName}
            >
              保存する
            </button>
          </div>
        </Modal>
      </div>
    </div>
  );
}
