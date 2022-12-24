import { useEffect, useState } from "react";
import useSWR, { useSWRConfig } from "swr";
import { useFieldArray, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSquarePlus,
  faWindowClose,
} from "@fortawesome/free-regular-svg-icons";
import { faCaretUp, faCaretDown } from "@fortawesome/free-solid-svg-icons";

import LoadingComponent from "../common/LoadingComponent";
import CategoryDeleteModalComponent from "./input/CategoryDeleteModalComponent";
import CategoryNameInputComponent from "./input/CategoryNameInputComponent";
import CategoryOpenFlagCheckComponent from "./input/CategoryOpenFlagCheckComponent";
import { useMutateApi } from "../../services/api/ApiHooksService";
import {
  getMyCategory,
  registerCategory,
} from "../../services/api/historyCategory/ApiHistoryCategoryService";

export default function HistoryCategoryListComponent(prop) {
  const { execPostApi, isLoading } = useMutateApi();
  const [deleteCategoryIds, setDeleteCategoryIds] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const fieldArrayName = "categories";
  const { control, register, handleSubmit, formState, getValues } = useForm({
    mode: "onChange",
  });
  const { fields, append, remove, update, replace } = useFieldArray({
    control,
    name: fieldArrayName,
  });

  const { cache } = useSWRConfig();

  const { data: categoriesFromDb } = useSWR(
    "/historyCategory/getMyCategory",
    async () => {
      const result = await getMyCategory(prop.userToken);
      if (result.status != 200) {
        toast.error("カテゴリーの取得に失敗しました", {
          duration: 3000,
        });
        return undefined;
      } else {
        return result.data;
      }
    }
  );

  useEffect(() => {
    if (categoriesFromDb) {
      // カテゴリーの一覧をフォームに設定
      replace(
        categoriesFromDb.map((category) => {
          return {
            id: category.id,
            name: category.name,
            defaultSettingFlag: category.defaultSettingFlag,
            openFlag: category.openFlag,
          };
        })
      );
      // deleteの配列を初期化
      setDeleteCategoryIds([]);
      cache.delete("/historyCategory/getMyCategory");
    }
  }, [categoriesFromDb]);

  async function submitCategoryCheck(data) {
    if (deleteCategoryIds.length > 0) {
      setShowDeleteModal(true);
    } else {
      submitCategory(data);
    }
  }

  async function submitCategory(data) {
    const result = await execPostApi({
      apiPath: "historyCategory/registerCategory",
      execPost: function () {
        return registerCategory(
          prop.userToken,
          data.categories.map((c) => {
            return { ...c, openFlag: c.openFlag ? true : false };
          }),
          deleteCategoryIds
        );
      },
    });
    if (result?.status == 200) {
      toast.success("カテゴリーを保存しました", {
        duration: 3000,
      });
    } else {
      toast.error("登録時にエラーが発生しました", {
        duration: 3000,
      });
    }
  }

  function isEnableSubmit() {
    return formState.isValid && !isLoading;
  }

  function onClickAdd() {
    append({
      defaultSettingFlag: false,
      openFlag: false,
    });
  }

  function onClickDelete(deleteIndex) {
    const deleteCategory = getValues()?.categories[deleteIndex];
    if (deleteCategory.id) {
      setDeleteCategoryIds([...deleteCategoryIds, deleteCategory.id]);
    }
    remove(deleteIndex);
  }

  function upSort(index) {
    const movedArray = moveAt([...getValues().categories], index, index - 1);
    replace(movedArray);
  }

  function downSort(index) {
    const movedArray = moveAt([...getValues().categories], index, index + 1);
    replace(movedArray);
  }

  function moveAt(array, index, at) {
    if (index === at || index > array.length - 1 || at > array.length - 1) {
      return array;
    }

    const value = array[index];
    const tail = array.slice(index + 1);

    array.splice(index);

    Array.prototype.push.apply(array, tail);

    array.splice(at, 0, value);

    return array;
  }

  const columnClassName =
    "border-b dark:border-slate-600 font-medium p-4 pt-0 pb-3 text-slate-600 dark:text-slate-600 text-left";
  const recordClassName = "border-b dark:border-slate-600 h-14";

  return (
    <>
      {fields && (
        <form
          className="w-screen flex justify-center items-center flex-col"
          onSubmit={handleSubmit(submitCategoryCheck)}
        >
          <table>
            <thead>
              <tr>
                <th className={columnClassName}>カテゴリー名</th>
                <th className={columnClassName}>
                  経歴
                  <br />
                  公開
                </th>
                <th className={columnClassName}>
                  表示
                  <br />
                  順序
                </th>
                <th className={columnClassName}>削除</th>
              </tr>
            </thead>
            <tbody>
              {fields.map((field, index) => (
                <tr className={recordClassName}>
                  <td>
                    {field.defaultSettingFlag && <>{field.name}</>}
                    {!field.defaultSettingFlag && (
                      <CategoryNameInputComponent
                        fieldArrayName={fieldArrayName}
                        fieldName="name"
                        index={index}
                        register={register}
                        errors={formState.errors}
                      />
                    )}
                  </td>
                  <td className="text-center">
                    <CategoryOpenFlagCheckComponent
                      fieldArrayName={fieldArrayName}
                      fieldName="openFlag"
                      index={index}
                      register={register}
                      checked={getValues().categories[index].openFlag}
                      onChange={(e) => {
                        const updatedFlag = e.target.checked;
                        update(index, {
                          ...getValues().categories[index],
                          openFlag: updatedFlag,
                        });
                      }}
                    />
                  </td>
                  <td className="text-center">
                    <div className="flex justify-center items-center flex-row">
                      {index > 0 && (
                        <div>
                          <FontAwesomeIcon
                            icon={faCaretUp}
                            className="w-8 h-8 mt-1 text-sky-300"
                            role="button"
                            onClick={() => {
                              upSort(index);
                            }}
                          />
                        </div>
                      )}
                      {fields.length > index + 1 && (
                        <div>
                          <FontAwesomeIcon
                            icon={faCaretDown}
                            className={
                              "w-8 h-8 text-sky-300" +
                              (index == 0 ? "" : " ml-2")
                            }
                            role="button"
                            onClick={() => {
                              downSort(index);
                            }}
                          />
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="text-center">
                    {!field.defaultSettingFlag && (
                      <FontAwesomeIcon
                        icon={faWindowClose}
                        className="w-6 h-6 mt-2 text-stone-400"
                        role="button"
                        onClick={() => {
                          onClickDelete(index);
                        }}
                      />
                    )}
                  </td>
                </tr>
              ))}
              <tr>
                <td></td> <td></td> <td></td>
                <td>
                  <FontAwesomeIcon
                    icon={faSquarePlus}
                    className="w-8 h-8 mt-2 text-purple-600"
                    role="button"
                    onClick={onClickAdd}
                  />
                </td>
              </tr>
            </tbody>
          </table>

          <button
            className={
              isEnableSubmit()
                ? "bg-blue-300 rounded px-4 py-2 border border-neutral-300 mt-6"
                : "bg-gray-300 rounded px-4 py-2 border border-neutral-300 mt-6"
            }
            disabled={!isEnableSubmit()}
          >
            カテゴリーの保存
          </button>
          {isLoading && (
            <div className="w-8 h-8 mt-2">
              <LoadingComponent />
            </div>
          )}
        </form>
      )}
      {!fields && (
        <div className="w-screen flex justify-center items-center">
          <div className="w-8 h-8 mt-2">
            <LoadingComponent />
          </div>
        </div>
      )}
      <CategoryDeleteModalComponent
        showModal={showDeleteModal}
        handleRegister={async () => {
          setShowDeleteModal(false);
          await submitCategory(getValues());
        }}
        handleCancel={() => {
          setShowDeleteModal(false);
        }}
      />
    </>
  );
}
