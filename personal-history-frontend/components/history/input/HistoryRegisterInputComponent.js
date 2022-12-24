import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretUp,
  faCaretDown,
  faWindowClose,
} from "@fortawesome/free-solid-svg-icons";

import {
  getMonthStrFromTime,
  getTimeFromMonthStr,
} from "../../../services/date/DateService";

export default function HistoryRegisterInputComponent(prop) {
  const index = prop.index;
  const titleFieldName = `${prop.fieldArrayName}.${index}.title`;
  const titleErrorMessage =
    prop.errors?.[prop.fieldArrayName]?.[index]?.["title"]?.message;
  const startDateYyyyMMStrFieldName = `${prop.fieldArrayName}.${index}.startDateYyyyMMStr`;
  const [startDateTimeState, setStartDateTimeState] = useState(
    getTimeFromMonthStr(prop.getValues().histories[index].startDateYyyyMMStr)
  );
  const endDateYyyyMMStrFieldName = `${prop.fieldArrayName}.${index}.endDateYyyyMMStr`;
  const [endDateTimeState, setEndDateTimeState] = useState(
    getTimeFromMonthStr(prop.getValues().histories[index].endDateYyyyMMStr)
  );
  const descriptionFieldName = `${prop.fieldArrayName}.${index}.description`;

  return (
    <div class="border border-indigo-600 p-6">
      <div>
        <div className="text-right">
          <FontAwesomeIcon
            icon={faWindowClose}
            className="w-6 h-6 text-stone-400"
            role="button"
            onClick={() => {
              prop.onClickDelete(index);
            }}
          />
        </div>
        <label htmlFor={titleFieldName}>
          タイトル
          <span className="text-red-500 text-xs ml-1">*</span>
        </label>
        <br />
        <input
          id={titleFieldName}
          type="text"
          name={titleFieldName}
          className="border-solid border-2"
          {...prop.register(titleFieldName, {
            required: "タイトルは必須項目です",
            maxLength: {
              value: 300,
              message: "300文字以下で入力してください",
            },
          })}
        />
        {titleErrorMessage && (
          <div className="text-red-500 text-xs">{titleErrorMessage}</div>
        )}
      </div>
      <div className="mt-2">
        <label htmlFor={startDateYyyyMMStrFieldName}>開始年月</label>
        <br />
        <DatePicker
          id={startDateYyyyMMStrFieldName}
          name={startDateYyyyMMStrFieldName}
          selected={startDateTimeState}
          className="border-solid border-2"
          onChange={(date) => {
            prop.update(prop.index, {
              ...prop.getValues().histories[index],
              startDateYyyyMMStr: getMonthStrFromTime(date),
            });
            setStartDateTimeState(date);
          }}
          dateFormat="yyyy/MM"
          showMonthYearPicker
          isClearable
        />
      </div>
      <div className="mt-2">
        <label htmlFor={endDateYyyyMMStrFieldName}>終了年月</label>
        <br />
        <DatePicker
          id={endDateYyyyMMStrFieldName}
          name={endDateYyyyMMStrFieldName}
          selected={endDateTimeState}
          className="border-solid border-2"
          onChange={(date) => {
            prop.update(prop.index, {
              ...prop.getValues().histories[index],
              endDateYyyyMMStr: getMonthStrFromTime(date),
            });
            setEndDateTimeState(date);
          }}
          dateFormat="yyyy/MM"
          showMonthYearPicker
          isClearable
        />
      </div>
      <div className="mt-2">
        <label htmlFor={descriptionFieldName}>詳細</label>
        <br />
        <textarea
          id={descriptionFieldName}
          rows="4"
          name={descriptionFieldName}
          className="w-64 border-solid border-2"
          {...prop.register(descriptionFieldName)}
        />
      </div>
      <div className="mt-2">
        <div className="flex justify-center items-center flex-row">
          {prop.index > 0 && (
            <div>
              <FontAwesomeIcon
                icon={faCaretUp}
                className="w-8 h-8 mt-1 text-sky-300"
                role="button"
                onClick={() => {
                  prop.upSort(index);
                }}
              />
            </div>
          )}
          {prop.getValues().histories.length > index + 1 && (
            <div>
              <FontAwesomeIcon
                icon={faCaretDown}
                className={"w-8 h-8 text-sky-300" + (index == 0 ? "" : " ml-2")}
                role="button"
                onClick={() => {
                  prop.downSort(index);
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
