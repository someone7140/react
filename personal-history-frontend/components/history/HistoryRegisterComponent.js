import { useEffect } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePlus } from "@fortawesome/free-regular-svg-icons";
import { useFieldArray, useForm } from "react-hook-form";

import HistoryRegisterInputComponent from "./input/HistoryRegisterInputComponent";

export default function HistoryRegisterComponent(prop) {
  const initialHistory = prop.history;
  const fieldArrayName = "histories";
  const { control, register, handleSubmit, formState, getValues } = useForm({
    mode: "onChange",
  });
  const { fields, append, remove, replace, swap, update } = useFieldArray({
    control,
    name: fieldArrayName,
  });

  useEffect(() => {
    if (initialHistory?.historyRecords) {
      replace(initialHistory.historyRecords);
    } else {
      replace([]);
    }
  }, [initialHistory?.historyRecords]);

  async function registerHistory(data) {
    await prop.handleRegister(
      initialHistory.id,
      initialHistory.categoryId,
      data.histories
    );
  }

  function onClickAdd() {
    append({});
  }

  function onClickDelete(deleteIndex) {
    remove(deleteIndex);
  }

  function upSort(index) {
    swap(index, index - 1);
  }

  function downSort(index) {
    swap(index, index + 1);
  }

  function isEnableSubmit() {
    return formState.isValid;
  }

  return (
    <>
      <div className="text-center sm:text-center">
        <span
          className="text-sky-500 underline"
          role="button"
          onClick={prop.handleCancel}
        >
          一覧へ戻る
        </span>
        <div className="mt-2">
          <p className="font-bold text-xl">{initialHistory.categoryName}</p>
        </div>
      </div>

      <form
        className="w-screen flex justify-center items-center flex-col mt-2"
        onSubmit={handleSubmit(registerHistory)}
      >
        {fields.map((field, index) => (
          <div className="mb-4">
            <HistoryRegisterInputComponent
              fieldArrayName={fieldArrayName}
              index={index}
              register={register}
              errors={formState.errors}
              getValues={getValues}
              update={update}
              upSort={upSort}
              downSort={downSort}
              onClickDelete={onClickDelete}
            />
          </div>
        ))}
        <FontAwesomeIcon
          icon={faSquarePlus}
          className="w-8 h-8 mt-2 text-purple-600"
          role="button"
          onClick={onClickAdd}
        />
        <button
          className={
            isEnableSubmit()
              ? "bg-blue-300 rounded px-4 py-2 border border-neutral-300 mt-6"
              : "bg-gray-300 rounded px-4 py-2 border border-neutral-300 mt-6"
          }
          disabled={!isEnableSubmit()}
        >
          経歴の保存
        </button>
      </form>
    </>
  );
}
