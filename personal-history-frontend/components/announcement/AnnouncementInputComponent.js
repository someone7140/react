import Router from "next/router";
import Link from "next/link";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import LoadingComponent from "../common/LoadingComponent";
import { useMutateApi } from "../../services/api/ApiHooksService";
import {
  createAnnouncement,
  editAnnouncement,
} from "../../services/api/announcement/ApiAnnouncementService";
import AnnouncementHtmlInputComponent from "./input/AnnouncementHtmlInputComponent";
import AnnouncementTitleInputComponent from "./input/AnnouncementTitleInputComponent";

export default function AnnouncementInputComponent(prop) {
  const initialData = prop.initialData;
  const editFlag = prop.initialData ? true : false;
  const { execPostApi, isLoading } = useMutateApi();

  const { register, handleSubmit, formState } = useForm({
    mode: "onChange",
    defaultValues: {
      title: initialData?.title,
      announcementHtml: initialData?.announcementHtml,
    },
  });

  function isEnableSubmit() {
    return formState.isValid && !isLoading;
  }

  async function registerAnnouncement(data) {
    const result = editFlag
      ? await execPostApi({
          apiPath: "announcement/editAnnouncement",
          execPost: function () {
            return editAnnouncement(
              prop.userToken,
              initialData.id,
              data.title,
              data.announcementHtml
            );
          },
        })
      : await execPostApi({
          apiPath: "announcement/addAnnouncement",
          execPost: function () {
            return createAnnouncement(
              prop.userToken,
              data.title,
              data.announcementHtml
            );
          },
        });
    if (result?.status == 200) {
      toast.success(
        editFlag ? "お知らせを編集しました" : "お知らせを登録しました",
        {
          duration: 3000,
        }
      );
      Router.push("/announcement/announcement_manage");
    } else {
      toast.error("登録時にエラーが発生しました", {
        duration: 3000,
      });
    }
  }

  return (
    <form
      className="w-screen flex justify-center items-center flex-col"
      onSubmit={handleSubmit(registerAnnouncement)}
    >
      <div className="mb-4">
        <AnnouncementTitleInputComponent
          register={register}
          errors={formState.errors}
        />
      </div>
      <div className="mb-4">
        <AnnouncementHtmlInputComponent
          register={register}
          errors={formState.errors}
        />
      </div>
      <button
        className={
          isEnableSubmit()
            ? "bg-blue-300 rounded px-4 py-2 border border-neutral-300"
            : "bg-gray-300 rounded px-4 py-2 border border-neutral-300"
        }
        disabled={!isEnableSubmit()}
      >
        {editFlag ? <>お知らせ編集</> : <>お知らせ登録</>}
      </button>
      {isLoading && (
        <div className="w-8 h-8 mt-2">
          <LoadingComponent />
        </div>
      )}
      <div className="mt-4">
        <Link href="/announcement/announcement_manage">
          <span className="text-sky-500 underline" role="button">
            お知らせ一覧へ戻る
          </span>
        </Link>
      </div>
    </form>
  );
}
